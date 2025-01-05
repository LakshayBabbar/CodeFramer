export const SUPPORTED_LANGUAGES = ["python", "cpp", "typescript", "javascript", "c"];

export const capitalise = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}