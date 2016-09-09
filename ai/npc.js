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

function npcScan(entity, player) {
    
    const range = currentTileToRange[player.currentTile]
    if (scan(entity, player, range) === 1) {
        entity = increaseAlertLevel(entity, entity.alert.seeingFactor)
    } else if (scan(entity, player, range) === 2) {
        entity = increaseAlertLevel(entity, entity.alert.hearingFactor)
    } else if (scan(entity, player, range) === 3) {
        entity.alert.count++
        //guard = entityCannotSeePlayer(guard, player)
    }
    return entity
}

function increaseAlertLevel(entity, factor) {
    entity.alert.level = (entity.alert.level + (1 / factor))
    entity.alert.count = 0
    return entity
}

function shouldIPause(entity) {
    if (entity.alert.count === 0 && entity.alert.level <= 1) {
        return true
    } else {
        return false
    }
}

function shouldIFollowPlayer(entity) {
    if (entity.alert.count < entity.maxAlertCount && entity.alert.level >= 1) {
        return true
    } else {
        return false
    }
}

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

function followPath(entity) {
    console.log('trying to follow a path that is nae there yet')
}

function moveRandomly(entity) {
    const direction = keyCodeToDirection[randomDirection(37,40)]
    if (direction) {
        entity = move(entity, direction)
        return entity
    } else {
        return entity
    }
}