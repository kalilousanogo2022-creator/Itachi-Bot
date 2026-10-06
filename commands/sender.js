import stylizedChar from "../utils/fancy.js"

async function sender(message, client, texts) {
    const remoteJid = message?.key?.remoteJid

    if (!remoteJid) {
        console.error("❌ ITACHI BOT : Remote JID introuvable.")
        return
    }

    try {
        await client.sendMessage(remoteJid, {
            text: stylizedChar(`> _*${texts}*_`)
        })
    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Erreur sender:",
            error
        )
    }
}

export default sender