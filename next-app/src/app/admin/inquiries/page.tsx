"use client";
import InquiryCard, { InquiryCardProps } from '@/components/ui/InquiryCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import useFetch from '@/hooks/useFetch';
import { Skeleton } from '@/components/ui/skeleton';

const InquiryPage = () => {
    const { data, refetch, isError, error, loading } = useFetch('/api/admin/inquiries', "inquiries");
   
    if (isError) {
        return <div className='text-center text-2xl font-light'>{error?.message}</div>
    }

    const openInquiries = data?.filter((inquiry: InquiryCardProps) => inquiry.closed === false);
    const closedInquiries = data?.filter((inquiry: InquiryCardProps) => inquiry.closed === true);

    return (
        <div className='space-y-5'>
            <Tabs defaultValue="opened" className="w-full space-y-5">
                <TabsList className="grid grid-cols-2 w-fit">
                    <TabsTrigger value="opened">Opened</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                {loading ? <div className='flex flex-wrap gap-4'>
                    {Array.from({ length: 12 }).map((_, i) => {
                        return <Skeleton key={i} className='w-11/12 sm:w-80 h-64 flex-grow' />
                    })}
                </div> :
                    <>
                        <TabsContent value="opened">
                            <div className='flex gap-4 flex-wrap'>
                                {openInquiries?.length !== 0 ? openInquiries?.map((inquiry: InquiryCardProps) => {
                                    return inquiry.closed === false && <InquiryCard key={inquiry.id} {...inquiry} refetch={refetch} />
                                }) : <div className='mt-10 text-center font-light'>No opened inquiries.</div>}
                            </div>
                        </TabsContent>
                        <TabsContent value="closed">
                            <div className='flex gap-4 flex-wrap'>
                                {closedInquiries?.length !== 0 ? closedInquiries?.map((inquiry: InquiryCardProps) => {
                                    return inquiry.closed === true && <InquiryCard key={inquiry.id} {...inquiry} refetch={refetch} />
                                }) : <div className='mt-10 text-center font-light'>No closed inquiries.</div>}
                            </div>
                        </TabsContent>
                    </>}
            </Tabs>
        </div>
    )
}

export default InquiryPage;