const url = 'https://gameinfo.albiononline.com/api/gameinfo/events'

var request = require('request')

function delay(ms){
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

module.exports = {
    ids: new Array(20),
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
delay: function(ms){
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
},

/**
 * input 2 arrays to get a new one with difference
 * @param {*} a1
 * @param {*} a2 
 */
compareEvents: function(a1, a2) {
    var a = [], diff = [];
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
getEventIDs: function(){
    var ids = new Array(20)
    request(url, function(err, response, body){
        body = JSON.parse(body)
        out = body
        for (let i = 0; i < 20; i++) {
            ids[i] = body[i].EventId.toString()
        }
        //console.log(ids)
    })
},

/**
 * Functions for getting data
 * for events. Intakes a single 
 * event and outputs names/items etc
 */

 /**
  * returns the victim of an event
  * @param {*} event
  */
getVictim: function(event){

},

/**
 * returns the primary killer of an event
 * @param {*} event
 */
getKiller: function(event){

},

/**
 * returns an array of assists
 * @param {*} event
 */
getAssist: function(event){

}
}
