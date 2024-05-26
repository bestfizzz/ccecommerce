import { collection, getDocs, addDoc, serverTimestamp, query, where } from "firebase/firestore";
import formatDate from "@/components/formatDate";
import { db } from "./firebase";

const reviewsCollection = collection(db, 'reviews')

export const getProductReviews = async (productID) => {
    try {
        const reviewQuery = query(reviewsCollection, where("product_reference", "==", productID))
        const snapshot = await getDocs(reviewQuery);
        const reviewList = snapshot.docs.map(doc => ({
            ...doc.data(),
            _id: doc.id,
        }));
        reviewList.sort((a, b) => b.createdAt - a.createdAt);
        const formattedReviewList = reviewList.map(review => ({
            ...review,
            createdAt: formatDate(review.createdAt)
        }));
        return formattedReviewList;
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
            product_reference: productID,
            createdAt: serverTimestamp(),
        }
        const postReview = await addDoc(reviewsCollection, data);
        console.log('Review added with ID: ', postReview.id);
        return postReview.id;
    } catch (error) {
        console.error('Error adding review: ', error);
        throw error;
    }
};
