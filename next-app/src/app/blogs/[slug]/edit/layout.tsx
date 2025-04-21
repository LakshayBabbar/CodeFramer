import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    }
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return children
};

export default layout;