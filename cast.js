//our boy!
let player = {
    x:1, 
    y:1, 
    char:'@', 
    currentTile:'/', 
    alert:{
        level:0
    },
    seeInShadow:4,
    beSeenInShadow:2,
}

//guard: alert level will increase 1/hearingFactor or 1/seeingFactor every time a guard sees or hears you
let guard = function (x, y, currentTile, path) {
    this.x = x
    this.y = y
    this.currentTile = currentTile
    this.char = 'G'
    this.maxAlertCount = 10
    this.path = path
    this.alert = {
        level:0,
        count:0,
        x:0,
        y:0,
        hearingFactor:4,
        seeingFactor:2,
        path:[]
    }
}