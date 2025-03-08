import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact Us - CodeFramer",
    description: "Get in touch with the CodeFramer team for support, feedback, or inquiries. We're here to help you with your coding and development needs.",
    keywords: "contact, codeframer, support, feedback, inquiries, coding, development",
}

export default function layout({ children }: { children: React.ReactNode }) {
    return children;
}