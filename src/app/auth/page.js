"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { authState } from "@/store/features/Auth/authSlice";
import useSend from "@/hooks/useSend";
import Alert from "@/components/Modals/Alert";

function Auth() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailNotVerified, setIsEmailNotVerified] = useState(false);
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { fetchData, isError, error, loading, setIsError } = useSend();
  const { fetchData: fd, loading: ld } = useSend();

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (!mode || mode !== "login") {
      navigate.push("/auth?mode=signup");
    }
    if (isAuth) {
      navigate.push("/dashboard");
    }
  }, [navigate, searchParams, isAuth]);

  const isLogin = searchParams.get("mode") === "login";

  const valueHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setIsError(false);
    setIsEmailNotVerified(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsEmailNotVerified(false);
    const res = await fetchData(
      `/api/auth/${isLogin ? "login" : "signup"}`,
      "POST",
      data
    );
    const date = new Date().toString();
    if (res && res.success) {
      if (!isLogin) {
        setIsOpen(true);
      } else {
        toast({
          title: res.message,
          description: date,
        });
        dispatch(authState({ isAuth: true, username: res.username }));
      }
    } else {
      if (
        res.message ===
        "User is not verified, check your email for verification"
      ) {
        setIsEmailNotVerified(true);
      }
    }
  };

  const resendHandler = async () => {
    const res = await fd("/api/auth/verification/resend", "POST", {
      email: data.email,
      password: data.password,
    });
    const date = new Date().toString();
    if (res && !res.success) {
      toast({
        title: res.message,
        description: date,
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <section className="w-full h-lvh flex justify-center items-center">
      <div className="space-y-4 sm:border sm:rounded-xl sm:p-8 sm:shadow-xl">
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
          {!isEmailNotVerified && (
            <Link
              href={isLogin ? "?mode=signup" : "?mode=login"}
              className="hover:underline hover:underline-offset-4 text-blue-600"
            >
              {!isLogin
                ? "Already have an account? Login"
                : "Need an account? Sign Up"}
            </Link>
          )}
          {isEmailNotVerified && (
            <Button
              size="sm"
              variant="link"
              className="text-blue-600 p-0"
              type="button"
              disabled={ld}
              onClick={resendHandler}
            >
              Resend verification email?
            </Button>
          )}
        </div>
      </div>
      <Alert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Email Verification"
        description="Please check your email for the verification mail. If you don't see it in your inbox, be sure to check your spam folder as well."
      />
    </section>
  );
}

export default Auth;
