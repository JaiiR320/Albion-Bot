const discord = require("discord.js")
const api = require("./api.js")
const client = new discord.Client()
const config = require("./config.json")
const fs = require('fs')
var track = JSON.parse(fs.readFileSync("track.JSON"))

var current = new Array(20)
var previous = new Array(20)
var diff = new Array()

function trackedPlayers() {
    api.initBody()
    setTimeout(() => {
        body = JSON.parse(api.body)
        console.log(body)
        temp = new Array()
        for (let i = 0; i < 20; i++) {
            if (api.binarySearch(track.player, body[i].Killer.Name)) {
                temp.push(body[i].EventId)
            } else if (api.binarySearch(track.player, body[i].Victim.Name)) {
                temp.push(body[i].EventId)
            }
        }
        current = temp
        console.log(current)
    }, 10000)
}

//testing
//new edit

function difference() {
    current = api.getEventIDs()
    diff = api.compareEvents(current, previous)
    console.log("Diff: \n" + diff)
    previous = current
}

function main() {
    api.initBody()
    setTimeout(() => {
        api.body = JSON.parse(api.body)
        console.log(api.getKiller())
        api.logDetails(0)
    }, 5000)
}

client.on("ready", () => {
    console.log("ready\n")
    client.setInterval(main, 6000)
})
/*
client.on("ready", () => {
    console.log("ready\n")
    //client.setInterval(trackedPlayers, 5000)
})*/

/*
var tracked = new Array(20)
var cdiff, pdiff

const fs = require("fs")
var track = JSON.parse(fs.readFileSync("track.JSON"))

function main(){
    api.initBody()
    setTimeout(() => {
        console.log(api.getKiller())
        api.binarySearch()
        api.logDetails(0)
    }, 4000)
}

client.on("ready", () => {
    console.log("ready\n")
    client.setInterval(main, 4000)
})

client.on("message", (message) => {
    //stops processing if no prefix or if bot message
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "addPlayer":
            fs.writeFileSync("track.JSON", )
            console.log(command + " " + args[0])
        default:
            break;
    }
})
*/
client.login(config.token)