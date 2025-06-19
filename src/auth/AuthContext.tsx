import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { authenticatedFetch } from "./AuthenticatedFetch";
import { BACKEND_URL } from "../AppConsts";
import { Profile } from "../types/Profile";

export enum AuthType {
    None,
    Student,
    Teacher,
    Administrator
};

const AuthContext = createContext<AuthState>({
    type: AuthType.None,
    profile: undefined,
    login: () => { },
    logout: () => { },
});

interface AuthState {
    type: AuthType;
    profile: Profile | undefined;
    login: (token: string) => void;
    logout: () => void;
};

export function AuthProvider({ children }) {
    const [authType, setAuthType] = useState(+(localStorage.getItem("type") ?? "-1") + 1);
    const [profile, setProfile] = useState<Profile | undefined>(undefined);

    const [updates, forceUpdate] = useReducer(i => i + 1, 0);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            return;
        }

        getProfileInfo().then((profile) => {
            localStorage.setItem("type", profile.type.toString());
            setAuthType(profile.type + 1);
            setProfile(profile);
        }).catch(() => { });
    }, [updates]);

    const value = {
        type: authType,
        profile: profile,
        login: (token: string) => {
            localStorage.setItem("token", token);
            forceUpdate();
        },
        logout: () => {
            logout();
            setAuthType(AuthType.None);
            setProfile(undefined);
            localStorage.removeItem("type");
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

async function getProfileInfo(): Promise<Profile> {
    return authenticatedFetch(`${BACKEND_URL}/api/profile`).then((response) => response.json());
}

async function logout(): Promise<void> {
    await authenticatedFetch(`${BACKEND_URL}/api/logout`);
}