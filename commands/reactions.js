import configmanager from '../utils/configmanager.js'
import bug from '../commands/bug.js'

export async function auto(client, message, cond, emoji) {
    const remoteJid = message?.key?.remoteJid

    if (!remoteJid) {
        return
    }

    if (!cond) {
        return
    }

    try {
        await client.sendMessage(remoteJid, {
            react: {
                text: `${emoji}`,
                key: message.key
            }
        })
    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Auto-react error:',
            error
        )
    }
}

// Vérifie si le caractère est un emoji
function isEmoji(str) {
    const emojiRegex =
        /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})$/u

    return emojiRegex.test(str)
}

export async function autoreact(client, message) {
    const number =
        client.user?.id?.split(':')[0]

    try {
        const remoteJid =
            message.key?.remoteJid

        if (!remote