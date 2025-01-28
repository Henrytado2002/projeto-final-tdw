import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { setUser } from '../redux/userReducer';

export const fetchUser = (uid) => async (dispatch) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            dispatch(setUser(userSnapshot.data()));
        }
    } catch (error) {
        console.error('Error fetching user data: ', error);
    }
};