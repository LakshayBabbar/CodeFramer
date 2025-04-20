"use client";
import Link from 'next/link';
import React from 'react'
import { Button } from './button';
import { motion } from 'framer-motion';

export interface BlogCardProps {
    id: string;
    title: string;
    description: string;
    User: {
        username: string;
    };
    thumbnail?: string;
    slug: string;
    createdAt: string;
}

export default function BlogCard({ blog }: { blog: BlogCardProps }) {
    return (
        <motion.div
            className='bg-card border shadow-md rounded-xl p-4 md:max-w-96 gap-6 flex flex-col justify-between'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className='space-y-4'>
                <div className='flex justify-between dark:text-neutral-300 text-neutral-700'>
                    <time className='text-sm'>{new Date(blog?.createdAt).toDateString()}</time>
                    <span>~ {blog?.User?.username}</span>
                </div>
                <h2 className='text-xl font-semibold text-primary'><Link href={`/blogs/${blog?.slug}`}>{blog?.title}</Link></h2>
                <p className='mt-2'>{blog.description}</p>
            </div>
            <Link href={`/blogs/${blog.slug}`}>
                <Button className='w-full' variant="secondary">
                    Read More
                </Button>
            </Link>
        </motion.div>
    )
}