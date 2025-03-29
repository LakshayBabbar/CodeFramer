import CompilerEditor from "@/components/Editor/Compiler";
import WebEditor from "@/components/Editor/WebEditor";
import { getData } from "@/app/actions";

const Compiler = async (props: { params: Promise<{ pid: string }> }) => {
  const { pid } = await (props.params);
  const data = await getData({ url: `/api/projects/${pid}` });

  if (!data.isPublic && !data.isOwner) {
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        <p>Unauthorized Access.</p>
      </main>
    );
  }

  if (data?.error)
    return (
      <main className="flex h-screen w-full items-center justify-center text-2xl font-light">
        {data?.error}
      </main>
    );

  return data.type === "WEB" ? < WebEditor data={data} /> : <CompilerEditor language={data?.languages[0]?.name} data={data} />;
}

export default Compiler;