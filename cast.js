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
    direction: {x:0, y:0},
    isMoving: false,
    heardMessage: 'A guard has heard you',
    alerts: 0
}

let treasure = function (x, y, currentTile) {
    this.x = x
    this.y = y
    this.currentTile = currentTile
    this.char = 'T'
    this.seenMessage = 'You see some glittering tresor!<br/>'
    this.heardMessage = false
    this.endLevelMessage = '<span style="color:gold">You have found le tresor and you are le winner!<br/></span>'
}

//guard: alert level will increase 1/hearingFactor or 1/seeingFactor every time a guard sees or hears you
let guard = function (x, y, currentTile, path, direction) {
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
    this.direction = direction
    this.seenMessage = 'You see a guard.<br/>'
    this.heardMessage = 'You hear a guard behind the wall.<br/>'
    this.endLevelMessage = 'You&#39;re nicked, sunshine...<br/>'
}