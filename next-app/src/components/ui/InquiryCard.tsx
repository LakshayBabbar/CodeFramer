import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import useSend from "@/hooks/useSend";
import { motion } from "motion/react";
import { Calendar, Info, Mail, User } from "lucide-react";

export interface InquiryCardProps {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    refetch: () => void;
}

const InquiryCard = ({
    id,
    name,
    email,
    message,
    createdAt,
    refetch,
}: InquiryCardProps) => {
    const { toast } = useToast();
    const [expand, setExpand] = useState(false);
    const { fetchData, loading } = useSend();

    const inquiryHandler = async () => {
        const res = await fetchData({
            url: `/api/admin/inquiries`,
            method: "DELETE",
            body: { id },
        });
        toast({
            title: res?.message || res?.error
        })
        !res.error && refetch();
    };

    const truncatedMessage =
        message.length > 120 && !expand
            ? message.substring(0, 120) + "..."
            : message;

    const listStyle = "flex items-center gap-2 line-clamp-1";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-5 gap-6 w-full md:w-[22rem] flex flex-col justify-between bg-card border rounded-xl">
            <div className="space-y-2">
                <p className={listStyle}><User size={20} />{name}</p>
                <p className={listStyle}><Mail size={20} /> {email}</p>
                <p className={listStyle}><Calendar size={20} /> {new Date(createdAt).toLocaleDateString()}</p>
                <p className={listStyle}><Info size={20} />Message: </p>
                <p> {truncatedMessage}
                    {message.length > 120 && (
                        <span
                            className="font-bold cursor-pointer text-blue-500 hover:underline"
                            onClick={() => setExpand(!expand)}
                        >
                            {expand ? " show less" : " show more"}
                        </span>
                    )}
                </p>

            </div>
            <Button onClick={inquiryHandler} variant="outline" disabled={loading}>Delete</Button>
        </motion.div>
    );
};

export default InquiryCard;


export const InquiryCardSkeleton = () => {
    return (
        <div className="w-full md:w-[22rem] space-y-2 border rounded-xl bg-card p-5 gap-4">
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-11/12 h-6" />
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-10" />
        </div>
    )
}