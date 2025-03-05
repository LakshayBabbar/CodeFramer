"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { newSupportRequest } from '../actions'
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';

const Contact = () => {
  const [data, setData] = React.useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await newSupportRequest(data);
    toast({
      title: res.message || res.error,
      description: new Date().toString(),
    })
    setLoading(false);
    setData({ name: "", email: "", message: "" });
  };

  const valHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <div className='h-screen place-items-center place-content-center relative'>
        <motion.form
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handelSubmit} className='w-11/12 sm:w-[30rem]  h-fit flex flex-col gap-5 sm:p-8 rounded-xl'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-bold my-2'>Contact Us</h1>
            <p className='dark:text-neutral-300 text-neutral-700'>Get in touch with the CodeFramer for inquiries.</p>
          </div>
          <Input name="name" value={data.name} onChange={valHandler} placeholder='Fullname' className='border-2 border-neutral-600 dark:border-neutral-400 px-6 h-12 text-md rounded-2xl' required />
          <Input name="email" value={data.email} onChange={valHandler} type='email' placeholder='Email' className='border-2 border-neutral-600 dark:border-neutral-400 px-6 h-12 text-md rounded-2xl' required />
          <Textarea name="message" value={data.message} onChange={valHandler} placeholder='Message' className='border-2 border-neutral-600 dark:border-neutral-400 px-6 min-h-28 max-h-60 text-md rounded-2xl' required />
          <Button size="lg" className='text-md w-52 rounded-2xl' type='submit' disabled={loading}>Submit</Button>
        </motion.form>
        <div className='fixed -z-10 w-2/4 h-48 rotate-12 -bottom-5 -left-5 bg-gradient-to-br from-blue-600 to-blue-700 blur-[200px]' />
      </div>
      <Footer />
    </>
  )
}

export default Contact;