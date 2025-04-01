"use client"

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import AlertWrapper from "@/components/ui/AlertWrapper";
import useSend from "@/hooks/useSend";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
    const { data: sessionData, update } = useSession();
    const data = sessionData?.user;
    const [formData, setFormData] = useState<{ username: string, name: string, email: string }>({
        username: "",
        name: "",
        email: ""
    });
    const [isAccDel, setAccDel] = useState(false);
    const reqData = useSend();
    const router = useRouter();
    const { toast } = useToast();
    const [isValidUsername, setValidUsername] = useState(true);

    useEffect(() => {
        if (data) {
            setFormData({
                username: data.username || "",
                name: data.name || "",
                email: data.email || ""
            });
        }
    }, [data]);

    useEffect(() => {
        if (formData.username.length < 3 || formData.username.length > 20) {
            setValidUsername(false);
        } else {
            setValidUsername(true);
        }
    }, [formData.username]);

    const valChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const closeAccountHandler = async () => {
        setAccDel(true);
        const res = await reqData.fetchData({
            url: `/api/users/${sessionData?.user?.id}`,
            method: "DELETE",
        });
        toast({
            title: res.error || res.message,
            description: new Date().toString(),
        });
        if (!res.error) {
            signOut();
            router.push("/");
        }
    };

    const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidUsername) {
            toast({
                title: "Invalid username",
                description: "Username must be at least 3 characters long and at most 20 characters long.",
            });
            return;
        }
        setAccDel(false);
        const res = await reqData.fetchData({
            url: `/api/users/${sessionData?.user?.id}`,
            method: "PUT",
            body: formData,
        });
        toast({
            title: res.error || res.message,
            description: new Date().toString(),
        });
        if (!res.error) {
            await update({ ...data, ...formData });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:p-6">
            <div className="sm:dark:bg-[rgba(24,23,23,0.71)] sm:shadow-xl rounded-lg p-6 w-full max-w-lg mt-12 sm:border border-neutral-100 dark:border-none">
                <div className="flex flex-col items-center space-y-4">
                    <Image src={data?.image || "/user.webp"} alt={data?.username || "user image"} width={120} height={120} className="rounded-full shadow-md" />
                    <h1 className="text-3xl font-semibold text-neutral-600 dark:text-neutral-300">Profile Details</h1>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 text-center">
                        Update your profile information below. Ensure your email address is always up-to-date.
                    </p>
                </div>
                <form className="space-y-5 mt-5" onSubmit={updateHandler}>
                    <div>
                        <label htmlFor="username" className="block text-neutral-600 dark:text-neutral-300 text-sm">Username</label>
                        <Input name="username" value={formData.username} onChange={valChangeHandler} className="mt-1 dark:bg-neutral-800 bg-neutral-100" required />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-neutral-600 dark:text-neutral-300 text-sm">Full Name</label>
                        <Input name="name" value={formData.name} onChange={valChangeHandler} className="mt-1 dark:bg-neutral-800 bg-neutral-100" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-neutral-600 dark:text-neutral-300 text-sm">Email</label>
                        <Input name="email" value={formData.email} type="email" onChange={valChangeHandler} className="mt-1 dark:bg-neutral-800 bg-neutral-100" required />
                    </div>
                    <Button type="submit" disabled={!isAccDel && reqData.loading} className="w-full mt-4">Update Profile</Button>
                </form>
                <div className="mt-6 text-center">
                    <AlertWrapper
                        handlerFn={closeAccountHandler}
                        conformText={`sudo userdel ${data?.username}`}
                        variant="destructive"
                        disabled={isAccDel && reqData.loading}
                    >
                        Close Account
                    </AlertWrapper>
                    <p className="text-sm text-red-600 mt-2">
                        Warning: Closing your account is permanent and cannot be undone.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Profile;