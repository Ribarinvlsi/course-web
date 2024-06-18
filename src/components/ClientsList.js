import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddClient from './AddClient';
import '../App.css';

const ClientsList = () => {
  const [clients, setClients] = useState([]);

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

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      const clientDoc = doc(db, 'store', 'VMNd88pNakkyWcrqjKQT', 'clients', id);
      await deleteDoc(clientDoc);
      fetchClients();
    } catch (error) {
      console.error('Error deleting client: ', error);
    }
  };

  return (
    <div className="item-list">
      <h2>Clients List</h2>
      <AddClient onAdd={fetchClients} />
      <div className="item-collection">
        {clients.map(client => (
          <div key={client.id} className="item-item">
            <div className="item-image">
              <img src={client.photoUrl} alt={`${client.firstName} ${client.lastName}`} />
            </div>
            <div className="item-details">
              <h3>{client.firstName} {client.lastName}</h3>
              <p>Date of Birth: {client.dateBirth}</p>
              <p>Phone Number: {client.phoneNumber}</p>
              <button className="delete-btn" onClick={() => handleDelete(client.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
