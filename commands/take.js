import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import { downloadMediaMessage } from 'baileys'
import fs from 'fs'
import path from 'path'
import stylizedChar from '../utils/fancy.js'

export async function take(client, message) {
    const remoteJid = message.key.remoteJid

    try {
        const messageBody =
            message.message?.extendedTextMessage?.text ||
            message.message?.conversation ||
            ''

        const quotedMessage =
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage

        const commandAndArgs = messageBody.slice(1).trim()
        const parts = commandAndArgs.split(/\s+/)
        const args = parts.slice(1)

        let username
        let text

        if (args.length === 0) {
            username = message.pushName || 'Unknown'
            text = username
        } else {
            username = args.join(' ')
            text = username
        }

        if (!quotedMessage?.stickerMessage) {
            return await client.sendMessage(remoteJid, {
                text: stylizedChar(
                    '❌ Reply to a sticker to modify it!'
                )
            })
        }

        const stickerBuffer = await downloadMediaMessage(
            { message: quotedMessage },
            'buffer',
            {},
            { logger: console }
        )

        if (!stickerBuffer) {
            return await client.sendMessage(remoteJid, {
                text: '❌ Failed to download sticker!'
            })
        }

        const tempStickerPath = path.resolve(
            './temp_sticker.webp'
        )

        fs.writeFileSync(
            tempStickerPath,
            stickerBuffer
        )

        try {
            const sticker = new Sticker(tempStickerPath, {
                pack: username,
                author: text,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 50,
                background: '#000000'
            })

            await sticker.toFile('sticker.webp')

            const stickerMessage =
                await sticker.toMessage()

            await client.sendMessage(
                remoteJid,
                stickerMessage,
                { quoted: message }
            )

            console.log(
                `✅ Sticker sent successfully with "${username}" metadata!`
            )

        } finally {
            if (fs.existsSync(tempStickerPath)) {
                fs.unlinkSync(tempStickerPath)
            }
        }

    } catch (error) {
        console.error('❌ Error:', error)

        await client.sendMessage(remoteJid, {
            text:
                `⚠️ Error modifying sticker:\n${error.message || error}`
        })
    }
}

export default take