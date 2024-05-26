// authFunctions.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, sendPasswordResetEmail } from "firebase/auth";
import { firebase } from "./firebase";
import sanitize from "@/components/sanatize";

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
        console.error('Error during signup:', error)
        const errorMessage = mapAuthCodeToMessage(error.code);
        throw errorMessage; // Rethrow the error to be caught by the component
    }
}

export async function loginWithEmailPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Additional logic if needed
        return user;
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        const errorMessage = mapAuthCodeToMessage(error.code);
        throw errorMessage; // Rethrow the error to be caught by the component
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}
export async function ResetPasswordByEmail(email) {
    try {
        await sendPasswordResetEmail(auth, sanitize(email));
        return true
    } catch (error) {
        throw error;
    }
}

export function getCurrentUser() {
    return auth.currentUser;
}

function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
        case "auth/invalid-email":
            return "Email provided is invalid";

        case "auth/user-disabled":
            return "This account has been disabled";

        case "auth/user-not-found":
            return "User not found";

        case "auth/wrong-password":
            return "Incorrect password";

        case "auth/email-already-in-use":
            return "Email is already in use by another account";

        case "auth/weak-password":
            return "Password is too weak";

        // Add more error code mappings as needed...

        default:
            return "An error occurred during authentication";
    }
}
