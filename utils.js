function render(map) {
    document.getElementById('maze').innerHTML = map.map(characters => characters.join('')).join('\n')
}

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

function addPoint(point1, point2) {
    return {x: point1.x + point2.x, y: point1.y + point2.y}
}

function randomDirection(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function hideEntity(entity) {
    map[entity.y][entity.x] = entity.currentTile
}
function showEntity(entity) {
    map[entity.y][entity.x] = entity.char
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
    entity.currentTile = newTile
    entity.x = x
    entity.y = y
    return(entity)
}
