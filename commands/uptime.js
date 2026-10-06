export async function uptime(client, message) {
    const remoteJid = message.key.remoteJid
    const uptime = process.uptime()

    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)

    const text = `┌─🤖 ITACHI BOT ─┐
│
│ ⏱️ Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s
│ 💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB
│
│ "Beyond limits, we rise."
│     - ITACHI -
└────────────────────┘`

    await client.sendMessage(remoteJid, { text })
}

export default uptime