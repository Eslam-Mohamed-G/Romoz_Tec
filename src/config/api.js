// لو على الإنتاج Vercel نستخدم proxy
const isProduction = import.meta.env.MODE === "production";

export const BASE_URL = isProduction ? "/api" : import.meta.env.VITE_API_URL;
export const BASE_URL_image = import.meta.env.VITE_API_URL_IMG;