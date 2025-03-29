"use client";
import React from 'react'
import UserCard, { UserCardProps } from '@/components/ui/UserCard'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/Search/SearchBar';

const UsersPage = () => {
    const [data, setData] = React.useState<{ searchResults: UserCardProps[], loading: boolean, error: string | null }>({ searchResults: [], loading: false, error: null });
    return (
        <div className='space-y-10'>
            <div className='w-full place-items-center'>
                <SearchBar placeholder='Search users by name or email' url='/api/admin/users?search=' setSearchResults={setData} />
            </div>
            {data?.loading ? <div className='flex flex-wrap gap-4'>
                {Array.from({ length: 12 }).map((_, i) => {
                    return <Skeleton key={i} className='flex-grow w-4/5 sm:w-72 h-52' />;
                })}
            </div> :
                <Tabs defaultValue="" className='space-y-10'>
                    <TabsList>
                        <TabsTrigger disabled={data?.loading} value=''>All</TabsTrigger>
                        <TabsTrigger disabled={data?.loading} value='github'>Github</TabsTrigger>
                        <TabsTrigger disabled={data?.loading} value='google'>Google</TabsTrigger>
                    </TabsList>
                    <TabsContent value='' className='flex flex-wrap gap-4 m-0'>
                        {data?.searchResults?.map((user: UserCardProps) => {
                            return <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                    <TabsContent value='github' className='flex flex-wrap gap-4'>
                        {data?.searchResults?.map((user: UserCardProps) => {
                            return user.accounts[0].provider === 'github' && <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                    <TabsContent value='google' className='flex flex-wrap gap-4'>
                        {data?.searchResults?.map((user: UserCardProps) => {
                            return user.accounts[0].provider === 'google' && <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                </Tabs>}
        </div>
    );
};

export default UsersPage;