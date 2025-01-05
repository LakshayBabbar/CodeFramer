import CompilerEditor from "@/components/Editor/Compiler";
import { auth } from "@/auth";
import { getData } from "@/app/actions";

const Compiler = async (props: { params: Promise<{ pid: string }> }) => {
  const { pid } = await (props.params);
  const session = await auth();
  const data = await getData({ url: `/api/projects/${pid}` });

  if (!session?.user) {
    return <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
      <p>Unauthorized Access.</p>
    </main>
  }

  if (data?.error)
    return (
      <main className="flex h-screen w-full items-center justify-center text-2xl font-light">
        {data?.error}
      </main>
    );

  return session.user ? (
    <CompilerEditor language={data?.languages[0]?.name} data={data} />
  ) : null;
}

export default Compiler;