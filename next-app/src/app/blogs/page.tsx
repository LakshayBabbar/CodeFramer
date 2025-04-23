import React from 'react'
import { getData } from '../actions'
import Footer from '@/components/Footer/Footer';
import BlogCard, { BlogCardProps } from '@/components/ui/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CodeFramer Blog | Developer Tips, Updates & Tutorials",
  description: "Stay updated with the latest developer tutorials, platform updates, and coding insights from the team behind CodeFramer - your go-to online IDE and compiler for modern web development.",
  keywords: "CodeFramer blog, developer tutorials, coding tips, online IDE updates, web development, compiler platform, programming insights, CodeFramer news",
  openGraph: {
    title: "CodeFramer Blog | Developer Tips, Updates & Tutorials",
    description: "Stay updated with the latest developer tutorials, platform updates, and coding insights from the team behind CodeFramer - your go-to online IDE and compiler for modern web development.",
    url: process.env.BASE_URL + "/blogs",
    siteName: "CodeFramer",
    images: [
      {
        url: "/codeframer.webp",
        width: 800,
        height: 600,
      },
    ],
  }
}

const Blogs = async () => {
  const data = await getData({ url: "/api/blogs" });
  if (data.error) {
    return (
      <div className='place-items-center place-content-center h-screen'>
        <h1 className='text-3xl font-light text-center'>{data?.error}</h1>
      </div>
    )
  }

  return (
    <div className='place-items-center'>
      <section className='my-28 space-y-10 w-fit px-5'>
        <div className='w-full'>
          {data.length > 0 ? <h1 className='text-3xl font-bold'>CodeFramer Dev Blog</h1> : <h1 className='text-center py-4 text-3xl font-light'>No blog found.</h1>}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data?.map((blog: BlogCardProps) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Blogs;