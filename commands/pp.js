import { writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

export async function setpp(client, message) {
    try {
        const remoteJid = message.key.remoteJid
        const quoted =
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage

        if (!quoted && !message.message?.imageMessage) {
            return await client.sendMessage(remoteJid, {
                text: '📸 Réponds à une image.'
            })
        }

        const media = quoted || message
        const imageBuffer = await client.downloadMediaMessage(media)

        if (!imageBuffer) {
            return await client.sendMessage(remoteJid, {
                text: "❌ Impossible de télécharger l'image."
            })
        }

        const tempPath = join(tmpdir(), `pp_${Date.now()}.jpg`)
        writeFileSync(tempPath, imageBuffer)

        await client.updateProfilePicture(
            client.user