/*
    Can our player see any other entities of note? 
    Find out by calling the scan() function (found in ai/shared.js) on any entities of note:
    1) The player sees the entity, and is told so via the UI
    2) The player hears the entity, and is told so via the UI
    3) The player neither sees nor hear the entity, which is hidden from view
    When finished, return true to let rogue.js know that we're done
*/
function playerScan(player, entities) {
    var noOfEntitiesScanned = 0;
    for (i = 0; i < entities.length; i++) {
        //make sure we can see the entity unless it needs to be hidden
        showEntity(entities[i])
        const range = currentTileToRange[entities[i].currentTile]
        if (scan(player, entities[i], range) === 1) {
            document.getElementById('text').innerHTML += entities[i].seenMessage
        } else if (scan(player, entities[i], range) === 2) {
            document.getElementById('text').innerHTML += entities[i].heardMessage
        } else if (scan(player,entities[i], range) === 3) {
            hideEntity(entities[i])  
        }
        noOfEntitiesScanned++
    }
    if (noOfEntitiesScanned === entities.length) {
        return true
    }
}
//move the player! With special UI messages for special tiles
function movePlayer (player, direction, keyCode) {
    if (keyCode === 32) {
        player.isMoving = false
        document.getElementById('text').innerHTML += 'You are still and silent.<br/>'
    } else {
        player.isMoving = true
        move(player, direction)
        if (player.currentTile === ',') {
            document.getElementById('text').innerHTML += 'Shuffle shuffle shuffle. Grass makes less noise.<br/>'
        } else if (player.currentTile === '/') {
            document.getElementById('text').innerHTML += 'You hunker in the shadows, shrouded in darkness etc.<br/>'
        }
    }
    return player
}