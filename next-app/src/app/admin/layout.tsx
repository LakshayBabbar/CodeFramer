import React from 'react'
import AdminNav from '@/components/Navbar/AdminNav';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Admin | CodeFramer',
    description: 'Admin panel for CodeFramer',
    robots: {
        index: false,
        follow: false
    }
}

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        redirect('/unauthorized');
    }
    return session ? (
        <div className='mt-14 space-y-10'>
            <AdminNav />
            <div className='px-5 w-full'>{children}</div>
        </div>
    ) : null;
}

export default layout;