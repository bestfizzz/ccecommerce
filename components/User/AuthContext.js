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
            console.log(firebaseUser)
            if (firebaseUser) {
                // If user is authenticated
                setUser(firebaseUser);
                console.log(firebaseUser.uid)
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
        return await loginWithEmailPassword(email, password)
    };

    // Signup function
    const signup = async (name, email, password) => {
        return await signUpWithEmailPassword(name, email, password)
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