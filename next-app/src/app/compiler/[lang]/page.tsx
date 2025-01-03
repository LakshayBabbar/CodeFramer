import CompilerEditor from "@/components/Editor/Compiler";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";

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
