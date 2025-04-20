import Markdown from 'markdown-to-jsx';
import { getData } from '@/app/actions';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { ArrowLeft, PenLine } from 'lucide-react';
import { Metadata } from 'next';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import { auth } from '@/auth';

export default async function Blog({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getData({ url: `/api/blogs/${slug}`, cache: true });
    const session = await auth();
    const user = session?.user;
    const isAuthor = data?.User.id === user?.id;

    if (data?.error) {
        return (
            <div className="place-items-center place-content-center w-full h-screen">
                <h1 className='text-2xl font-bold'>{data.error}</h1>
            </div>
        );
    }

    return (
        <div className="place-items-center">
            <section className='my-28 space-y-10 px-5'>
                <div className='flex justify-between text-sm text-neutral-600 hover:text-black'>
                    <Link href={"/blogs"} className='flex no-underline items-center gap-2 dark:text-neutral-300 hover:dark:text-white'>
                        <ArrowLeft size={15} /> Back to Blog
                    </Link>
                    {isAuthor && <Link href={`/blogs/${slug}/edit`} aria-label='Edit Blog' className='flex items-center gap-2 dark:text-neutral-300 hover:dark:text-white'><PenLine size={15} />Edit </Link>}
                </div>
                <article className='prose prose-stone lg:prose-lg dark:prose-invert prose-h1:leading-tight'>
                    <div className='my-6 text-sm'>
                        <time>{new Date(data.createdAt || "").toDateString()}</time>
                    </div>
                    <h1 className='text-3xl font-bold'>{data?.title}</h1>
                    <div className='space-y-2'>
                        <span className='text-sm'>{`Posted by: ${data.User.name} | @${data.User.username}`}</span>
                        <hr />
                    </div>
                    <Markdown options={{
                        overrides: {
                            pre: {
                                component: CodeSnippet,
                            }
                        },
                        enforceAtxHeadings: true
                    }}>{data?.content}</Markdown>
                </article>
            </section>
            <Footer />
        </div>
    );
}




export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const data = await getData({ url: `/api/blogs/${slug}` });

    if (data?.error) {
        return { title: "Blog Not Found", description: "Blog Not Found" };
    }

    return {
        title: data?.title,
        description: data?.description,
        creator: data?.User.username,
        keywords: data?.tags,
        openGraph: {
            title: data?.title,
            description: data?.description,
            url: process.env.BASE_URL + "/blogs/" + slug,
            siteName: "CodeFramer",
            images: [
                {
                    url: data?.thumbnail,
                    width: 800,
                    height: 600,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: data?.title,
            description: data?.description,
            images: [data?.thumbnail],
        },
    };
}