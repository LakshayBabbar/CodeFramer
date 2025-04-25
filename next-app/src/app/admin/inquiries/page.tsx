"use client";
import InquiryCard, { InquiryCardProps, InquiryCardSkeleton } from '@/components/ui/InquiryCard'
import React from 'react'
import useFetch from '@/hooks/useFetch';

const InquiryPage = () => {
    const { data, refetch, isError, error, loading } = useFetch('/api/admin/inquiries', "inquiries");

    if (isError) {
        return <div className='text-center text-2xl font-light'>{error?.message}</div>
    }
    return (
        <div className='space-y-5 flex flex-col items-center my-10'>
            <div className='w-full md:w-fit grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
                {loading ? Array.from({ length: 12 }).map((_, i) => {
                    return <InquiryCardSkeleton key={i} />
                }) : data?.map((inquiry: InquiryCardProps) => {
                    return <InquiryCard key={inquiry.id} {...inquiry} refetch={refetch} />
                })}
            </div>
        </div>
    )
}

export default InquiryPage;