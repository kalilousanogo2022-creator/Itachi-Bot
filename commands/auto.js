import configmanager from '../utils/configmanager.js'

export async function autorecord(client, message) {
    try {
        const remoteJid = message?.key?.remoteJid
        const number = client.user?.id?.split(':')[0]

        if (!remoteJid || !number) {
            return
        }

        const userConfig =
            configmanager.config?.users?.[number]

        if (!userConfig?.record) {
            return
        }

        await client.sendPresenceUpdate(
            'recording',
            remoteJid
        )

        setTimeout(async () => {
            try {
                await client.sendPresenceUpdate(
                    'available',
                    remoteJid
                )
            } catch (error) {
                console.error(
                    '❌ ITACHI BOT - Autorecord presence error:',
                    error
                )
            }
        }, 3000)

    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Autorecord error:',
            error
        )
    }
}

export async function autotype(client, message) {
    try {
        const remoteJid = message?.key?.remoteJid
        const number = client.user?.id?.split(':')[0]

        if (!remoteJid || !number) {
            return
        }

        const userConfig =
            configmanager.config?.users?.[number]

        if (!userConfig?.type) {
            return
        }

        await client.sendPresenceUpdate(
            'composing',
            remoteJid
        )

        setTimeout(async () => {
            try {
                await client.sendPresenceUpdate(
                    'available',
                    remoteJid
                )
            } catch (error) {
                console.error(
                    '❌ ITACHI BOT - Autotype presence error:',
                    error
                )
            }
        }, 3000)

    } catch (error) {
        console.error(
            '❌ ITACHI BOT - Autotype error:',
            error
        )
    }
}

export default {
    autorecord,
    autotype
}