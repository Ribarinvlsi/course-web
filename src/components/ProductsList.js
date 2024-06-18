import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddProduct from './AddProduct';
import '../App.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsRef = doc(db, 'store', '23DH1qShB4ptX1PA1y8j');
      const productsSnapshot = await getDocs(collection(productsRef, 'products'));
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const productDoc = doc(db, 'store', '23DH1qShB4ptX1PA1y8j', 'products', id);
      await deleteDoc(productDoc);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return (
    <div className="item-list">
      <h2>Products List</h2>
      <AddProduct onAdd={fetchProducts} />
      <div className="item-collection">
        {products.map(product => (
          <div key={product.id} className="item-item">
            <div className="item-image">
              <img src={product.photoUrl} alt={product.nameProduct} />
            </div>
            <div className="item-details">
              <h3>{product.nameProduct}</h3>
              <p>Price: {product.priceProduct}</p>
              <p>Quantity: {product.quantityProduct}</p>
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
