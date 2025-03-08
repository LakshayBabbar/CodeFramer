import CompilerEditor from "@/components/Editor/Compiler";
import { SUPPORTED_LANGUAGES } from "@/lib/helpers";
import { Metadata } from "next";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const { lang } = params;
  return {
    title: `Online ${lang} compiler`,
    description: `Compile and run ${lang} code instantly with CodeFramer’s online ${lang} compiler. Get real-time output, debug your code, and enhance your skills with built-in AI assistance.`,
    keywords: `${lang}, online compiler, code compiler, ${lang} compiler, compile ${lang} code, run ${lang} code, codeframer`,
  } as Metadata;
}

const Compiler = async (props: { params: Promise<{ lang: string }> }) => {
  const params = await props.params;
  const { lang } = params;
  const isValidLang = SUPPORTED_LANGUAGES.find((language) => language === lang);

  if (!isValidLang) {
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        Language not supported
      </main>
    );
  }

  return <CompilerEditor language={lang} />;
};

export default Compiler;