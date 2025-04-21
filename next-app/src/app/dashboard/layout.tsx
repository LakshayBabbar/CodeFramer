import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'CodeFramer | Project Dashboard - Manage & Track Your Coding Projects',
    description: "Manage your coding projects effortlessly with CodeFramer's Project Management Dashboard. Organize, edit, and track all your web and compiler-based projects in one intuitive, AI-powered interface.",
    robots: {
        index: false,
        follow: false
    }
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return children
};

export default layout;