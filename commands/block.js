import sender from '../commands/sender.js'

async function block(client, message) {
    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            throw new Error('Remote JID introuvable.')
        }

        let target

        const quotedMessage =
            message.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

        if (quotedMessage) {
            target =
                message.message?.extendedTextMessage
                    ?.contextInfo?.participant
        } else {
            const messageBody =
                message.message?.extendedTextMessage?.text ||
                message.message?.conversation ||
                ''

            const commandAndArgs =
                messageBody.slice(1).trim()

            const args =
                commandAndArgs.split(/\s+/).slice(1)

            if (args.length > 0) {
                const number =
                    args[0].replace(/\D/g, '')

                if (number) {
                    target =
                        `${number}@s.whatsapp.net`
                }
            }
        }

        if (!target) {
            await sender(
                message,
                client,
                '❌ Veuillez spécifier un numéro.'
            )
            return
        }

        await client.updateBlockStatus(
            target,
            'block'
        )

        console.log(
            '✅ Contact bloqué avec succès :',
            target
        )

        await sender(
            message,
            client,
            `🚫 Contact bloqué avec succès.\n\n👤 ${target}`
        )

    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Block error:',
            error
        )

        await sender(
            message,
            client,
            `❌ Erreur lors du blocage : ${error.message}`
        )
    }
}

async function unblock(client, message) {
    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            throw new Error('Remote JID introuvable.')
        }

        let target

        const quotedMessage =
            message.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

        if (quotedMessage) {
            target =
                message.message?.extendedTextMessage
                    ?.contextInfo?.participant
        } else {
            const messageBody =
                message.message?.extendedTextMessage?.text ||
                message.message?.conversation ||
                ''

            const commandAndArgs =
                messageBody.slice(1).trim()

            const args =
                commandAndArgs.split(/\s+/).slice(1)

            if (args.length > 0) {
                const number =
                    args[0].replace(/\D/g, '')

                if (number) {
                    target =
                        `${number}@s.whatsapp.net`
                }
            }
        }

        if (!target) {
            await sender(
                message,
                client,
                '❌ Veuillez spécifier un numéro.'
            )
            return
        }

        await client.updateBlockStatus(
            target,
            'unblock'
        )

        console.log(
            '✅ Contact débloqué avec succès :',
            target
        )

        await sender(
            message,
            client,
            `✅ Contact débloqué avec succès.\n\n👤 ${target}`
        )

    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Unblock error:',
            error
        )

        await sender(
            message,
            client,
            `❌ Erreur lors du déblocage : ${error.message}`
        )
    }
}

export default {
    block,
    unblock
}