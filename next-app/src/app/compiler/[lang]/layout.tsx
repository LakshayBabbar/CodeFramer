import React from 'react'


export async function generateMetadata(
    props: {
        params: Promise<{ lang: string }>;
    }
) {
    const params = await props.params;
    const { lang } = params;
    return {
        title: `Online ${lang} compiler`,
        description: `Compile and run Python code instantly with CodeFramer’s online ${lang} compiler. Get real-time output, debug your code, and enhance your skills with built-in AI assistance.`,
    };
}


const Layout = ({ children }: { children: React.ReactNode }) => {
    return children
}

export default Layout