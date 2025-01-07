export const SUPPORTED_LANGUAGES = ["python", "javascript", "c", "cpp", "typescript",];

export const capitalise = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}