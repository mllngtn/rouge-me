let maze = map1.maze

let map = maze.map(line => line.split(''))

let player = {x:1, y:1, char:'@', currentTile:'.'}

let guard = {x:3, y:4, char:'G', currentTile:'.'}

const keyCodeToDirection = {
    37: {x: -1, y: 0},
    38: {x: 0, y: -1},
    39: {x: 1, y: 0},
    40: {x: 0, y: 1}
}

function randomDirection(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function addPoint(point1, point2) {
    return {x: point1.x + point2.x, y: point1.y + point2.y}
}

function render(map) {
    document.getElementById('maze').innerHTML = map.map(characters => characters.join('')).join('\n')
}

function canHear(entity1, entity2) {
    //The some() method tests whether some element in the array passes the test implemented by the provided function.
    //can entity1 hear entity2?
    return rectAroundPoint(player, 4).some(point => point.x === entity2.x && point.y === entity2.y)
}

function scan(entity1, entity2) {
    //make sure we can see the entity unless it needs to be hidden
    showEntity(entity2)
    //can entity1 see entity2?
    if (canSee(entity1, entity2)) {
        //if so, great!
        document.getElementById('text').innerHTML = 'You see a guard. He can see you an all'
    } else {
        //if not, check if entity1 can hear entity 2...
        if (canHear(entity1, entity2)) {
            document.getElementById('text').innerHTML = 'You hear a guard behind the wall'
        } else {
            if (entity1.char === '@') {
                hideEntity(entity2)
            }
        }   
    }

    if (entity1.char === '@' && entity1.currentTile === ',') {
        document.getElementById('text2').innerHTML = 'Shuffle shuffle shuffle. Grass makes less noise'
    }
}

function hideEntity(entity) {
    map[entity.y][entity.x] = entity.currentTile
}
function showEntity(entity) {
    map[entity.y][entity.x] = entity.char
}
    
document.onkeydown = function(e) {
    const direction = keyCodeToDirection[e.keyCode]
    const guardDirection = keyCodeToDirection[randomDirection(37,40)]
    if (direction) {
        //stop screen scroll
        e.preventDefault()
        player = move(player, direction)
        guard = move(guard, guardDirection)
        scan(player, guard)
        render(map)
    }
}  

function move(entity, direction) {
    document.getElementById('text').innerHTML = ''
    document.getElementById('text2').innerHTML = ''

    const newPosition = addPoint(entity, direction)
    const newTile = map[newPosition.y][newPosition.x]
    if (newTile === '.') {
        return teleportEntity(entity, newPosition, newTile)
    } else if (newTile === ',') {
        return teleportEntity(entity, newPosition, newTile)
    } 
    return entity
}

function teleportEntity(entity, {x, y}, newTile) {
    map[entity.y][entity.x] = entity.currentTile
    map[y][x] = entity.char
    return{x, y, char: entity.char, currentTile: newTile}
}

//hideEntity(guard)
render(map)