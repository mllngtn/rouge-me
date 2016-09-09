function playerScan(player, entities) {
    var noOfEntitiesScanned = 0;
    for (i = 0; i < entities.length; i++) {
        //make sure we can see the entity unless it needs to be hidden
        showEntity(entities[i])
        const range = currentTileToRange[entities[i].currentTile]
        if (scan(player, entities[i], range) === 1) {
            document.getElementById('text').innerHTML += 'You see a guard.<br/>'
        } else if (scan(player, entities[i], range) === 2) {
            document.getElementById('text').innerHTML += 'You hear a guard behind the wall.<br/>'
        } else if (scan(player,entities[i], range) === 3) {
            hideEntity(entities[i])  
        }
        noOfEntitiesScanned++
    }
    if (noOfEntitiesScanned === entities.length) {
        return true
    }
}

function movePlayer (player, direction) {
    move(player, direction)
    if (player.currentTile === ',') {
        document.getElementById('text').innerHTML += 'Shuffle shuffle shuffle. Grass makes less noise.<br/>'
    }
    return player
}
