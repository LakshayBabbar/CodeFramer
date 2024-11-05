import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog";
import { Input } from "./input";
import { Button } from "./button";

interface AlertWrapperProps {
  children: React.ReactNode;
  conformText: string;
  handlerFn: () => void;
  disabled?: boolean;
}

const AlertWrapper = ({
  children,
  conformText,
  handlerFn,
  disabled
}: AlertWrapperProps) => {
  const [input, setInput] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const conformFn = () => {
    if (input === conformText) {
      handlerFn();
    } else {
      setIsError(true);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed top-0 left-0 w-full h-screen bg-[rgba(7,10,24,0.68)] backdrop-blur-lg flex items-center justify-center z-20 overflow-hidden">
        <div className="bg-card p-6 space-y-5 border rounded-xl w-11/12 md:max-w-[40rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm dark:text-slate-200">
              {`This action is irreversible. Confirming will permanently delete all your data from our servers. Please type '${conformText}' to proceed with deletion.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            className={`w-full ${isError ? "border-red-500" : ""}`}
            onChange={(e) => {
              setInput(e.target.value);
              setIsError(false);
            }}
            value={input}
          />
          {isError && (
            <p className="text-red-600">
              Invalid input. Please enter the exact text to proceed.
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="secondary"
                onClick={() => {
                  setInput("");
                  setIsError(false);
                }}
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button onClick={conformFn} className="mb-4" disabled={disabled}>
              Continue
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
