import { ItachiNew } from '../utils/ItachiNew.js'
import { downloadMediaMessage } from 'baileys'
import fs from 'fs'
import path from 'path'
import stylizedChar from '../utils/fancy.js'

export async function viewonce(client, message) {
    const remoteJid = message.key.remoteJid
    const quotedMessage =
        message.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (
        !quotedMessage?.imageMessage?.viewOnce &&
        !quotedMessage?.videoMessage?.viewOnce &&
        !quotedMessage?.audioMessage?.viewOnce
    ) {
        await client.sendMessage(remoteJid, {
            text: stylizedChar('_Reply to a valid ViewOnce message._')
        })
        return
    }

    const content = ItachiNew(quotedMessage)

    function modifyViewOnce(obj) {
        if (typeof obj !== 'object' || obj === null) return

        for (const key in obj) {
            if (key === 'viewOnce' && typeof obj[key] === 'boolean') {
                obj[key] = false
            } else if (typeof obj[key] === 'object') {
                modifyViewOnce(obj[key])
            }
        }
    }

    modifyViewOnce(content)

    try {
        if (content?.imageMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            )

            if (!mediaBuffer) {
                console.error('Failed to download media.')

                return await client.sendMessage(remoteJid, {
                    text: stylizedChar(
                        '_Failed to download the ViewOnce media. Please try again._'
                    )
                })
            }

            const tempFilePath = path.resolve('./temp_view_once_image.jpeg')
            fs.writeFileSync(tempFilePath, mediaBuffer)

           