import fs from 'fs'

// path for config setup

console.log('initializing the config path')

const configPath = 'config.json'
const premiumPath = 'db.json'

// load config at startup

let config = {}

if (fs.existsSync(configPath)) {

    console.log('config file found...trying to read...')

    try {

        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

        console.log('config file read successful !')

    } catch (e) {

        console.log('error while reading the config file...verify config.json.')

        config = { users: {} }
    }

} else {

    console.log('config file not found...')

    config = { users: {} }
}

// auto save

const saveConfig = () => {

    console.log('saving config in file...')

    fs.writeFileSync(
        configPath,
        JSON.stringify(config, null, 2)
    )

    console.log('successfully saved config.')
}


// managing premium users

let premiums = {}

if (fs.existsSync(premiumPath)) {

    try {

        premiums = JSON.parse(
            fs.readFileSync(premiumPath, 'utf-8')
        )

        console.log('premium users loaded successfully !')

    } catch (e) {

        console.log('error while reading the premium database...verify db.json.')

        premiums = { premiumUser: {} }
    }

} else {

    premiums = { premiumUser: {} }

    console.log('db.json not found')
}


// save premium users

const savePremium = () => {

    console.log('saving premium users...')

    fs.writeFileSync(
        premiumPath,
        JSON.stringify(premiums, null, 2)
    )

    console.log('premium users successfully saved')
}


export default {

    config,
    premiums,

    saveP() {
        savePremium()
    },

    save() {
        saveConfig()
    }
}