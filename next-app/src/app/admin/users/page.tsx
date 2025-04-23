"use client";
import React from 'react'
import UserCard, { UserCardProps, UserCardSkeleton } from '@/components/ui/UserCard'
import SearchBar from '@/components/Search/SearchBar';

const UsersPage = () => {
    const [data, setData] = React.useState<{ searchResults: UserCardProps[], loading: boolean, error: string | null }>({ searchResults: [], loading: false, error: null });
    return (
        <div className='flex flex-col items-center gap-10 mb-10'>
            <SearchBar placeholder='Search users by name or email' url='/api/admin/users?search=' setSearchResults={setData} />
            <div className='w-full md:w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {data.loading ? Array.from({ length: 12 }).map((_, i) => {
                    return <UserCardSkeleton key={i} />
                }) : data?.searchResults?.map((user: UserCardProps) => {
                    return <UserCard key={user.id} {...user} />;
                })}
            </div>
        </div>
    );
};

export default UsersPage;