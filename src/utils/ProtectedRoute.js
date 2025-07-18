// src/utils/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProtectedRoute({ children, role }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setIsAllowed(docSnap.exists() && docSnap.data().role === role);
      } else {
        setIsAllowed(false);
      }
    };
    checkRole();
  }, [role]);

  if (isAllowed === null) return <p>Loading...</p>;
  return isAllowed ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
