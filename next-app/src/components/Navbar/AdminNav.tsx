"use client";
import React from 'react'
import { ChartArea, User } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

const AdminNav = () => {
    const push = useRouter().push;
    const path = usePathname();
    const defaultTab = navLinks.find(link => link.href === path)?.name || 'Stats';
    return (
        <Tabs defaultValue={defaultTab} className='w-full'>
            <TabsList className="flex flex-wrap rounded-none">
                {navLinks.map((link, index) => {
                    return <TabsTrigger value={link.name} key={index} className='sm:w-40 flex gap-2 h-full' onClick={() => push(link.href)}><link.icon size={20} />{link.name}</TabsTrigger>
                })}
            </TabsList>
        </Tabs>
    )
}

export default AdminNav;

const navLinks = [
    {
        name: 'Users',
        href: '/admin/users',
        icon: User
    },
    {
        name: 'Stats',
        href: '/admin/stats',
        icon: ChartArea
    },
    {
        name: 'Inquiries',
        href: '/admin/inquiries',
        icon: User
    },
];