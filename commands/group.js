const antilinkSettings = {}
const warnStorage = {}

export async function antilink(client, message) {
    const groupId = message.key.remoteJid

    if (!groupId.includes('@g.us')) return

    try {
        const metadata = await client.groupMetadata(groupId)
        const senderId = message.key.participant || groupId
        const sender = metadata.participants.find(p => p.id === senderId)

        if (!sender?.admin) {
            return await client.sendMessage(groupId, {
                text: '🔒 *Admins uniquement !*'
            })
        }

        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            ''

        const args = text.split(/\s+/).slice(1)
        const action = args[0]?.toLowerCase()

        if (!action) {
            const usage = `🔒 *ITACHI BOT - Antilink*

.antilink on
.antilink off
.antilink set delete | kick | warn
.antilink status`

            return await client.sendMessage(groupId, {
                text: usage
            })
        }

        switch (action) {
            case 'on':
                antilinkSettings[groupId] = {
                    enabled: true,
                    action: 'delete'
                }

                await client.sendMessage(groupId, {
                    text: '✅ *Antilink activé*'
                })
                break

            case 'off':
                delete antilinkSettings[groupId]

                await client.sendMessage(groupId, {