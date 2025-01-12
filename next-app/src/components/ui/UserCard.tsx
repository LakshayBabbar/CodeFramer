import React from 'react'
import { Card } from './card';
import Image from 'next/image';
import { capitalise } from '@/lib/helpers';
import { Mail, ShieldCheck, Clock, Zap } from 'lucide-react';


export interface UserCardProps {
    id: string;
    name: string;
    email: string;
    accounts: [{ provider: string; }];
    image: string;
    role: string;
    createdAt: string;
}

const UserCard = (props: UserCardProps) => {
    const listStyle = "mt-2 flex items-center gap-2";
    const icoStyle = "size-4";
    return (
        <Card className='p-5 w-4/5 flex-grow sm:flex-grow-0 sm:w-fit'>
            <div className='flex items-center gap-4'>
                <Image src={props?.image} width={30} height={30} alt={`${props?.name} profile pic`} className='rounded-full' />
                <p className='text-xl'>{props?.name}</p>
            </div>
            <p className={listStyle + " mt-4"}><Mail className={icoStyle} />{props?.email}</p>
            <p className={listStyle}><ShieldCheck className={icoStyle} />{capitalise(props?.accounts[0]?.provider)}</p>
            <p className={listStyle}><Zap className={icoStyle} />{props?.role}</p>
            <p className={listStyle}><Clock className={icoStyle} />{props?.createdAt.substring(0, 10)}</p>
        </Card>
    )
}

export default UserCard;