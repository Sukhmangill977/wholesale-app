import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getUserRole = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const userSnap = await getDoc(docRef);
  if (userSnap.exists()) {
    return userSnap.data().role;
  }
  return null;
};
