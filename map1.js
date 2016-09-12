
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

//here we define our guards..
let guard0 = new guard(3, 4, '.')

let guard1 = new guard(12, 1, '/')

//...and stick them in an array
let guards = [guard0, guard1]