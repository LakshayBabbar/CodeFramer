import React from 'react'
import { Card } from './card';
import Image from 'next/image';
import { capitalise } from '@/lib/helpers';
import { Mail, ShieldCheck, Clock, Zap, Layers } from 'lucide-react';

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
        <Card className='p-5 w-4/5 flex-grow sm:flex-grow-0 sm:w-fit'>
            <div className='flex items-center gap-4'>
                <Image src={props?.image} width={40} height={40} alt={`${props?.username} profile pic`} className='rounded-full' />
                <div>
                    <p className='text-xl'>{props?.name}</p>
                    <p className='text-sm'>@{props?.username}</p>
                </div>
            </div>
            <p className={listStyle + " mt-4"}><Mail className={icoStyle} />{props?.email}</p>
            <p className={listStyle}><ShieldCheck className={icoStyle} />{capitalise(props?.accounts[0]?.provider)}</p>
            <p className={listStyle}><Clock className={icoStyle} />{props?.createdAt.substring(0, 10)}</p>
            <p className={listStyle}><Layers className={icoStyle} />{props?._count.Project}</p>
        </Card>
    )
}

export default UserCard;