import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const url = `${process.env.VITE_API_URL}${req.url.replace(/^\/api/, '')}`;

        const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

        const response = await fetch(url, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
                ...req.headers
            },
            body: body
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
