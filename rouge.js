let maze = map1.maze

let map = maze.map(line => line.split(''))

const keyCodeToDirection = {
    37: {x: -1, y: 0},
    38: {x: 0, y: -1},
    39: {x: 1, y: 0},
    40: {x: 0, y: 1},
}

const currentTileToRange = {
    '.': 4,
    ',': 2,
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

function canHear(entity1, entity2, range) {
    //The some() method tests whether some element in the array passes the test implemented by the provided function.
    //can entity1 hear entity2?
    return rectAroundPoint(entity1, range).some(point => point.x === entity2.x && point.y === entity2.y)
}

function scan(entity1, entity2, range) {   
    //can entity1 see entity2?
    if (canSee(entity1, entity2)) {
        return 1
    } else {
        //if not, check if entity1 can hear entity 2...
        if (canHear(entity1, entity2, range)) {
            return 2
        } else {
            return 3
        }   
    }
}

function playerScan(player, guards) {
    var noOfGuardsScanned = 0;
    for (i = 0; i < guards.length; i++) {
        //make sure we can see the guard unless it needs to be hidden
        showEntity(guards[i])
        const range = currentTileToRange[guards[i].currentTile]
        if (scan(player, guards[i], range) === 1) {
            document.getElementById('text').innerHTML += 'You see a guard.<br/>'
        } else if (scan(player, guards[i], range) === 2) {
            document.getElementById('text').innerHTML += 'You hear a guard behind the wall.<br/>'
        } else if (scan(player,guards[i], range) === 3) {
            hideEntity(guards[i])  
        }
        noOfGuardsScanned++
    }
    if (noOfGuardsScanned === guards.length) {
        return true
    }
}

function guardsMove(guards) {
    var noOfGuardsHavingMoved = 0;
    const range = currentTileToRange[player.currentTile]
    for (i = 0; i < guards.length; i++) {
        const guardDirection = keyCodeToDirection[randomDirection(37,40)]
        guards[i] = move(guards[i], guardDirection)
        if (scan(guards[i], player, range) === 1) {
            entityIsAlerted(guards[i], player, guards[i].alert.seeingFactor)
        } else if (scan(guards[i], player, range) === 2) {
            entityIsAlerted(guards[i], player, guards[i].alert.hearingFactor)
        } else if (scan(guards[i], player, range) === 3) {
            entityCannotSeePlayer(guards[i], player)
        }
        console.log('alert count = ' + guards[i].alert.count)
        console.log('alert level = ' + guards[i].alert.level)
        noOfGuardsHavingMoved++
    }
    if (noOfGuardsHavingMoved === guards.length) {
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
    //don't move an entity if they are at alert level 1!
    if (entity.alert.count === 1 && entity.alert.level < 1) {
        return entity
    } else {
        const newPosition = addPoint(entity, direction)
        const newTile = map[newPosition.y][newPosition.x]
        if (newTile === '.' || newTile === ',') {
            return teleportEntity(entity, newPosition, newTile)
        } 
        return entity
    }
   
}

function teleportEntity(entity, {x, y}, newTile) {
    map[entity.y][entity.x] = entity.currentTile
    map[y][x] = entity.char
    entity.currentTile = newTile
    entity.x = x
    entity.y = y
    return(entity)
    //return{x, y, char: entity.char, currentTile: newTile}
}

if (playerScan(player, guards)) {
    render(map)
}