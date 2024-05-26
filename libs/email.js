import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import { db } from "./firebase";

const emailsCollection = collection(db, 'emails')
export const postEmail = async (email) => {
    try {
        const data = {
            email: email,
            createdAt: serverTimestamp(),
        }
        const postEmail = await addDoc(emailsCollection, data);
        return postEmail.id;
    } catch (error) {
        console.error('Error adding review: ', error);
        throw error;
    }
};