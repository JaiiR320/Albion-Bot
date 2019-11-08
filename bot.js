const axios = require('axios')
const url = 'https://gameinfo.albiononline.com/api/gameinfo/events'
const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

client.on("ready", () => {
    console.log("ready\n")
    client.setInterval(main, 5000)
})

client.login(config.token)