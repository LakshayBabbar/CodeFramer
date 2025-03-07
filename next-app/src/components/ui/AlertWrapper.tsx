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
import { motion } from "framer-motion";

interface AlertWrapperProps {
  children: React.ReactNode;
  conformText: string;
  handlerFn: () => void;
  disabled?: boolean;
  variant?: "destructive" | "ghost";
}

const AlertWrapper = ({
  children,
  conformText,
  handlerFn,
  variant = "ghost",
  disabled,
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
        <Button variant={variant}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg flex items-center justify-center z-[999] overflow-hidden">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-card p-6 space-y-5 border rounded-xl w-11/12 md:max-w-[40rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm dark:text-slate-200">
              This action is irreversible. Confirming will permanently delete all your data from our servers. Please type &quot;<strong>{conformText}</strong>&quot; to proceed with deletion.
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
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertWrapper;
