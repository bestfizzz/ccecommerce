// authFunctions.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { firebase } from "./firebase";

// Initialize Firebase authentication
export const auth = getAuth(firebase);

export async function signUpWithEmailPassword(name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with the provided name
        await updateProfile(user, { displayName: name });

        return user;
    } catch (error) {
        throw error;
    }
}

export async function loginWithEmailPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Additional logic if needed
        return user;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }   
}

export function getCurrentUser() {
    return auth.currentUser;
}

