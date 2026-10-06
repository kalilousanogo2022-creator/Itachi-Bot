import configmanager from "../utils/configmanager.js"
import bug from "../commands/bug.js"

function isEmoji(value) {
    if (!value || typeof value !== "string") {
        return false
    }

    const emojiRegex =
        /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})(?:\uFE0F|\u200D(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}))*$/u

    return emojiRegex.test(value)
}

function getMessageText(message) {
    return (
        message?.message?.conversation ||
        message?.message?.extendedTextMessage?.text ||
        ""
    )
}

function getBotNumber(client) {
    return client?.user?.id?.split(":")[0]
}

function ensureUserConfig(number) {
    if (!number) {
        return null
    }

    if (!configmanager.config.users) {
        configmanager.config.users = {}
    }

    if (!configmanager.config.users[number]) {
        configmanager.config.users[number] = {}
    }

    return configmanager.config.users[number]
}

// ===============================
// SET PREFIX
// ===============================

export async function setprefix(client, message) {
    const number = getBotNumber(client)

    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            throw new Error("Message JID is undefined.")
        }

        const userConfig = ensureUserConfig(number)

        if (!userConfig) {
            throw new Error("Bot number is undefined.")
        }

        const text = getMessageText(message)

        const args =
            text
                .slice(1)
                .trim()
                .split(/\s+/)
                .slice(1)

        if (args.length > 0 && args[0].trim()) {
            const newPrefix = args[0].trim()

            userConfig.prefix = newPrefix

            configmanager.save()

            await bug(
                message,
                client,
                "Prefix changed successfully",
                3
            )

            return
        }

        await bug(
            message,
            client,
            "Specify the prefix.",
            3
        )

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Prefix error:",
            error
        )

        const remoteJid =
            message?.key?.remoteJid

        if (remoteJid) {
            await client.sendMessage(remoteJid, {
                text:
                    `❌ Erreur lors de la modification du préfixe : ${error.message}`
            })
        }
    }
}

// ===============================
// SET REACTION
// ===============================

export async function setreaction(client, message) {
    const number = getBotNumber(client)

    try {
        const remoteJid = message?.key?.remoteJid

        if (!remoteJid) {
            throw new Error("Message JID is undefined.")
        }

        const userConfig = ensureUserConfig(number)

        if (!userConfig) {
            throw new Error("Bot number is undefined.")
        }

        const text = getMessageText(message)

        const args =
            text
                .slice(1)
                .trim()
                .split(/\s+/)
                .slice(1)

        const reaction =
            args.join(" ").trim()

        if (reaction && isEmoji(reaction)) {
            userConfig.reaction = reaction

            configmanager.save()

            await bug(
                message,
                client,
                "Reaction changed successfully",
                3
            )

            return
        }

        await bug(
            message,
            client,
            "Reaction was not changed successfully",
            3
        )

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Reaction error:",
            error
        )

        const remoteJid =
            message?.key?.remoteJid

        if (remoteJid) {
            await client.sendMessage(remoteJid, {
                text:
                    `❌ Erreur lors de la modification de la réaction : ${error.message}`
            })
        }
    }
}

// ===============================
// SET WELCOME
// ===============================

export async function setwelcome(client, message) {
    const number = getBotNumber(client)
    const remoteJid = message?.key?.remoteJid

    if (!number || !remoteJid) {
        return
    }

    const userConfig =
        configmanager.config?.users?.[number]

    if (!userConfig) {
        return
    }

    try {
        const text = getMessageText(message)

        const args =
            text
                .slice(1)
                .trim()
                .split(/\s+/)
                .slice(1)

        const option =
            args.join(" ").trim().toLowerCase()

        if (option === "on") {
            userConfig.welcome = true

            configmanager.save()

            await bug(
                message,
                client,
                "Welcome has been turned on",
                5
            )

        } else if (option === "off") {
            userConfig.welcome = false

            configmanager.save()

            await bug(
                message,
                client,
                "Welcome has been turned off",
                5
            )

        } else {
            await bug(
                message,
                client,
                "Select an option: on / off",
                3
            )
        }

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Welcome error:",
            error
        )
    }
}

// ===============================
// SET AUTORECORD
// ===============================

export async function setautorecord(client, message) {
    const number = getBotNumber(client)
    const remoteJid = message?.key?.remoteJid

    if (!number || !remoteJid) {
        return
    }

    const userConfig =
        configmanager.config?.users?.[number]

    if (!userConfig) {
        return
    }

    try {
        const text = getMessageText(message)

        const args =
            text
                .slice(1)
                .trim()
                .split(/\s+/)
                .slice(1)

        const option =
            args.join(" ").trim().toLowerCase()

        if (option === "on") {
            userConfig.record = true

            configmanager.save()

            await bug(
                message,
                client,
                "Autorecord has been turned on",
                5
            )

        } else if (option === "off") {
            userConfig.record = false

            configmanager.save()

            await bug(
                message,
                client,
                "Autorecord has been turned off",
                5
            )

        } else {
            await bug(
                message,
                client,
                "Select an option: on / off",
                3
            )
        }

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Autorecord error:",
            error
        )
    }
}

// ===============================
// SET AUTOTYPE
// ===============================

export async function setautotype(client, message) {
    const number = getBotNumber(client)
    const remoteJid = message?.key?.remoteJid

    if (!number || !remoteJid) {
        return
    }

    const userConfig =
        configmanager.config?.users?.[number]

    if (!userConfig) {
        return
    }

    try {
        const text = getMessageText(message)

        const args =
            text
                .slice(1)
                .trim()
                .split(/\s+/)
                .slice(1)

        const option =
            args.join(" ").trim().toLowerCase()

        if (option === "on") {
            userConfig.type = true

            configmanager.save()

            await bug(
                message,
                client,
                "Autotype has been turned on",
                5
            )

        } else if (option === "off") {
            userConfig.type = false

            configmanager.save()

            await bug(
                message,
                client,
                "Autotype has been turned off",
                5
            )

        } else {
            await bug(
                message,
                client,
                "Select an option: on / off",
                3
            )
        }

    } catch (error) {
        console.error(
            "❌ ITACHI BOT - Autotype error:",
            error
        )
    }
}

// ===============================
// PUBLIC MODE
// ===============================

export async function isPublic(client, message) {
    try {
        const number = getBotNumber(client)

        const remoteJid =
            message?.key?.remoteJid

        if (!number || !remoteJid) {
            throw new Error(
                "Unable to identify the bot."
            )
        }

        const userConfig =
            configmanager.config?.users?.[number]

        if (!userConfig) {
            return
        }

        const botPrefix =
            userConfig.prefix || "."

        const sender =
            message?.key?.participant ||
            remoteJid

        const senderNumber =
            sender.split("@")[0].split(":")[0]

        const text =
            getMessageText(message)

        const command =
            text
                .slice(botPrefix.length)
                .trim()
                .split(/\s+/)[1]
                ?.toLowerCase()

        // Seul le bot lui-même ou son owner
        // doit pouvoir modifier le mode public.
        const isOwner =
            message?.key?.fromMe ||
            senderNumber === number

        if (!isOwner) {
            await client.sendMessage(remoteJid, {
                text:
                    "> *_Seul mon propriétaire peut utiliser cette commande._*"
            })

            return
        }

        if (command === "on") {
            userConfig.publicMode = true

            configmanager.save()

            await client.sendMessage(remoteJid, {
                text:
                    "✅ Mode public activé"
            })

        } else if (command === "off") {
            userConfig.publicMode = false

            configmanager.save()

            await client.sendMessage(remoteJid, {
                text:
                    "🚫 Mode public dés