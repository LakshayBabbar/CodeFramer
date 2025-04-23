"use client";
import RichTextEditor from '@/components/Editor/RichTextEditor'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'
import useSend from '@/hooks/useSend';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const Blog = () => {
  const [formData, setFormData] = React.useState({
    title: '',
    tags: '',
    content: '',
    description: ''
  });
  const { fetchData, loading } = useSend();
  const { toast } = useToast();
  const { push } = useRouter();

  const onEditorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  }

  const onVlaueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchData({ url: "/api/admin/blog", method: "POST", body: formData });
    toast({
      title: res?.error || res?.message,
      description: new Date(Date.now()).toString(),
    })
    if (!res?.error) {
      push(`/blogs/${res?.slug}`);
    }
  }

  return (
    <div className='flex justify-center'>
      <form onSubmit={submitHandler} className='w-full sm:w-4/5 lg:w-1/2 space-y-4'>
        <h1 className='text-3xl font-bold'>What&apos;s on your mind?</h1>
        <Input name='title' placeholder='Title' onChange={onVlaueChange} className='h-11' required />
        <Input name='tags' placeholder='Tags (Seprated by commas).' onChange={onVlaueChange} className='h-11' required />
        <Textarea name='description' placeholder='Meta Description' onChange={onVlaueChange} className="h-20 max-h-32" required />
        <RichTextEditor onChange={onEditorChange} content='' className='h-fit w-full' />
        <Button size="lg" type='submit' disabled={loading}>Create</Button>
      </form>
    </div>
  )
}

export default Blog;