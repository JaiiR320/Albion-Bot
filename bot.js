const axios = require('axios')
const discord = require("discord.js")
const api = require("./api.js")
const tk = require("./token.json")

const client = new discord.Client()

const url = 'https://gameinfo.albiononline.com/api/gameinfo/events'

var curr = new Array(20)
var prev = new Array(20)
var diff = new Array()
var events = new Array()

async function update() {
    try { //try to get a response from api
        var response = await axios.get(url)
        console.log(response.headers.date)
        body = response.data //body = JSON of data
        for (let index = 0; index < body.length; index++) {
            curr[index] = body[index].EventId //array current is all current events
        }
        console.log("Curr: " + curr)
        console.log("Prev: " + prev)
        diff = api.compareEvents(curr, prev) // get diff between prev and curr
        console.log("Diffs: " + diff)
        for (let i = 0; i < body.length; i++) { // log the index of each new event in set
            for (let j = 0; j < diff.length; j++) {
                if (body[i].EventId == diff[j]) {
                    events.push(i)
                }
            }
        }
        console.log("Events: " + events)
        for (let i = 0; i < events.length; i++) { //print small blurb of kill
            api.logDetails(body[events[i]])
        }
        response = null
        events = [] //reset events
        prev = curr //set prev to curr 
        curr = []
    } catch (error) {
        console.error(error) //print err
    }
}

client.on("ready", () => {
    console.log("ready\n")
    update();
    client.setInterval(update, 60000) //run update every 3 seconds
})

client.login(tk.token)