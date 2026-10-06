import fs from 'fs'
import { downloadMediaMessage } from 'baileys'

export async function photo(client, message) {
    const remoteJid = message.key.remoteJid
    let filename

    try {
        const quoted =
            message.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

        const target = quoted?.stickerMessage

        if (!target) {
            return await client.sendMessage(remoteJid, {
                text:
                    '📸 *ITACHI BOT*\n\n' +
                    'Répondez à un sticker pour le convertir en image.\n\n' +
                    'Usage: .photo (réponse à un sticker)'
            })
        }

        const buffer = await downloadMediaMessage(
            { message: quoted },
            'buffer'
        )

        if (!buffer) {
            return await client.sendMessage(remoteJid, {
                text: '❌ Impossible de télécharger le sticker.'
            })
        }

        if (!fs.existsSync('./temp')) {
            fs.mkdirSync('./temp', { recursive: true })
        }

        filename = `./temp/sticker-${Date.now()}.