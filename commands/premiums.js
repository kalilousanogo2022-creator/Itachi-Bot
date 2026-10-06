import configmanager from "../utils/configmanager.js"

export async function modifyprem(client, message, action) {
    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            throw new Error("Invalid remote JID.")
        }

        const messageBody =
            message.message?.extendedTextMessage?.text ||
            message.message?.conversation ||
            ""

        const commandAndArgs =
            messageBody.slice(1).trim()

        const parts =
            commandAndArgs.split(/\s+/)

        const args =
            parts.slice(1)

        let participant

        const quotedMessage =
            message.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage

        if (quotedMessage) {
            participant =
                message.message?.extendedTextMessage
                    ?.contextInfo?.participant ||
                message.key?.participant
        } else if (args.length > 0) {
            const jidMatch =
                args[0].match(/\d+/)

            if (!jidMatch) {
                throw new Error(
                    "Invalid participant format."
                )
            }

            participant =
                `${jidMatch[0]}@s.whatsapp.net`
        } else {
            throw new Error(
                "No participant specified."
            )
        }

        // Créer la structure si elle n'existe pas
        if (!configmanager.premiums) {
            configmanager.premiums = {}
        }

        if (!configmanager.premiums.premiumUser) {
            configmanager.premiums.premiumUser = {}
        }

        if (!configmanager.premiums.premiumUser.p) {
            configmanager.premiums.premiumUser.p = {}
        }

        let premium =
            configmanager.premiums
                .premiumUser
                .p
                .premium

        if (action === "add") {
            if (premium === participant) {
                return
            }

            configmanager.premiums
                .premiumUser
                .p
                .premium = participant

            configmanager.saveP()

            await client.sendMessage(remoteJid, {
                text:
                    `✅ *ITACHI BOT*\n\n` +
                    `👤 ${participant}\n` +
                    `a été ajouté comme utilisateur Premium.`
            })
        }

        else if (action === "remove") {
            if (premium !== participant) {
                return
            }

            configmanager.premiums
                .premiumUser
                .p
                .premium = ""

            configmanager.saveP()

            await client.sendMessage(remoteJid, {
                text:
                    `🚫 *ITACHI BOT*\n\n` +
                    `👤 ${participant}\n` +
                    `a été retiré de la liste Premium.`
            })
        }

        else {
            throw new Error(
                "Invalid premium action."
            )
        }

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Premium error:",
            error
        )

        const remoteJid =
            message?.key?.remoteJid

        if (remoteJid) {
            await client.sendMessage(remoteJid, {
                text:
                    `❌ *ITACHI BOT*\n\n` +
                    `Erreur : ${error.message}`
            })
        }
    }
}

export async function addprem(client, message) {
    await modifyprem(
        client,
        message,
        "add"
    )
}

export async function delprem(client, message) {
    await modifyprem(
        client,
        message,
        "remove"
    )
}

export default {
    addprem,
    delprem
}