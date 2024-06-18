import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const OrderItem = ({ order, clients, products, onDelete }) => {
  const getClientName = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.nameProduct : 'Unknown Product';
  };

  const handleDelete = async (orderId) => {
    try {
      const orderDoc = doc(db, 'store', 'pzZMwFnJ3VsPl3XCeKBz', 'orders', orderId);
      await deleteDoc(orderDoc);
      onDelete();
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="item-list">
        <div className="item-details">
            <h3>Order {order.id}</h3>
            <p>Client: {getClientName(order.client)}</p>
            <p>Order Date: {formatDate(order.dataOrder.toDate())}</p>
            <ul>
                {order.products.map((product, index) => (
                    <li key={index}>
                {getProductName(product.productId)} - Quantity: {product.quantity}
            </li>
            ))}
            </ul>
            <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
        </div> 
    </div>
  );
};

export default OrderItem;
