import { getData } from '@/app/actions';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { ArrowLeft, PenLine } from 'lucide-react';
import { Metadata } from 'next';
import parse, { DOMNode, domToReact } from 'html-react-parser';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import { auth } from '@/auth';

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
            <div className="w-full h-screen text-center">
                <h1 className='text-2xl font-bold'>{data.error}</h1>
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data?.title,
        description: data?.description,
        image: data?.thumbnail,
        author: {
            "@type": "Person",
            name: data?.User.name,
            url: `${process.env.BASE_URL}/user/${data?.User.username}`,
        },
        publisher: {
            "@type": "Organization",
            name: "CodeFramer",
            logo: {
                "@type": "ImageObject",
                url: '/logo.webp',
            },
        },
        datePublished: data?.createdAt,
        dateModified: data?.updatedAt || data?.createdAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${process.env.BASE_URL}/blogs/${data?.slug}`,
        },
    }

    return (
        <div className="flex flex-col items-center">
            <section className='my-28 space-y-10 px-5'>
                <div className='flex justify-between text-sm text-neutral-600 hover:text-black'>
                    <Link href={"/blogs"} className='flex no-underline items-center gap-2 dark:text-neutral-300 dark:hover:text-white'>
                        <ArrowLeft size={15} /> Back to Blog
                    </Link>
                    {isAuthor && <Link href={`/blogs/${slug}/edit`} aria-label='Edit Blog' className='flex items-center gap-2 dark:text-neutral-300 dark:hover:text-white'><PenLine size={15} />Edit </Link>}
                </div>
                <article className='prose prose-stone lg:prose-lg dark:prose-invert prose-h1:leading-tight'>
                    <div className='my-6 text-sm'>
                        <time>{new Date(data.createdAt || "").toDateString()}</time>
                    </div>
                    <h1 className='text-3xl font-bold'>{data?.title}</h1>
                    <span className='text-sm'>{`Posted by: ${data.User.name} | @${data.User.username}`}</span>
                    {parse(data?.content, {
                        replace: (domNode: DOMNode) => {
                            if (
                                domNode.type === 'tag' &&
                                domNode.name === 'code' &&
                                domNode.parent &&
                                'name' in domNode.parent &&
                                domNode.parent.name === 'pre'
                            ) {
                                const classAttr = domNode.attribs?.class || '';
                                const languageMatch = classAttr.match(/language-(\w+)/);
                                const language = languageMatch?.[1] || 'text';

                                const codeContent = domToReact(domNode.children as DOMNode[]) as string;

                                return (
                                    <CodeSnippet language={language} code={codeContent} />
                                );
                            }
                        },
                    })}
                </article>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </section>
            <Footer />
        </div>
    );
}