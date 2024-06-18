import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ProductItem = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      const productDoc = doc(db, 'store', '23DH1qShB4ptX1PA1y8j', 'products', product.id);
      await deleteDoc(productDoc);
      onDelete();
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return (
    <div className="product-item">
      <div className="product-image-container">
        <img src={product.photoUrl} alt={product.nameProduct} className="product-image" />
      </div>
      <div className="product-details">
        <h4>{product.nameProduct}</h4>
        <p>Price: {product.priceProduct}</p>
        <p>Quantity: {product.quantityProduct}</p>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;
