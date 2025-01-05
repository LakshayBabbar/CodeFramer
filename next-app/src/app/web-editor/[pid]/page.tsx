import { getData } from "@/app/actions";
import { auth } from "@/auth";
import WebEditor from "@/components/Editor/WebEditor";

const WebEditorPage = async ({
  params,
}: {
  params: Promise<{ pid: string }>
}) => {
  const { pid } = await params;
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


  return session?.user ? (<WebEditor data={data} />) : null;
};

export default WebEditorPage;