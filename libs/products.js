import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

const productsCollection = collection(db, 'products');

export const getProduct = async (id) => {
    try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
            const data = {
                _id: productSnapshot.id,
                ...productSnapshot.data()
            };
            return data;
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return productList;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const productQuery = query(productsCollection, where("category", "==", category.toLowerCase()));
        const snapshot = await getDocs(productQuery);
        const productList = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        return productList;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};
