
//this is our first map!
const map1 = {
    maze: [
        '################',
        '#@/////////////#',
        '#####//////////#',
        '#...#.....,,,,,#',
        '#...#,,,,,,,,,,#',
        '#...#######....#',
        '#..............#',
        '################',
    ]
}

var circularPath = [
    {x: 12, y: 2, t: 0},
    {x: 12, y: 3, t: 0},
    {x: 12, y: 4, t: 0},
    {x: 11, y: 4, t: 0},
    {x: 10, y: 4, t: 0},
    {x: 9, y: 4, t: 0},
    {x: 8, y: 4, t: 0},
    {x: 7, y: 4, t: 0},
    {x: 6, y: 4, t: 0},
    {x: 7, y: 4, t: 0},
    {x: 8, y: 4, t: 0},
    {x: 9, y: 4, t: 0},
    {x: 10, y: 4, t: 0},
    {x: 11, y: 4, t: 0},
    {x: 11, y: 5, t: 0},
    {x: 11, y: 6, t: 0},
    {x: 12, y: 6, t: 0},
    {x: 13, y: 6, t: 0},
    {x: 14, y: 6, t: 0},
    {x: 14, y: 5, t: 0},
    {x: 14, y: 4, t: 0},
    {x: 14, y: 3, t: 0},
    {x: 14, y: 2, t: 0},
    {x: 13, y: 2, t: 0},
    {x: 12, y: 2, t: 1},
]

var backAndForthPath = [
    {x: 2, y: 4, t: 1},
    {x: 2, y: 5, t: 0},
    {x: 2, y: 6, t: 0},
    {x: 3, y: 6, t: 0},
    {x: 4, y: 6, t: 0},
    {x: 5, y: 6, t: 0},
    {x: 6, y: 6, t: 0},
    {x: 7, y: 6, t: 0},
    {x: 8, y: 6, t: 0},
    {x: 9, y: 6, t: 0},
    {x: 10, y: 6, t: 0},
    {x: 11, y: 6, t: 0},
    {x: 12, y: 6, t: 0},
    {x: 13, y: 6, t: 0},
]

var littleCirclue = [
    {x: 2, y: 4, t: 0},
    {x: 2, y: 5, t: 0},
    {x: 2, y: 6, t: 0},
    {x: 2, y: 5, t: 0},
    {x: 2, y: 4, t: 1},
]

//here we define our guards..
let guard0 = new guard(2, 4, '.', [])

let guard1 = new guard(12, 2, '/', circularPath)

//...and stick them in an array
let guards = [guard0, guard1]