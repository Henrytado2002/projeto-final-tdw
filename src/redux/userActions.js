import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { setUser } from '../redux/userReducer';

export const fetchUser = (uid) => async (dispatch) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            // Convert Firestore Timestamp to a serializable format
            if (userData.createdAt) {
                userData.createdAt = userData.createdAt.toDate().toISOString();
            }
            console.log("fetch data:" , userData);
            dispatch(setUser(userData));
        }
    } catch (error) {
        console.error('Error fetching user data: ', error);
    }
};