import configmanager from "../utils/configmanager.js"

const number = "22363101478"

if (!configmanager.config.users) {
    configmanager.config.users = {}
}

configmanager.config.users[number] = {
    sudoList: [`${number}@s.whatsapp.net`],
    tagAudioPath: "tag.mp3",
    antilink: false,
    response: true,
    autoreact: false,
    prefix: ".",
    reaction: "⚡",
    welcome: false,
    record: false,
    type: false,
    publicMode: false
}

configmanager.save()

if (!configmanager.premiums.premiumUser) {
    configmanager.premiums.premiumUser = {}
}

configmanager.premiums.premiumUser.p = {
    premium: number
}

configmanager.saveP()