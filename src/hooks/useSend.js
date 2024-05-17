import { useState } from "react";

const useSend = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, method, body) => {
    setLoading(true);
    setIsError(false);
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(body);
      }

      const req = await fetch(url, options);
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res.message);
      }
      setLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
      setError(error.message);
      setLoading(false);
    }
  };

  return { fetchData, isError, error, loading, setIsError };
};

export default useSend;
