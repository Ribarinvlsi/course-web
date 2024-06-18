import React, { useState } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../App.css';

const AddClient = ({ onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddClient = async () => {
    try {
      const clientsRef = doc(db, 'store', 'VMNd88pNakkyWcrqjKQT');
      await addDoc(collection(clientsRef, 'clients'), {
        firstName,
        lastName,
        dateBirth,
        phoneNumber,
        photoUrl
      });
      setFirstName('');
      setLastName('');
      setDateBirth('');
      setPhoneNumber('');
      setPhotoUrl('');
      onAdd();
    } catch (error) {
      console.error('Error adding client: ', error);
    }
  };

  return (
    <div className="form-container">
      <h3>Add Client</h3>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dateBirth}
        onChange={(e) => setDateBirth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button onClick={handleAddClient}>Add Client</button>
    </div>
  );
};

export default AddClient;
