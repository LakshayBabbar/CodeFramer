import { useState } from "react";

interface ArgumentsTypes<T> {
  url: string;
  method: string;
  body?: T;
}

const useSend = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async <T>({
    url,
    method = "GET",
    body,
  }: ArgumentsTypes<T>) => {
    setLoading(true);
    setIsError(false);
    setError("");
    try {
      const options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (method === "POST" || method === "PUT" || method === "DELETE" && body) {
        options.body = JSON.stringify(body);
      }

      const req = await fetch(url, options);
      const res = await req.json();
      if (res.error) {
        throw new Error(res.error);
      }
      if (!req.ok) {
        throw new Error("Something went wrong");
      }
      return res;
    } catch (error: any) {
      setIsError(true);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, isError, error, loading, setIsError };
};

export default useSend;
