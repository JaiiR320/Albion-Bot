const discord = require("discord.js")
const api = require("./api.js")
const client = new discord.Client()
const config = require("./config.json")

var current = new Array(20)
var previous = new Array(20)
var diff

function difference(){
    current = api.getEventIDs()
    console.log(current)
    //diff = api.compareEvents(current, previous)
    //console.log("Diff: \n" + diff)
}

client.on("ready", () => {
    console.log("ready\n")
    api.getEventIDs()
    api.delay(3000)
    current = api.ids
    console.log(api.ids)
    
})

client.on("message", () => {

})

client.login(config.token)
 