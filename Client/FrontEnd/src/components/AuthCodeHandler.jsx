import useAuth from "../utils/useAuth.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function AuthCodeHandler() {
    const navigate = useNavigate();
    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = useAuth(code);

    useEffect(() => {
        if (accessToken) {
            navigate("/home", { state: { accessToken } });
        }
    }, [accessToken, navigate]);

    return null;
}

export default  AuthCodeHandler;