import CompilerEditor from "@/components/Editor/Compiler";

const getData = async (id) => {
  try {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined in environment variables");
    }
    const req = await fetch(`${process.env.BASE_URL}/api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!req.ok) {
      const errorText = (await req.json()) || { error: "Failed to fetch data" };
      throw new Error(`Error ${req.status}: ${errorText?.error}`);
    }
    const res = await req.json();
    return res;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: `Codeframer | online ${slug[0]} compiler`,
    description: `codeframer provides online ${slug[0]} compiler to compile and run your code online`,
  };
}

const Compiler = async ({ params }) => {
  const { slug } = params;
  fetch(`${process.env.COMPILER_URL}/status`);
  if (slug[0] !== "python") {
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
    return <CompilerEditor language={slug[0]} data={data} />;
  }
  return <CompilerEditor language={slug[0]} />;
};

export default Compiler;
