export const SUPPORTED_LANGUAGES = ["python", "javascript", "c", "cpp", "typescript", "shell", "sql"];

export const capitalise = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}
