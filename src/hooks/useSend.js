import { useState } from "react";

const useSend = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, method, body, authHeaders = true) => {
    setLoading(true);
    setIsError(false);
    setError("");
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (authHeaders) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        };
      }
      if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(body);
      }

      const req = await fetch(url, options);
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.message);
      }
      setLoading(false);
      return { ...res, success: true };
    } catch (error) {
      setIsError(true);
      setError(error.message);
      setLoading(false);
      return { success: false, message: error.message };
    }
  };

  return { fetchData, isError, error, loading, setIsError };
};

export default useSend;
