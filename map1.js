let guardHearingFactor = 4
let guardSeeingFactor = 2

const map1 = {
    maze: [
        '################',
        '#@........,,,,,#',
        '#####.....,,,,,#',
        '#...#.....,,,,,#',
        '#...#,,,,,,,,,,#',
        '#...#######....#',
        '#..............#',
        '################',
    ]
}

let player = {x:1, y:1, char:'@', currentTile:'.', alert:{level:0}}

let guard = function (x, y, currentTile) {
    this.x = x
    this.y = y
    this.currentTile = currentTile
    this.char = 'G'
    this.hasPath = false
    this.maxAlertCount = 10
    this.path = []
    this.alert = {
        level:0,
        count:0,
        x:0,
        y:0,
        hearingFactor:guardHearingFactor,
        seeingFactor:guardSeeingFactor,
        path:[]
    }
};

let guard0 = new guard(3, 4, '.')

let guard1 = new guard(12, 1, ',')

let guards = [guard0]