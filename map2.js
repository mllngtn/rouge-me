//this is our second map! To show case guards walking around each other like total heros
const map2 = {
    maze: [
        '################',
        '#@/////////////#',
        '#//////////////#',
        '#.........,,,,,#',
        '#....,,,,,,,,,,#',
        '#..............#',
        '#..............#',
        '################',
    ]
}

var rightToLeftPath = [
    {x: 12, y: 5, t: 1},
    {x: 11, y: 5, t: 0},
    {x: 10, y: 5, t: 0},
    {x: 9, y: 5, t: 0},
    {x: 8, y: 5, t: 0},
    {x: 7, y: 5, t: 0},
    {x: 6, y: 5, t: 0},
    {x: 5, y: 5, t: 0},
    {x: 4, y: 5, t: 0},
    {x: 3, y: 5, t: 0},
    {x: 2, y: 5, t: 0},
]

var leftToRightPath = [
    {x: 2, y: 5, t: 1},
    {x: 3, y: 5, t: 0},
    {x: 4, y: 5, t: 0},
    {x: 5, y: 5, t: 0},
    {x: 6, y: 5, t: 0},
    {x: 7, y: 5, t: 0},
    {x: 8, y: 5, t: 0},
    {x: 9, y: 5, t: 0},
    {x: 10, y: 5, t: 0},
    {x: 11, y: 5, t: 0},
    {x: 12, y: 5, t: 0},
]

//here we define our guards..
let guard0 = new guard(2, 5, '.', leftToRightPath)

let guard1 = new guard(12, 5, '.', rightToLeftPath)

//...and stick them in an array
let guards = [guard0, guard1]