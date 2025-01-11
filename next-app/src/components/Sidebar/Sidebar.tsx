import React from 'react'
import { ChartArea, User } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    {
        name: 'Statistics',
        href: '/admin/stats',
        icon: ChartArea
    },
    {
        name: 'Users',
        href: '/admin/users',
        icon: User
    }
];

const Sidebar = () => {
    return (
        <aside className='mt-14 sm:mt-0 sm:py-20 p-4 sm:px-10 sm:w-64 w-full h-fit sm:h-screen dark:bg-neutral-900 bg-neutral-200'>
            <div className='flex sm:flex-col gap-4'>
                {navLinks.map((link, idx)=>{
                    return <Link key={idx} href={link.href} className='underline'>{link.name}</Link>
                })}
            </div>
        </aside>
    )
}

export default Sidebar