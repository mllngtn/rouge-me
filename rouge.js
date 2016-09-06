let maze = map1.maze

let map = maze.map(line => line.split(''))

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
    //can entity1 see entity2?
    if (canSee(entity1, entity2)) {
        return 1
    } else {
        //if not, check if entity1 can hear entity 2...
        if (canHear(entity1, entity2)) {
            return 2
        } else {
            return 3
        }   
    }
}

function playerScan(player, guards) {
    var noOfGuardsScanned = 0;
    for (i = 0; i < guards.length; i++) {
        //make sure we can see the entity unless it needs to be hidden
        showEntity(guards[i])
        if (scan(player, guards[i]) === 1) {
            document.getElementById('text').innerHTML += 'You see a guard. He can see you an all.<br/>'
        } else if (scan(player, guards[i]) === 2) {
            document.getElementById('text').innerHTML += 'You hear a guard behind the wall.<br/>'
        } else if (scan(player,guards[i]) === 3) {
            hideEntity(guards[i])  
        }
        noOfGuardsScanned++
    }
    if (noOfGuardsScanned === guards.length) {
        return true
    }
}

function guardsMove(guards) {
    var noOfGuardsMoved = 0;
    for (i = 0; i < guards.length; i++) {
        const guardDirection = keyCodeToDirection[randomDirection(37,40)]
        guards[i] = move(guards[i], guardDirection) 
        noOfGuardsMoved++
    }
    if (noOfGuardsMoved === guards.length) {
        return true
    }
}

function hideEntity(entity) {
    map[entity.y][entity.x] = entity.currentTile
}
function showEntity(entity) {
    map[entity.y][entity.x] = entity.char
}
    
document.onkeydown = function(e) {
    document.getElementById('text').innerHTML = ''

    const direction = keyCodeToDirection[e.keyCode]
    
    if (direction) {
        //stop screen scroll
        e.preventDefault()
        player = move(player, direction)
        if (player.currentTile === ',') {
            document.getElementById('text').innerHTML += 'Shuffle shuffle shuffle. Grass makes less noise.<br/>'
        }
        if (guardsMove(guards)) {
            if (playerScan(player, guards)) {
                render(map)
            }
        }
    }
}  

function move(entity, direction) {
    const newPosition = addPoint(entity, direction)
    const newTile = map[newPosition.y][newPosition.x]
    if (newTile === '.' || newTile === ',') {
        return teleportEntity(entity, newPosition, newTile)
    } 
    return entity
}

function teleportEntity(entity, {x, y}, newTile) {
    map[entity.y][entity.x] = entity.currentTile
    map[y][x] = entity.char
    return{x, y, char: entity.char, currentTile: newTile}
}

if (playerScan(player, guards)) {
    render(map)
}