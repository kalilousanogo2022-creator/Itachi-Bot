export default async function react(client, message) {
    const remoteJid = message?.key?.remoteJid

    if (!remoteJid) {
        return
    }

    await client.sendMessage(remoteJid, {
        react: {
            text: '🐦‍🔥',
            key: message.key
        }
    })
}