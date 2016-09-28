//map rendering function. Take our map array and bung it into the 'maze' pre in the html
function render(map) {
    for (i=0; i < map.length; i++) {
        for (j=0; j < map[i].length; j++) {
            if ( map[i][j] === '?') {
                map[i][j] = '<span style="color:orange">?</span>'
            } else if (map[i][j] === '!') {
                map[i][j] = '<span style="color:red">!</span>'
            } else if (map[i][j] === '#' || map[i][j] === '@' || map[i][j] === 'G') {
                map[i][j] = '<span style="color:black">' + map[i][j] + '</span>'
            } else if (map[i][j] === 'T') {
                map[i][j] = '<span style="color:gold">T</span>'
            }
        }
    }
    document.getElementById('maze').innerHTML = map.map(characters => characters.join('')).join('\n')
}

//which arrow key corresponds to which direction?
const keyCodeToDirection = {
    37: {x: -1, y: 0},
    38: {x: 0, y: -1},
    39: {x: 1, y: 0},
    40: {x: 0, y: 1},
    32: {x: 0, y: 0},
}

//what is the diameter of the rectangle of sound that surrounds an entity when they step on certain tiles?
const currentTileToRange = {
    '.': 4,
    ',': 2,
    '/': 4,
}

//add two points together
function addPoint(point1, point2) {
    return {x: point1.x + point2.x, y: point1.y + point2.y}
}

//provide a random number between a given min and max (usually 37 to 40, to provide a direction via keyCodeToDirection)
function randomDirection(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//don't render this entity! The player cannot see it
function hideEntity(entity) {
    map[entity.y][entity.x] = entity.currentTile
}
//do render this entity! The player can see it
function showEntity(entity) {
    map[entity.y][entity.x] = entity.char
}

//move a given entity in a given direction, via the teleportEntity function, if the entity is trying to move into a valid tile
function move(entity, direction) {
    entity.direction = direction
    const newPosition = addPoint(entity, direction)
    const newTile = map[newPosition.y][newPosition.x]
    if (newTile === '.' || newTile === ',' || newTile === '/') {
        return teleportEntity(entity, newPosition, newTile)
    }
    return entity
}
//move an entity from its current tile to a new tile!
function teleportEntity(entity, {x, y}, newTile) {
    map[entity.y][entity.x] = entity.currentTile
    map[y][x] = entity.char
    entity.currentTile = newTile
    entity.x = x
    entity.y = y
    return(entity)
}

//a function that moves the map if the player wanders further than half the length of the viewport in any direction
function moveMap(e) {

    var mazeDiv = document.getElementById("maze")
    var leftpx = parseInt(mazeDiv.style.left)
    var toppx = parseInt(mazeDiv.style.top)

    if (e.keyCode === 37 && player.x > ((clientWidth / 15) / 2)) {
        mazeDiv.style.left = leftpx + 15 + 'px'
    } else if (e.keyCode === 38 && player.y > (clientHeight / 30) / 2) {
        mazeDiv.style.top = toppx + 30 + 'px'
    } else if (e.keyCode === 39 && maze[0].length - 2 > player.x && player.x > ((clientWidth / 15) / 2) - 1) {
        mazeDiv.style.left = leftpx - 15 + 'px'
    }  else if (e.keyCode === 40 && maze.length - 2 > player.y && player.y > ((clientHeight / 30) / 2) - 1) {
        mazeDiv.style.top = toppx - 30 + 'px'
    }
}

//a function to end the game. Kapow
function endLevel(entity) {
        setTimeout (function() {
            document.getElementById("maze").style.left = '10px'
            document.getElementById("maze").style.top = '10px'
            maze = map2.levelend[entity.constructor.name].maze
            map = maze.map(line => line.split(''))
            render(map)
            gameOver = true
            document.getElementById('text').innerHTML = ''
            document.getElementById('text2').innerHTML = ''
            document.getElementById('text2').innerHTML = map2.levelend[entity.constructor.name].message
        }, 0) 
}