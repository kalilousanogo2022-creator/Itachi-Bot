async function bug(message, client, texts, num) {
    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            console.error('❌ ITACHI BOT : Remote JID introuvable.')
            return
        }

        await client.sendMessage(remoteJid, {
            image: {
                url: `database/${num}.jpg`
            },

            caption: `> ${texts}`,

            contextInfo: {
                externalAdReply: {
                    title: 'ITACHI BOT',
                    body: '𓆩 𝐔𝐂𝐇𝐈𝐇𝐀-𝐈𝐓𝐀𝐂𝐇𝐈 𓆪',

                    mediaType: 1,

                    thumbnailUrl:
                        'https://whatsapp.com',

                    renderLargerThumbnail: false,

                    mediaUrl: `database/${num}.jpg`,

                    sourceUrl: 'https://whatsapp.com'
                }
            }
        })

    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Bug message error:',
            error
        )
    }
}

export default bug