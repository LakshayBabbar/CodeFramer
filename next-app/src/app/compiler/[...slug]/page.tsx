import CompilerEditor from "@/components/Editor/Compiler";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";
import { auth } from "@clerk/nextjs/server";

const getData = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      return {
        error: "Unauthorized access",
      };
    }
    const req = await fetch(`${process.env.BASE_URL}/api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!req.ok) {
      const errorText = (await req.json()) || { error: "Failed to fetch data" };
      throw new Error(`Error ${req.status}: ${errorText?.error}`);
    }
    const res = await req.json();
    return res;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  return {
    title: `Codeframer | online ${slug[0]} compiler`,
    description: `codeframer provides online ${slug[0]} compiler to compile and run your code online`,
  };
}

const Compiler = async ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  const isValidLang = SUPPORTED_LANGUAGES.find((lang) => lang === slug[0]);
  const access_key = process.env.ACCESS_KEY || "";

  if (!isValidLang) {
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        Language not supported
      </main>
    );
  }
  if (slug[1]) {
    const data = await getData(slug[1]);
    if (data.error)
      return (
        <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
          {data?.error}
        </main>
      );
    return (
      <CompilerEditor language={slug[0]} data={data} access_key={access_key} />
    );
  }
  return <CompilerEditor language={slug[0]} access_key={access_key} />;
};

export default Compiler;
