export async function modifySudoList(client, message, list, action) {
    try {
        const remoteJid = message.key?.remoteJid

        if (!remoteJid) {
            throw new Error('Invalid remote JID.')
        }

        const messageBody =
            message.message?.extendedTextMessage?.text ||
            message.message?.conversation ||
            ''

        const commandAndArgs = messageBody.slice(1).trim()
        const parts = commandAndArgs.split(/\s+/)
        const args = parts.slice(1)

        let participant

        const quotedMessage =
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage

        if (quotedMessage) {
            participant =
                message.message?.extendedTextMessage?.contextInfo?.participant ||
                message.key?.participant
        } else if (args.length > 0) {
            const jidMatch = args[0].match(/\d+/)

            if (!jidMatch) {
                throw new Error('Invalid participant format.')
            }

            participant = `${jidMatch[0]}@s.whatsapp.net`
        } else {
            throw new Error('No participant specified.')
        }

        if (!participant) {
            throw new Error('Unable to identify participant.')
        }

        if (action === 'add') {
            if (!list.includes(participant)) {
                list.push(participant)

                await client.sendMessage(remoteJid, {
                    text:
                        `✅ *ITACHI BOT*\n\n` +
                        `👤 ${participant}\n` +
                        `a été ajouté à la liste Sudo.`
                })
            } else {
                await client.sendMessage(remoteJid, {
                    text:
                        `⚠️ *ITACHI BOT*\n\n` +
                        `${participant} est déjà dans la liste Sudo.`
                })
            }
        }

        else if (action === 'remove') {
            const index = list.indexOf(participant)

            if (index !== -1) {
                list.splice(index, 1)

                await client.sendMessage(remoteJid, {
                   