const url = 'https://gameinfo.albiononline.com/api/gameinfo/events'
const fs = require("fs")
var track = JSON.parse(fs.readFileSync("track.JSON"))

const request = require('request')
const axios = require('axios')


function delay(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    }
    while (d2 - d < ms);
}


var ids = new Array(20)
var body

module.exports = {
    ids,
    body,

    /**
     * Uses a binary search algorithm to locate a value in the specified array. 
     * @param {Array} items The array containing the item. 
     * @param {variant} value The value to search for. 
     * @return {int} The zero-based index of the value in the array or -1 if not found. 
     */
    binarySearch: function (input, value) {
        var items = JSON.parse(input)
        var startIndex = 0,
            stopIndex = items.length - 1,
            middle = Math.floor((stopIndex + startIndex) / 2);

        while (items[middle] != value && startIndex < stopIndex) {

            //adjust search area
            if (value < items[middle]) {
                stopIndex = middle - 1;
            } else if (value > items[middle]) {
                startIndex = middle + 1;
            }

            //recalculate middle
            middle = Math.floor((stopIndex + startIndex) / 2);
        }

        //make sure it's the right value
        return (items[middle] != value) ? -1 : middle;
    },
    /**
     * These are functions to get event IDs
     * and compare the arrays to get a new
     * array for the most recent events not
     * yet accounted for
     */

    /**
     * 
     * @param {*} ms 
     */
    delay: function (ms) {
        var d = new Date();
        var d2 = null;
        do {
            d2 = new Date();
        }
        while (d2 - d < ms);
    },

    /**
     * input 2 arrays to get a new one with difference
     * @param {*} a1
     * @param {*} a2 
     */
    compareEvents: function (a1, a2) {
        var a = [],
            diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        return diff;
    },

    /**
     * returns an array of 20 with most recent events
     */
    initBody: function () {
        axios.get(url)
            .then((response) => {
                body = response.data
            })
    },

    getEventIds: function () {
        for (let i = 0; i < 20; i++) {
            ids[i] = body[i].EventId.toString()
        }
    },

    /**
     * Functions for getting data
     * for events. Intakes a single 
     * event and outputs names/items etc
     */

    /**
     * returns the victim of an event
     */
    getVictim: function () {

    },

    /**
     * returns the primary killer of an event
     */
    getKiller: function () {
        var killObj = new Array(20)
        for (let i = 0; i < 20; i++) {
            killObj[i] = body[i].Killer.Name
            if (this.binarySearch(track.Players, killObj[i]) != -1) {
                return this.logDetails(i)
            }
        }
        return killObj
    },

    /**
     * returns an array of assists
     */
    getAssist: function () {

    },

    logDetails: function (index) {
        var kill = body[index]
        console.log(kill.Killer.Name + " has killed " + kill.Victim.Name)
        console.log("by using " + kill.Killer.Equipment.MainHand.Type)
    }
}