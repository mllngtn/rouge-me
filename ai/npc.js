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
            findPathAndMove(entities[i], player, true)
        } else if (entities[i].path.length > 0) {
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
            if (entity.alert.level > 0) {
                entity.alert.level = 0
                document.getElementById('text2').innerHTML += '<span style="color:#82E0AA">You remember that guard from earlier? They&#39;ve forgotten all about you. PHEW.</span><br/>'
            }
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

//find a path to a given node, using the EasyStar A* pathfinding algorithm...
//...and move our entity one node along that path!
function findPathAndMove(entity, node, isAlert) {
    var pathfinder = new EasyStar.js()
    pathfinder.setGrid(map1.maze)
    pathfinder.setAcceptableTiles(['.',',','/'])
    pathfinder.findPath(entity.x,entity.y,node.x,node.y, function(path){
        if(path) {
            path.shift()
            if (isAlert) {
                entity.alert.path = path 
            }
            moveToNode(entity, path[0])
        }
    })
    pathfinder.calculate()
}

//move to a specific node
function moveToNode(entity, node) {
    const direction = {x: node.x - entity.x, y: node.y - entity.y}
    entity = move(entity, direction)
}

/*
    This is how we follow a path:
        1) look at all the nodes in our path
        2) find the node that we're supposed to be stood on
        3) are we actually stood on it? (we might have wandered off our path) 
            if yes...
            a) ...and we are on the last node in the path...
                I) ...and we are on a circular path...
                    i) ...scroll back to the start and move to node[1] (start tramping round the circle again!)
                II)...and we are on a back-and-forth path...
                    i)... reverse the path and move onto our new node[1] (go back the way we've come!)
            b) ...if we are in the middle of the path, just move onto the next node
        4) if we are not stood on the node we are supposed to be stood on, we need to get back there!
            a) find a path back to the node we're supposed to be stood on!
            b) move onto the first node in our new path!
*/
function followPath(entity) {
    let j = ''
    for (var i = 0; i < entity.path.length; i++) { 
        if (entity.path[i].t === 1) {  
            if (isOnPath(entity, entity.path[i])) {  
                if (i === entity.path.length - 1) {
                    if (isCircularPath(entity.path)) {
                        entity.path[i].t = 0
                        j = 1 
                        entity.path[j].t = 1
                    } else {
                        entity.path[i].t = 0
                        entity.path.reverse()
                        j = 1
                        entity.path[j].t = 1
                    } 
                } else {
                    j = i + 1
                    entity.path[i].t = 0
                    entity.path[j].t = 1
                }
                moveToNode(entity, entity.path[j])
                return
            } else {
                findPathAndMove(entity, entity.path[i], false)
                return
            }
        } 
    }
}

//am I stood where I should be?
function isOnPath(entity, node) {
    if (entity.x === node.x && entity.y === node.y) {
        return true
    } else {
        return false
    }
}

//are we dealing with a circular path here? Circular paths have identical start and end nodes 
function isCircularPath(path) {
    let firstNode = path[0]
    let lastNode = path[path.length-1]
    if (firstNode.x === lastNode.x & firstNode.y === lastNode.y) {
        return true
    } else {
        return false
    }
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