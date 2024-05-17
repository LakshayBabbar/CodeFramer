"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { authState } from "@/store/features/Auth/authSlice";
import useSend from "@/hooks/useSend";

function Auth() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const valueHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
    setIsError(false);
  };
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { fetchData, isError, error, loading, setIsError } = useSend();

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === null || mode !== "login") {
      navigate.push("/auth?mode=signup");
    }
  }, [navigate, searchParams]);

  const isLogin = searchParams.get("mode") === "login";

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    const res = await fetchData(
      `/api/auth/${isLogin ? "login" : "signup"}`,
      "POST",
      data
    );
    const date = new Date().toString();
    console.log(res);
    if (res && !isError) {
      if (!isLogin) {
        toast({
          title: "Check your Email for verification",
          description: date,
        });
      } else {
        toast({
          title: res.message,
          description: date,
        });
        dispatch(
          authState({
            isAuth: true,
            username: res.username,
          })
        );
      }
      navigate.push("/dashboard");
    }
    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="w-full h-lvh flex justify-center items-center">
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">
            {!isLogin ? "Sign Up" : "Login"} in to CodeFramer
          </h1>
          <p className="text-sm dark:text-neutral-200">
            {!isLogin
              ? "Sign Up to join our community."
              : "Login to save and manage your work."}
          </p>
        </div>
        <form className="space-y-4 w-80" onSubmit={submitHandler}>
          {!isLogin && (
            <Input
              type="text"
              name="username"
              value={data.username}
              placeholder="Username"
              onChange={valueHandler}
              required
            />
          )}
          <Input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={valueHandler}
            required
          />
          <Input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={valueHandler}
            required
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {!isLogin ? "Sign Up" : "Login"}
          </Button>
          <p className="text-red-500 text-sm">{isError && error}</p>
        </form>
        <div>
          <Link
            href={isLogin ? "?mode=signup" : "?mode=login"}
            className="hover:underline hover:underline-offset-4 text-blue-500"
          >
            {!isLogin
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Auth;
