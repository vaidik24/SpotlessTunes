// AccessTokenContext.jsx
import React, { createContext, useContext, useState } from "react";

const AccessTokenContext = createContext();

export const useAccessToken = () => useContext(AccessTokenContext);

export const AccessTokenProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AccessTokenContext.Provider>
    );
};
