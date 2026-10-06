import { ItachiNew } from '../utils/ItachiNew.js'
import { downloadMediaMessage } from 'baileys'
import fs from 'fs'
import path from 'path'

export async function viewonce(client, message) {
    const remoteJid = message.key.remoteJid
    const bot = client.user.id.split(':')[0] + '@s.whatsapp.net'

    // Get the quoted message
    const quotedMessage =
        message.message?.extendedTextMessage?.contextInfo?.quotedMessage

    // Check if it's a valid ViewOnce message
    if (
        !quotedMessage?.imageMessage?.viewOnce &&
        !quotedMessage?.videoMessage?.viewOnce &&
        !quotedMessage?.audioMessage?.viewOnce
    ) {
        await client.sendMessage(remoteJid, {
            text: '_Reply to a valid ViewOnce message._'
        })

        return
    }

    const content = ItachiNew(quotedMessage)

    // Function to disable the ViewOnce property
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

    // Modify the content
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
                    text: '_Failed to download the ViewOnce media. Please try again._'
                })
            }

            const tempFilePath = path.resolve(
                './temp_view_once_image.jpeg'
            )

            fs.writeFileSync(tempFilePath, mediaBuffer)

            await client.sendMessage(bot, {
                image: { url: tempFilePath }
            })

            fs.unlinkSync(tempFilePath)

        } else if (content?.videoMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            )

            if (!mediaBuffer) {
                console.error('Failed to download media.')

                return await client.sendMessage(remoteJid, {
                    text: '_Failed to download the ViewOnce media. Please try again._'
                })
            }

            const tempFilePath = path.resolve(
                './temp_view_once_video.mp4'
            )

            fs.writeFileSync(tempFilePath, mediaBuffer)

            await client.sendMessage(bot, {
                video: { url: tempFilePath }
            })

            fs.unlinkSync(tempFilePath)

        } else if (content?.audioMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            )

            if (!mediaBuffer) {
                console.error('Failed to download media.')

                return await client.sendMessage(remoteJid, {
                    text: '_Failed to download the ViewOnce media. Please try again._'
                })
            }

            const tempFilePath = path.resolve(
                './temp_view_once_audio.mp3'
            )

            fs.writeFileSync(tempFilePath, mediaBuffer)

            await client.sendMessage(bot, {
                audio: { url: tempFilePath }
            })

            fs.unlinkSync(tempFilePath)

        } else {
            console.error('No valid media found in the quoted message.')

            await client.sendMessage(remoteJid, {
                text: '_No valid ViewOnce media to modify and send._'
            })
        }

    } catch (error) {
        console.error(
            'Error modifying and sending ViewOnce message:',
            error
        )

        await client.sendMessage(remoteJid, {
            text: '_An error occurred while processing the ViewOnce message._'
        })
    }
}

export default viewonce