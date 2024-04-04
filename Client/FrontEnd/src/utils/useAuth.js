import { useState, useEffect } from "react";
import axios from "axios";

export let access_token = ""

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    console.log("hii");
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        console.log("hello from uceAuth");
        console.log("1. " + res.data.accessToken);
        setAccessToken(res.data.accessToken);
        access_token = res.data.accessToken;
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // window.history.pushState({}, null, "/");
        console.log("2. hello from uceAuth");
      })
      .catch(function (err) {
        console.log(err);
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.post("http://localhost:3001/refresh", {
          refreshToken,
        });
        setAccessToken(response.data.accessToken);
        access_token = response.data.accessToken;
      } catch (err) {
        window.location = "/";
      }
    }, (expiresIn - 60) * 1000);

    return () => {
      clearInterval(interval);
      setAccessToken(null); // Trigger a re-render with null accessToken
      access_token = ""
    };
  }, [accessToken, refreshToken, expiresIn]);

  return accessToken;
}
