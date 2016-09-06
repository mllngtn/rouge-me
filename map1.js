
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

let player = {x:1, y:1, char:'@', currentTile:'.'}

let guard0 = {x:3, y:4, char:'G', currentTile:'.'}

let guard1 = {x:7, y:1, char:'G', currentTile:'.'}

let guards = [guard0, guard1]