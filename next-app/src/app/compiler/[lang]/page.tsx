import CompilerEditor from "@/components/Editor/Compiler";
import { SUPPORTED_LANGUAGES } from "@/lib/lang";
  
const Compiler = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  console.log(lang)
  const isValidLang = SUPPORTED_LANGUAGES.find((language) => language === lang);
  const access_key = process.env.NEXT_PUBLIC_ACCESS_KEY || "";

  if (!isValidLang) {
    return (
      <main className="flex h-screen w-full items-center justify-center text-3xl font-light">
        Language not supported
      </main>
    );
  }

  return <CompilerEditor language={lang} access_key={access_key} />;
};

export default Compiler;
