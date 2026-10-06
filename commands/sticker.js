import pkg from 'wa-sticker-formatter'
const { Sticker, StickerTypes } = pkg

import { downloadMediaMessage } from 'baileys'
import fs from 'fs'
import sharp from 'sharp'
import ffmpeg from 'fluent-ffmpeg'

export async function sticker(client, message) {
    let tempInput
    let tempOutput

    const remoteJid = message.key?.remoteJid

    try {
        if (!remoteJid) {
            throw new Error('Remote JID introuvable.')
        }

        const quotedMessage =
            message.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

        const username =
            message.pushName || 'ITACHI'

        if (!quotedMessage) {
            return await client.sendMessage(remoteJid, {
                text:
                    '❌ *ITACHI BOT*\n\n' +
                    'Répondez à une image ou une vidéo pour la convertir en sticker.'
            })
        }

        const isVideo = !!quotedMessage.videoMessage
        const isImage = !!quotedMessage.imageMessage

        if (!isVideo && !isImage) {
            return await client.sendMessage(remoteJid, {
                text:
                    '❌ *ITACHI BOT*\n\n' +
                    'Le message sélectionné ne contient ni image ni vidéo.'
            })
        }

        const mediaBuffer = await downloadMediaMessage(
            { message: quotedMessage },
            'buffer'
        )

        if (!mediaBuffer) {
            return await client.sendMessage(remoteJid, {
                text:
                    '❌ *ITACHI BOT*\n\n' +
                    'Impossible de télécharger le média.'
            })
        }

        const uniqueId = Date.now()

        tempInput = isVideo
            ? `./temp_video_${uniqueId}.mp4`
            : `./temp_image_${uniqueId}.jpg`

        tempOutput =
            `./temp_sticker_${uniqueId}.webp`

        fs.writeFileSync(
            tempInput,
            mediaBuffer
        )

        if (isVideo) {
            console.log(
                '⚙️ ITACHI BOT : conversion vidéo → sticker...'
            )

            await new Promise((resolve, reject) => {
                ffmpeg(tempInput)
                    .output(tempOutput)
                    .outputOptions([
                        '-vf scale=512:512:flags=lanczos',
                        '-c:v libwebp',
                        '-q:v 50',
                        '-preset default',
                        '-loop 0',
                        '-an',
                        '-vsync 0'
                    ])
                    .on('end', resolve)
                    .on('error', (error) => {
                        console.error(
                            '❌ FFmpeg error:',
                            error
                        )
                        reject(error)
                    })
                    .run()
            })

        } else {
            console.log(
                '⚙️ ITACHI BOT : conversion image → sticker...'
            )

            await sharp(tempInput)
                .resize(512, 512, {
                    fit: 'inside'
                })
                .webp({
                    quality: 80
                })
                .toFile