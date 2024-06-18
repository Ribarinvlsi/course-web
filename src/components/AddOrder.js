import React, { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../App.css';

const AddOrder = ({ onAdd }) => {
  const [clientId, setClientId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([{ productId: '', quantity: 1 }]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsRef = doc(db, 'store', 'VMNd88pNakkyWcrqjKQT');
      const clientsSnapshot = await getDocs(collection(clientsRef, 'clients'));
      const clientsList = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsList);
    };

    const fetchProducts = async () => {
      const productsRef = doc(db, 'store', '23DH1qShB4ptX1PA1y8j');
      const productsSnapshot = await getDocs(collection(productsRef, 'products'));
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleProductChange = (index, field, value) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index][field] = value;
    setSelectedProducts(newSelectedProducts);
  };

  const addProductField = () => {
    setSelectedProducts([...selectedProducts, { productId: '', quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ordersRef = doc(db, 'store', 'pzZMwFnJ3VsPl3XCeKBz');
      await addDoc(collection(ordersRef, 'orders'), {
        client: clientId,
        products: selectedProducts.map(product => ({
          productId: product.productId,
          quantity: parseInt(product.quantity)
        })),
        dataOrder: new Date()
      });
      setClientId('');
      setSelectedProducts([{ productId: '', quantity: 1 }]);
      onAdd();
      alert('Order added successfully');
    } catch (error) {
      console.error('Error adding order: ', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Add Order</h3>
      <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
        <option value="">Select Client</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>
            {client.firstName} {client.lastName}
          </option>
        ))}
      </select>
      <div className="product-fields">
        {selectedProducts.map((product, index) => (
          <div key={index}>
            <select
              value={product.productId}
              onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map(prod => (
                <option key={prod.id} value={prod.id}>
                  {prod.nameProduct} (Price: {prod.priceProduct})
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <div className="form-buttons">
        <button type="button" onClick={addProductField}>Add Another Product</button>
        <button type="submit">Add Order</button>
      </div>
    </form>
  );
};

export default AddOrder;
