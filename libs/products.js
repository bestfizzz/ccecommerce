import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { getCategoriesList } from "./categories";

const productsCollection = collection(db, 'products');
const categoryStructure = await getCategoriesList()

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

export const getProductsByCategoryDesendences = async (category, productList = []) => {
    try {
        // Get products from the current category
        const products = await getProductsByCategory(category);
        // Add products to the productList
        productList.push(...products);
        const categoryProperties = categoryStructure.filter(c => { return c.parentCategory == category })
        // Recursively get products from each child category
        if (categoryProperties!=[]) {
            for (const childCategory of categoryProperties) {
                await getProductsByCategoryDesendences(childCategory?.name, productList);
            }
        }
        return productList;
    } catch (error) {
        console.error("Error fetching products from category and descendants:", error);
        throw error;
    }
};

export const getProductsBySearch = async (search) => {
    try {
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs
            .map(doc => ({ _id: doc.id, ...doc.data() }))
            .filter(product => {
                // Check if the product name contains the search term
                return product.title.toLowerCase().includes(search.toLowerCase());
                // You can extend this logic to search in other fields like description, etc.
            });
        return productList;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
