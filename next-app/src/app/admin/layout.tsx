import React from 'react'
import AdminNav from '@/components/Navbar/AdminNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin | CodeFramer',
    description: 'Admin panel for CodeFramer',
    robots: {
        index: false,
        follow: false
    }
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='mt-14 space-y-10'>
            <AdminNav />
            <div className='px-5 w-full'>{children}</div>
        </div>
    )
}

export default layout