import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const FIRESTORE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID; // Your Firestore Project ID
const FIRESTORE_API_KEY = process.env.NEXT_PUBLIC_FIRESTORE_API_KEY; // Your Firestore API Key
const COLLECTION_NAME = 'orders';
const ordersCollection = collection(db, 'orders')

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export const postOrder = async (data) => {
    try {
        const newdata = {
            ...data,
            createdAt: serverTimestamp(),
        }
        const postOrder = await addDoc(ordersCollection, newdata);
        return postOrder.id;
    } catch (error) {
        console.error('Error creating order: ', error);
        throw error;
    }
};

export const getUserOrders = async (idToken, email) => {
    try {
        const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents:runQuery?key=${FIRESTORE_API_KEY}`;
        const body = {
            structuredQuery: {
                from: [{ collectionId: COLLECTION_NAME }],
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'email' },
                        op: 'EQUAL',
                        value: { stringValue: email.toLowerCase() }
                    }
                }
            }
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
            throw new Error(errorData.error);
        }

        const data = await response.json();
        const orderList = data.map(doc => {
            const order = doc.document.fields;
            return {
                _id: doc.document.name.split('/').pop(),
                ...Object.keys(order).reduce((acc, key) => {
                    acc[key] = order[key].stringValue ||
                        order[key].integerValue ||
                        order[key].doubleValue ||
                        (order[key].timestampValue ? new Date(order[key].timestampValue) : null) ||
                        order[key].mapValue ||
                        order[key].arrayValue ||
                        null;
                    return acc;
                }, {})
            };
        });
        const filteredOrderList = orderList.filter(order => { return order.transactionID !== null && order.transactionID !== '' })
        filteredOrderList.sort((a, b) => b.createdAt - a.createdAt);
        const formattedOrderList = filteredOrderList.map(order => ({
            ...order,
            createdAt: formatDate(order.createdAt)
        }));

        return formattedOrderList;
    } catch (err) {
        console.error(err);
        throw new Error(err)
    }
};  