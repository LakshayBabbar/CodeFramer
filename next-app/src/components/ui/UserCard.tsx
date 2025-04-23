"use client";
import React from 'react'
import Image from 'next/image';
import { capitalise } from '@/lib/helpers';
import { Mail, ShieldCheck, Clock, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from './skeleton';

export interface UserCardProps {
    id: string;
    username: string;
    name: string;
    email: string;
    accounts: [{ provider: string; }];
    image: string;
    _count: {
        Project: number;
    };
    createdAt: string;
}

const UserCard = (props: UserCardProps) => {
    const listStyle = "mt-2 flex items-center gap-2";
    const icoStyle = "size-4";
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='p-5 w-full md:w-80 bg-card border rounded-xl'>
            <div className='flex items-center gap-4'>
                <Image src={props?.image} width={40} height={40} alt={`${props?.username} profile pic`} className='rounded-full' />
                <div>
                    <p className='text-xl line-clamp-1'>{props?.name}</p>
                    <p className='text-sm'>@{props?.username}</p>
                </div>
            </div>
            <p className={listStyle + " mt-4 line-clamp-1"}><Mail className={icoStyle} />{props?.email}</p>
            <p className={listStyle}><ShieldCheck className={icoStyle} />{capitalise(props?.accounts[0]?.provider || "GOOGLE")}</p>
            <p className={listStyle}><Clock className={icoStyle} />{props?.createdAt.substring(0, 10)}</p>
            <p className={listStyle}><Layers className={icoStyle} />{props?._count.Project}</p>
        </motion.div>
    )
}

export default UserCard;

export const UserCardSkeleton = () => {
    return (
        <div className='w-full md:w-80 bg-card border rounded-xl p-5'>
            <div className='flex items-center gap-4'>
                <Skeleton className='size-12 rounded-full' />
                <div className='flex-grow space-y-2'>
                    <Skeleton className='w-full h-6' />
                    <Skeleton className='w-11/12 h-4' />
                </div>
            </div>
            <div className='mt-4 space-y-2'>
                <Skeleton className='w-full h-6' />
                <Skeleton className='w-1/2 h-6' />
                <Skeleton className='w-4/5 h-6' />
                <Skeleton className='w-10 h-6' />
            </div>
        </div>
    )
}