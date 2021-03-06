import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext<any | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

type AuthProviderProps = {
    children: React.ReactChild | React.ReactChild[];
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

    const signup = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email);
    };

    const updateEmail = (email: string) => {
        return currentUser?.updateEmail(email);
    };

    const updatePassword = (password: string) => {
        return currentUser?.updatePassword(password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    );
};