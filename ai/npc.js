/*
    give me an array full of NPCs, and for each one I will:
    1) ask if they can see the player,
    2) and depending on the answer that comes back,
    3) tell them to:
        a) pause,
        b) follow the player,
        c) follow a previously set path (eg a patrol route)
        d) move randomly
    4) before returning true to let rouge.js know that I've finished
*/
function npcScanAndMove(entities, player) {
    var noOfEntitiesScanned = 0;
    for (i = 0; i < entities.length; i++) {
        entities[i] = npcScan(entities[i], player)
        if (shouldIPause(entities[i])) {
            //do nothing!
        } else if (shouldIFollowPlayer(entities[i])) {
            followPlayer(entities[i], player)
        } else if (entities[i].hasPath) {
            followPath(entities[i])
        } else {
            moveRandomly(entities[i])
        }
        noOfEntitiesScanned++
    }
    if (noOfEntitiesScanned === entities.length) {
        return true
    }    
}

/*
    Ask if a given NPC knows where the player is, by calling the scan() function (found in ai/shared.js):
    1) They see the player, and increase their alert level via the increaseAlertLevel() function
    2) They hear the player, and increase their alert level via the increasAlertLevel() function
    3) They neither see nor hear the player, and we increase alert.count by 1
       (alert.count counts the number of turns since an entity last saw the player. 
       When alert.count reaches its maxAlertCount, 
       the entity forgets they ever saw the player (alert.level returns to 0)).
*/
function npcScan(entity, player) {
    const range = currentTileToRange[player.currentTile]
    if (scan(entity, player, range) === 1) {
        entity = increaseAlertLevel(entity, entity.alert.seeingFactor)
        document.getElementById('text2').innerHTML += 'Oh shit! A guard can see you.<br/>'
    } else if (scan(entity, player, range) === 2) {
        entity = increaseAlertLevel(entity, entity.alert.hearingFactor)
        document.getElementById('text2').innerHTML += 'Watch out! A guard can hear you.<br/>'
    } else if (scan(entity, player, range) === 3) {
        entity.alert.count++
        if (entity.alert.count === entity.maxAlertCount) {
            entity.alert.level = 0
            document.getElementById('text2').innerHTML += '<span style="color:#82E0AA">You remember that guard from earlier? They&#39;ve forgotten all about you. PHEW.</span><br/>'
        }
    }
    return entity
}

//increase an entity's alert level by a 1 over a given factor
function increaseAlertLevel(entity, factor) {
    entity.alert.level = (entity.alert.level + (1 / factor))
    entity.alert.count = 0
    return entity
}
//if a given entity has ONLY JUST seen or heard the player this turn, they should pause as if in thought
//(unless their alert level has reached 1 and they need to start chasing the player)
function shouldIPause(entity) {
    if (entity.alert.count === 0 && entity.alert.level <= 1) {
        return true
    } else {
        return false
    }
}
//if our entity last saw the player fewer turns ago than their maxAlertCount, and their alert level is above 1,
//they should chase the player!
function shouldIFollowPlayer(entity) {
    if (entity.alert.count < entity.maxAlertCount && entity.alert.level >= 1) {
        document.getElementById('text2').innerHTML += 'Now you&#39;ve done it!<br/>A guard has become suspicious and has started following you.<br/>'
        return true
    } else {
        return false
    }
}
//find a path to our player, using the EasyStar A* pathfinding algorithm...
//...and move our entity one node along that path!
function followPlayer(entity, player) {
    var pathfinder = new EasyStar.js()
    pathfinder.setGrid(map1.maze)
    pathfinder.setAcceptableTiles(['.',','])
    pathfinder.findPath(entity.x,entity.y,player.x,player.y, function(path){
        if(path) {
            path.shift()
            entity.path = path 
            const direction = {x: entity.path[0].x - entity.x, y: entity.path[0].y - entity.y}
            entity = move(entity, direction)
        }
    })
    pathfinder.calculate()
}
//follow a given path (eg a patrol) - not yet implemented
function followPath(entity) {
    console.log('trying to follow a path that is nae there yet')
}
//move in a random direction, using functions provided in utils.js
function moveRandomly(entity) {
    const direction = keyCodeToDirection[randomDirection(37,40)]
    if (direction) {
        entity = move(entity, direction)
        return entity
    } else {
        return entity
    }
}