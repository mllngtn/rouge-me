
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

var path = [
    {x: 12, y: 1},
    {x: 12, y: 2},
    {x: 12, y: 3},
    {x: 12, y: 4},
    {x: 12, y: 5},
    {x: 12, y: 6},
]

//here we define our guards..
let guard0 = new guard(3, 4, '.', [])

let guard1 = new guard(12, 1, '/', path)

console.log(guard1)

//...and stick them in an array
let guards = [guard0, guard1]