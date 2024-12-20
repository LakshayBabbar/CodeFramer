"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useSend from "@/hooks/useSend";
import useAuth from "@/hooks/useAuth";

function Auth() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const { isAuth, SetIsAuth, setUsername } = useAuth();
  const { toast } = useToast();
  const { fetchData, isError, error, loading, setIsError } = useSend();
  const mode = searchParams.get("mode") || "login";

  if (!mode || (mode !== "login" && mode !== "signup"))
    return navigate.push("/auth?mode=login");

  if (isAuth) return navigate.push("/dashboard");

  const isLogin = mode === "login";

  const valueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setIsError(false);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchData({
      url: `/api/auth/${isLogin ? "login" : "signup"}`,
      method: "POST",
      body: data,
    });
    if (!res.error) {
      if (isLogin) {
        SetIsAuth(true);
        setUsername(res.username);
      } else {
        navigate.push("/auth?mode=login");
      }
      toast({
        title: res.message,
        description: new Date().toString(),
      });
    }
  };

  return (
    <section className="w-full h-lvh flex justify-center items-center">
      <div className="space-y-4 sm:border sm:rounded-xl sm:p-8 sm:shadow-xl bg-slate-100 dark:bg-slate-950">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {!isLogin ? "Sign Up" : "Login"} to CodeFramer
          </h1>
          <p className="text-sm dark:text-neutral-200">
            {!isLogin
              ? "Sign Up to join our community."
              : "Log in to save and manage your work."}
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
              className="bg-slate-100 dark:bg-slate-950"
              required
            />
          )}
          <Input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={valueHandler}
            className="bg-slate-100 dark:bg-slate-950"
            required
          />
          <Input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={valueHandler}
            className="bg-slate-100 dark:bg-slate-950"
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
            className="hover:underline hover:underline-offset-4 text-blue-600"
          >
            {!isLogin
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </Link>
        </div>
      </div>
      <div className="fixed w-4/5 h-24 -bottom-10 -right-20 bg-gradient-to-r from-indigo-400 to-purple-700 blur-[120px] -rotate-12" />
    </section>
  );
}

export default Auth;
