import prisma from "@/config/db";

export const SUPPORTED_LANGUAGES = ["python", "sql", "javascript", "c", "cpp", "shell"];

export const capitalise = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
}

export const generateUniqueUsername = async (uname: string) => {
    let baseUsername = uname.toLowerCase().trim().replace(/\s+/g, "").slice(0, 20);
    if (baseUsername.length < 3) baseUsername = "user" + Math.floor(100 + Math.random() * 900);

    let username = baseUsername;
    let exists = await prisma.user.findUnique({ where: { username } });

    while (exists) {
        username = baseUsername.slice(0, 16) + Math.floor(1000 + Math.random() * 9000);
        exists = await prisma.user.findUnique({ where: { username } });
    }

    return username;
};
