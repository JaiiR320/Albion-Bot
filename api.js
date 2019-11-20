module.exports = {
    /**
     * Uses a binary search algorithm to locate a value in the specified array. 
     * @param {Array} items The array containing the item. 
     * @param {variant} value The value to search for. 
     * @return {int} The zero-based index of the value in the array or -1 if not found. 
     */
    binarySearch: function (items, value) {
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

    logDetails: function (kill) {
        console.log(kill.Killer.Name + " has killed " + kill.Victim.Name)
        if (kill.Killer.Equipment.MainHand != null) {
            console.log("by using " + kill.Killer.Equipment.MainHand.Type)
        } else {
            console.log("by using their bare hands")
        }
    },

    messageDetails: function (kill){

    }
}