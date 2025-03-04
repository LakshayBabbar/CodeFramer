export const SUPPORTED_LANGUAGES = ["python", "sql", "javascript", "c", "cpp", "shell"];

export const capitalise = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}
