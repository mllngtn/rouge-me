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
        if (shouldIPause(entities[i])) {
            //do nothing!
        } else if (shouldIFollowPlayer(entities[i])) {
            findPathAndMove(entities[i], player, true)
        } else if (entities[i].path.length > 0) {
            followPath(entities[i])
        } else {
            moveRandomly(entities[i])
        }
        entities[i] = npcScan(entities[i], player)
        noOfEntitiesScanned++
    }
    if (noOfEntitiesScanned === entities.length) {
        return true
    }    
}

/*
    Ask if a given NPC knows where the player is, by calling the scan() function (found in ai/shared.js):
    1) They see the player, and increase their alert level via the increaseAlertLevel() function
    2) They hear the player and increase their alert level via the increasAlertLevel() function (NB: the player needs to be moving to be heard)
    3) They neither see nor hear the player, and we increase alert.count by 1
       (alert.count counts the number of turns since an entity last saw the player. 
       When alert.count reaches its maxAlertCount, 
       the entity forgets they ever saw the player (alert.level returns to 0)).
*/
function npcScan(entity, player) {
    console.log(player.isMoving)
    const range = currentTileToRange[player.currentTile]
    if (scan(entity, player, range) === 1) {
        player.alerts = player.alerts + 2
        if (entity.alert.level < 1) {
            entity.char = '?'
        }
        entity = increaseAlertLevel(entity, entity.alert.seeingFactor)
    } else if (scan(entity, player, range) === 2 && player.isMoving) {
        player.alerts++
        if (entity.alert.level < 1) {
            entity.char = '?'
        }
        entity = increaseAlertLevel(entity, entity.alert.hearingFactor)
    } else if (scan(entity, player, range) === 3 || !player.isMoving) {
        entity.alert.count++
        if (entity.alert.count > 1 && entity.alert.level < 1) {
            entity.char = 'G'
        }
        if (entity.alert.count === entity.maxAlertCount && entity.alert.level > 0) {
            entity.alert.level = 0
        }
    }
    var score = (100 - player.alerts)
    document.getElementById('text3').innerHTML = '<br/>Score: ' + score 
    if (score <= 0) {
        document.getElementById('text3').innerHTML = '<br/>Score: 0' 
        var endLevelMessage = 'You set off the alarm too many times...<br/>' 
        endLevel(entity, endLevelMessage)
    } else {
        return entity
    }   
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
        entity.char = '!'
        document.getElementById('text2').innerHTML += 'You are being followed.<br/>'
        return true
    } else {
        return false
    }
}

//find a path to a given node, using the EasyStar A* pathfinding algorithm...
//...and move our entity one node along that path!
function findPathAndMove(entity, node, isAlert) {  
    var pathfinder = new EasyStar.js()
    pathfinder.setGrid(maze)
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
                    i) ...and there isn't another guard in our way...
                    ii) ...scroll back to the start and move to node[1] (start tramping round the circle again!)
                    iii) (if there is a guard in the way, move in a random direction to let them pass)
                II)...and we are on a back-and-forth path...
                    i) ...and there isn't another guard in our way...
                    i)... reverse the path and move onto our new node[1] (go back the way we've come!)
                    iii) (if there is a guard in the way, move in a random direction to let them pass)
            b) ...if we are in the middle of the path, and there isn't another guard in our way, just move onto the next node
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
                    j = 1
                    const newTile = map[entity.path[j].y][entity.path[j].x]
                    if (isCircularPath(entity.path)) {
                        if (newTile === 'G' || newTile === '?' || newTile === '!') {
                            entity = moveRandomly(entity)
                            return 
                        } else {
                            entity.path[i].t = 0
                            entity.path[j].t = 1
                        }
                    } else {
                        if (newTile === 'G' || newTile === '?' || newTile === '!') {
                            entity = moveRandomly(entity)
                            return 
                        } else {
                            entity.path[i].t = 0
                            entity.path.reverse()
                            entity.path[j].t = 1
                        } 
                    } 
                } else {
                    j = i + 1
                    const newTile = map[entity.path[j].y][entity.path[j].x]
                    if (newTile === 'G' || newTile === '?' || newTile === '!') {
                        entity = moveRandomly(entity)
                        return 
                    } else {
                        entity.path[i].t = 0
                        entity.path[j].t = 1
                    }          
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