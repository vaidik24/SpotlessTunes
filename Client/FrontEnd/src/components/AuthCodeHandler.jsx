import useAuth from "../utils/useAuth.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAccessToken} from "./AccessTokenContext.jsx";

function AuthCodeHandler() {
    const navigate = useNavigate();
    const { setAccessToken } = useAccessToken();
    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = useAuth(code);

    useEffect(() => {
        if (accessToken) {
            setAccessToken(accessToken);
            localStorage.setItem("accessToken", accessToken);
            navigate("/home");
        }
    }, [accessToken, navigate, setAccessToken]);
    return null;
}

export default  AuthCodeHandler;