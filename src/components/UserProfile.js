import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    if (user) {
      // Fetch the user's profile data from Firestore
      const userRef = db.collection('users').doc(user.uid);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      // Update the user's profile data in Firestore
      const userRef = db.collection('users').doc(user.uid);
      await userRef.update({ username });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <div>
        <label>Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserProfile;
