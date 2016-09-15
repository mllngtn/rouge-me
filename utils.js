//map rendering function. Take our map array and bung it into the 'maze' pre in the html
function render(map) {
    document.getElementById('maze').innerHTML = map.map(characters => characters.join('')).join('\n')
}

//which arrow key corresponds to which direction?
const keyCodeToDirection = {
    37: {x: -1, y: 0},
    38: {x: 0, y: -1},
    39: {x: 1, y: 0},
    40: {x: 0, y: 1},
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