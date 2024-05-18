"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSend from "@/hooks/useSend";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { fetchData, isError, error, loading } = useSend();

  useEffect(() => {
    const authToken = window.location.search.split("=")[1];
    if (authToken) {
      setToken(authToken);
    } else {
      router.push("/auth?mode='signup'");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetchData("/api/auth/verification", "POST", { token });
    if (res) {
      const date = new Date().toString();
      !isError && router.push("/auth?mode=login");
      toast({
        title: res.message,
        description: date,
      });
    }
  };

  return (
    token && (
      <div className="w-full h-lvh flex flex-col items-center justify-center gap-4">
        <p>Click below to verify your registeration</p>
        <form onSubmit={submitHandler}>
          <Button type="submit" disabled={loading}>
            Verify
          </Button>
        </form>
        <p className="text-red-600">{isError && error}</p>
      </div>
    )
  );
};

export default page;
