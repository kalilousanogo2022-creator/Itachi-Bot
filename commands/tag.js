import configmanager from '../utils/configmanager.js'

export async function tagall(client, message) {
    const remoteJid = message.key.remoteJid
    if (!remoteJid.includes('@g.us')) return

    try {
        const groupMetadata = await client.groupMetadata(remoteJid)
        const participants = groupMetadata.participants.map(user => user.id)
        const text = participants.map(user => `@${user.split('@')[0]}`).join(' \n')

        await client.sendMessage(remoteJid, {
            text: `╭─⌈ 🚀 ITACHI Broadcast ⌋
│
${text}
│
╰─⌊ Powered by ITACHI ⌉`,
            mentions: participants
        })

    } catch (error) {
        console.error("Tagall error:", error)
    }
}

export async function tagadmin(client, message) {
    const remoteJid = message.key.remoteJid
    const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'

    if (!remoteJid.includes('@g.us')) return

    try {
        const { participants } = await client.groupMetadata(remoteJid)
        const admins = participants
            .filter(p => p.admin && p.id !== botNumber)
            .map(p => p.id)

        if (admins.length === 0) return

        const text = `╭─⌈ 🛡️ ITACHI Alert ⌋
│ Admin Alert
│
${admins.map(user => `@${user.split('@')[0]}`).join('\n')}
│
╰─⌊ ITACHI Control ⌉`

        await