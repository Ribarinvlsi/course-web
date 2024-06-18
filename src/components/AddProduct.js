import React, { useState } from 'react';
import { collection, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../App.css';

const AddProduct = ({ onAdd }) => {
  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [quantityProduct, setQuantityProduct] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddProduct = async () => {
    try {
      const productsRef = doc(db, 'store', '23DH1qShB4ptX1PA1y8j');
      await addDoc(collection(productsRef, 'products'), {
        nameProduct,
        priceProduct,
        quantityProduct,
        photoUrl
      });
      setNameProduct('');
      setPriceProduct('');
      setQuantityProduct('');
      setPhotoUrl('');
      onAdd();
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div className="form-container">
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={nameProduct}
        onChange={(e) => setNameProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={priceProduct}
        onChange={(e) => setPriceProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Quantity"
        value={quantityProduct}
        onChange={(e) => setQuantityProduct(e.target.value)}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
