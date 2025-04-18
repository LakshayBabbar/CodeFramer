import React from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Input } from "./input";
import { Button } from "./button";

interface AlertWrapperProps {
  children: React.ReactNode;
  conformText?: string;
  handlerFn: () => void;
  disabled?: boolean;
  variant?: "destructive" | "ghost" | "default" | "secondary" | "outline" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const AlertWrapper = ({
  children,
  conformText,
  handlerFn,
  variant = "ghost",
  size = "default",
  disabled,
  className
}: AlertWrapperProps) => {
  const [input, setInput] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const conformFn = () => {
    if (conformText && input !== conformText) {
      setIsError(true);
    }
    else if (input === conformText || !conformText) {
      handlerFn();
      setInput("");
      setIsError(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm dark:text-slate-200">
            This action is irreversible. Confirming will permanently delete all your data from our servers. {conformText && `Please type "${conformText}" to proceed with deletion.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {conformText && <Input
          className={`w-full ${isError && "border-red-500"}`}
          onChange={(e) => {
            setInput(e.target.value);
            setIsError(false);
          }}
          value={input}
        />}
        {isError && (
          <p className="text-red-600">
            Invalid input. Please enter the exact text to proceed.
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            setInput("");
            setIsError(false);
          }}>Cancel</AlertDialogCancel>
          <Button onClick={conformFn} disabled={disabled}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
