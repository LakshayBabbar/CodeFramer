import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'CodeFramer | User Profile - View & Customize Your Developer Profile',
    description: "Access your CodeFramer user profile to update personal info, manage account settings, and view your coding activity across projects.",
    robots: {
        index: false,
        follow: false
    }
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return children
};

export default layout;