import axios from 'axios'
import stylizedChar from '../utils/fancy.js'

async function tiktok(client, message) {
    const remoteJid = message.key?.remoteJid

    const messageBody =
        message.message?.extendedTextMessage?.text ||
        message.message?.conversation ||
        ''

    const args = messageBody.slice(1).trim().split(/\s+/)[1]

    if (!args) {
        await client.sendMessage(remoteJid, {
            text: stylizedChar(
                '✨ ITACHI BOT | Veuillez fournir un lien TikTok.\n\nExemple : .tiktok https://vm.tiktok.com/...'
            )
        })
        return
    }

    if (!args.includes('tiktok.com')) {
        await client.sendMessage(remoteJid, {
            text: stylizedChar(
                "⚠️ Ce lien ne semble pas être un lien TikTok valide."
            )
        })
        return
    }

    await client.sendMessage(remoteJid, {
        text: stylizedChar(
            '🚀 Téléchargement en cours... Veuillez patienter ! ⏳'
        )
    })

    try {
        const apiUrl =
            `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(args)}`

        const { data } = await axios.get(apiUrl)

        if (!data.status || !data.data) {
            await client.sendMessage(remoteJid, {
                text: stylizedChar(
                    '💔 Impossible de télécharger cette vidéo TikTok.'
                )
            })
            return
        }

        const {
            title,
            like,
            comment,
            share,
            author,
            meta
        } = data.data

        const videoUrl =
            meta?.media?.find(
                v => v.type === 'video'
            )?.org

        const views =
            meta?.play_count || 'N/A'

        if (!videoUrl) {
            await client.sendMessage(remoteJid, {
                text: stylizedChar(
                    '⚠️ Impossible de récupérer l\'URL de la vidéo.'
                )
            })
            return
        }

        const caption = stylizedChar(
            `🎬 *TikTok Video Downloaded!* 🎬

👤 *Créateur :* ${
                author?.nickname || 'Inconnu'
            } (@${
                author?.username || 'unknown'
            })

📝 *Titre :* ${
                title || 'Aucun titre disponible'
            }

👁️ *Vues :* ${views}
❤️ *Likes :* ${like ?? 'N/A'}
💬 *Commentaires :* ${comment ?? 'N/A'}
🔗 *Partages :* ${share ?? 'N/A'}

𓆩 𝐔𝐂𝐇𝐈𝐇𝐀-𝐈𝐓𝐀𝐂𝐇𝐈 𓆪`
        )

        await client.sendMessage(
            remoteJid,
            {
                video: {
                    url: videoUrl
                },
                caption,
                contextInfo: {
                    mentionedJid: [
                        message.key.participant ||
                        remoteJid
                    ]
                }
            },
            {
                quoted: message
            }
        )

    } catch (e) {
        console.error(
            '🔥 Error during TikTok download:',
            e
        )

        await client.sendMessage(remoteJid, {
            text: stylizedChar(
                `🚨 Une erreur est survenue : ${
                    e.message
                } 🚨`
            )
        })
    }
}

export default tiktok