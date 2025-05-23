"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { newSupportRequest } from '../actions'
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer/Footer';
import { motion } from 'motion/react';

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
      <div className='w-full h-screen flex items-center justify-center   relative'>
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handelSubmit} className='w-11/12 sm:w-[30rem] h-fit flex flex-col gap-5 sm:p-8 rounded-xl'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-bold my-2'>Contact Us</h1>
            <p className='dark:text-neutral-300 text-neutral-700'>Get in touch with the CodeFramer for inquiries.</p>
          </div>
          <Input name="name" value={data.name} onChange={valHandler} placeholder='Fullname' className='border border-neutral-600 dark:border-neutral-400 px-6 h-12 text-md rounded-2xl bg-card' required />
          <Input name="email" value={data.email} onChange={valHandler} type='email' placeholder='Email' className='border border-neutral-600 dark:border-neutral-400 px-6 h-12 text-md rounded-2xl bg-card' required />
          <Textarea name="message" value={data.message} onChange={valHandler} placeholder='Message' className='border border-neutral-600 dark:border-neutral-400 px-6 min-h-28 max-h-60 text-md rounded-2xl bg-card' required />
          <Button size="lg" className='text-md w-52 rounded-2xl' type='submit' disabled={loading}>Submit</Button>
        </motion.form>
      </div>
      <Footer />
    </>
  )
}

export default Contact;