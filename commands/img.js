import axios from "axios";

async function img(message, client) {
    const remoteJid = message.key.remoteJid;

    const text =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        "";

    const args = text.trim().split(/\s+/).slice(1);
    const query = args.join(" ");

    if (!query) {
        return await client.sendMessage(remoteJid, {
            text: "🖼️ Fournis des mots-clés\nExemple: .img hacker setup"
        });
    }

    try {
        await client.sendMessage(remoteJid, {
            text: `🔍 Recherche d'images pour "${query}"...`
        });

        const apiUrl =
            `https://christus-api.vercel.app/image/Pinterest?query=${encodeURIComponent(query)}&limit=10`;

        const response = await axios.get(apiUrl, {
            timeout: 15000
        });

        if (
           