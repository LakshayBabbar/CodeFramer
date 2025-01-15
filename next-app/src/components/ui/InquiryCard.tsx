import React, { useState } from "react";
import { Card } from "./card";
import { updateSupportRequest } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export interface InquiryCardProps {
    id: string;
    name: string;
    email: string;
    message: string;
    closed: boolean;
    createdAt: string;
    updatedAt?: string;
    refetch: () => void;
}

const InquiryCard = ({
    id,
    name,
    email,
    message,
    closed,
    createdAt,
    updatedAt,
    refetch,
}: InquiryCardProps) => {
    const { toast } = useToast();
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false)

    const inquiryHandler = async () => {
        setLoading(true);
        const res = await updateSupportRequest(id, closed ? "delete" : "close");
        if (!res.error) {
            refetch();
        } else {
            toast({ title: "Error", description: res.error });
        }
        setLoading(false);
    };

    const btnStyle = "border text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:opacity-50";

    const truncatedMessage =
        message.length > 120 && !expand
            ? message.substring(0, 120) + "..."
            : message;

    return (
        <Card className="p-5 gap-4 w-11/12 md:w-96 min-h-72 max-h-fit flex flex-col justify-between flex-grow md:flex-grow-0">
            <div className="space-y-2">
                <p>
                    <strong>Name:</strong> {name}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Created on:</strong> {new Date(createdAt).toLocaleDateString()}
                </p>
                {closed && updatedAt && (
                    <p>
                        <strong>Closed on:</strong> {new Date(updatedAt).toLocaleDateString()}
                    </p>
                )}
                <p>
                    <strong>Message:</strong> {truncatedMessage}
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
            <button
                className={btnStyle}
                onClick={inquiryHandler}
                disabled={loading}
                aria-label={closed ? "Delete inquiry" : "Close inquiry"}
            >
                {closed ? "Delete" : "Close"}
            </button>
        </Card>
    );
};

export default InquiryCard;