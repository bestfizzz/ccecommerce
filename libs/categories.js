import {collection,getDocs } from "firebase/firestore";
import { db } from "./firebase";
const categories = collection(db, 'categories');

export const getCategories = async () => {
    try {
        const snapshot = await getDocs(categories);
        let list = [];
        snapshot.forEach(doc => {
            let data = {
                _id: doc.id,
                ...doc.data()
            };
            list.push(data);
        });
        return buildHierarchy(list);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

function buildHierarchy(data) {
    // Create a map of items by their _id
    const itemsMap = {};
    data.forEach(item => {
        itemsMap[item._id] = item;
    });

    // Initialize the result structure and a set to track top-level items
    const topLevelIds = new Set(data.filter(item => !item.parentCategory).map(item => item._id));

    // Organize items under their respective parents
    data.forEach(item => {
        const parentId = item.parentCategory;
        if (parentId) {
            const parent = itemsMap[parentId];
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(item);
            }
        }
    });

    // Recursive function to build the hierarchy
    function buildHierarchyRecursive(item) {
        if (item.children) {
            item.children = item.children.map(child => buildHierarchyRecursive(child));
        }
        return item;
    }

    // Build the hierarchy starting from top-level items
    const result = Array.from(topLevelIds).map(id => buildHierarchyRecursive(itemsMap[id]));

    return result;
}

export const getCategoriesList = async () => {
    try {
        const snapshot = await getDocs(categories);
        let list = [];
        snapshot.forEach(doc => {
            let data = {
                _id: doc.id,
                ...doc.data()
            };
            list.push(data);
        });
        return list;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};