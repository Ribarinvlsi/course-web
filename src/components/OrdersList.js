import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddOrder from './AddOrder';
import OrderItem from './OrderItem';
import '../App.css';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchOrders = async () => {
    try {
      const ordersRef = doc(db, 'store', 'pzZMwFnJ3VsPl3XCeKBz');
      const ordersSnapshot = await getDocs(collection(ordersRef, 'orders'));
      const ordersList = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error('Error fetching orders: ', error);
    }
  };

  const fetchClients = async () => {
    try {
      const clientsRef = doc(db, 'store', 'VMNd88pNakkyWcrqjKQT');
      const clientsSnapshot = await getDocs(collection(clientsRef, 'clients'));
      const clientsList = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsList);
    } catch (error) {
      console.error('Error fetching clients: ', error);
    }
  };

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
    fetchOrders();
    fetchClients();
    fetchProducts();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, 'store', 'pzZMwFnJ3VsPl3XCeKBz', 'orders', orderId);
      await deleteDoc(orderDoc);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
  };

  return (
    <div className="item-list">
      <h2>Orders List</h2>
      <AddOrder onAdd={fetchOrders} />
      <div className="item-collection">
        {orders.map(order => (
          <div key={order.id} className="item-item">
            <div className="item-details">
              <OrderItem
                key={order.id}
                order={order}
                clients={clients}
                products={products}
                onDelete={fetchOrders}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
