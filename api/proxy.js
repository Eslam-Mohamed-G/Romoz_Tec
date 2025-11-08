import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const path = req.query.path ? "/" + req.query.path.join("/") : "";
        const url = `${process.env.VITE_API_URL}${path}`;

        // قراءة body بشكل صحيح
        let body;
        if (req.method !== "GET" && req.method !== "HEAD") {
            let data = "";
            for await (const chunk of req) {
                data += chunk;
            }
            body = data || undefined;
        }

        const response = await fetch(url, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        res.status(response.status).send(data);
    } catch (err) {
        console.error("Proxy Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
}
