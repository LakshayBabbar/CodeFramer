"use client";
import React from 'react'
import useFetch from '@/hooks/useFetch';
import UserCard, { UserCardProps } from '@/components/ui/UserCard'
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const { data, isError, loading, error, refetch } = useFetch(`/api/admin/users?search=${debouncedSearchTerm}`, "users");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        refetch();
    }, [debouncedSearchTerm, refetch]);

    if (isError) {
        return <div className='text-2xl font-light text-center'>Error: {error?.message}</div>;
    }

    return (
        <div className='space-y-10'>
            <div className='w-full flex justify-center'>
                <Input
                    placeholder='Search users by name or email'
                    type='search'
                    value={searchTerm}
                    onChange={handleChange}
                    className='h-12 text-md md:w-[30rem]'
                />
            </div>
            {loading ? <div className='flex flex-wrap gap-4'>
                {Array.from({ length: 12 }).map((_, i) => {
                    return <Skeleton key={i} className='flex-grow w-4/5 sm:w-72 h-52' />;
                })}
            </div> :
                <Tabs defaultValue="" className='space-y-10'>
                    <TabsList>
                        <TabsTrigger disabled={loading} value=''>All</TabsTrigger>
                        <TabsTrigger disabled={loading} value='github'>Github</TabsTrigger>
                        <TabsTrigger disabled={loading} value='google'>Google</TabsTrigger>
                    </TabsList>
                    <TabsContent value='' className='flex flex-wrap gap-4 m-0'>
                        {data?.map((user: UserCardProps) => {
                            return <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                    <TabsContent value='github' className='flex flex-wrap gap-4'>
                        {data?.map((user: UserCardProps) => {
                            return user.accounts[0].provider === 'github' && <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                    <TabsContent value='google' className='flex flex-wrap gap-4'>
                        {data?.map((user: UserCardProps) => {
                            return user.accounts[0].provider === 'google' && <UserCard key={user.id} {...user} />;
                        })}
                    </TabsContent>
                </Tabs>}
        </div>
    );
};

export default UsersPage;