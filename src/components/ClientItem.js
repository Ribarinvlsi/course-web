import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ClientItem = ({ client, onDelete }) => {
  const handleDelete = async () => {
    try {
      const clientDoc = doc(db, 'store', 'VMNd88pNakkyWcrqjKQT', 'clients', client.id);
      await deleteDoc(clientDoc);
      onDelete();
    } catch (error) {
      console.error('Error deleting client: ', error);
    }
  };

  return (
    <div className="item-list">
      <div className="item-image-container">
        <img src={client.photoUrl} alt={`${client.firstName} ${client.lastName}`} className="client-image" />
      </div>
      <div className="item-details">
        <h4>{client.firstName} {client.lastName}</h4>
        <p>Date of Birth: {client.dateBirth}</p>
        <p>Phone Number: {client.phoneNumber}</p>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ClientItem;
