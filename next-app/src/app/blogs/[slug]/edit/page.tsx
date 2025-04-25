"use client";
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useFetch from '@/hooks/useFetch';
import useSend from '@/hooks/useSend';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/Editor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function EditBlog() {
    const { status, data: session } = useSession();
    const { slug } = useParams();
    const { data } = useFetch(`/api/blogs/${slug}`, "edit_page");
    const [isDeleted, setIsDeleted] = React.useState(false);
    const req = useSend();
    const { push } = useRouter();
    const { toast } = useToast();

    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        content: '',
        tags: "",
    });

    const isAuth = status === 'authenticated' && data?.User?.id === session?.user?.id;

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                description: data.description,
                content: data.content,
                tags: data.tags.join(", "),
            });
        }
    }, [data, slug]);


    const onEditorChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            content: value,
        }));
    }

    const valHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDeleted(false);
        const res = await req.fetchData({
            url: "/api/admin/blog",
            method: 'PUT',
            body: {
                ...formData,
                tags: formData.tags.split(",").map((tag) => tag.trim()),
                id: data.id,
            },
        })
        toast({
            title: res?.message || res?.error
        })
        !res.error && push(`/blogs/${data.slug}`);
    }

    const deleteHandler = async () => {
        setIsDeleted(true);
        const res = await req.fetchData({
            url: "/api/admin/blog",
            method: 'DELETE',
            body: {
                id: data.id,
            },
        })
        toast({
            title: res?.message || res?.error
        })
        !res.error && push("/blogs");
    }

    return (isAuth) ? (
        <div className='w-full flex justify-center'>
            <form onSubmit={submitHandler} className='flex flex-col gap-4 my-24 w-11/12 sm:w-4/5'>
                <Input name='title' value={formData.title} onChange={valHandler} />
                <Input name='tags' value={formData.tags} onChange={valHandler} />
                <Textarea name='description' value={formData.description} onChange={valHandler} className='min-h-28 max-h-48' />
                <RichTextEditor content={data?.content} onChange={onEditorChange} />
                <div className='w-full flex gap-2'>
                    <Button onClick={deleteHandler} disabled={req.loading && isDeleted} variant="destructive" size="lg" className='grow'>Delete</Button>
                    <Button type='submit' disabled={req.loading && !isDeleted} size="lg" className='grow'>Update</Button>
                </div>
            </form>
        </div>
    ) : (
        <div className='text-center h-screen'>
            <p className='text-3xl font-light'>Unauthorized Access</p>
        </div>
    )
}