import { collection, getDocs, addDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

const reviewsCollection = collection(db, 'reviews');

export const getProductReviews = async (productID) => {
    try {
        const reviewQuery = query(reviewsCollection, where("product_reference", "==", productID));
        const snapshot = await getDocs(reviewQuery);
        const reviewList = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return reviewList;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};

export const postProductReview = async (username,review,productID) => {
    try {
        const data = {
            user: username,
            review:review,
            product_reference: productID
        }
        const postReview = await addDoc(reviewsCollection, data);
        console.log('Review added with ID: ', postReview.id);
        return postReview.id;
    } catch (error) {
        console.error('Error adding review: ', error);
        throw error;
    }
};
