'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithEmailPassword, signUpWithEmailPassword, logout } from '@/libs/auth'; // Assuming you have a Firebase auth instance

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // If user is authenticated
                setUser(firebaseUser)
            } else {
                // If user is not authenticated
                setUser(null);
                // Redirect to login page when user is not authenticated
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            return await loginWithEmailPassword(email, password);
        } catch (error) {
            console.error('Error during login:', error); // Log the error
            throw error; // Rethrow the error to be caught by the caller
        }
    };


    // Signup function
    const signup = async (name, email, password) => {
        try {
            return await signUpWithEmailPassword(name, email, password)
        } catch (error) {
            console.error('Error during login:', error); // Log the error
            throw error; // Rethrow the error to be caught by the caller
        }
    };

    // Logout function
    const signout = async () => {
        return await logout()
    };

    // Provide AuthContext value
    return (
        <AuthContext.Provider value={{ user, login, signup, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth hook
export const useAuth = () => useContext(AuthContext);