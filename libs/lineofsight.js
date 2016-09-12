//Bresenham's algorithm for line of sight, nicked from StackOverflow

//I added a little coordinate function, though. What a legend.
function coordinates(yPoint, xPoint) {
    return {x: xPoint, y: yPoint}
}

function canSee (entity1, entity2) {
    var coordinatesArray = [];
    // Translate coordinates
    var x1 = entity1.x;
    var y1 = entity1.y;
    var x2 = entity2.x;
    var y2 = entity2.y;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }

      const thisTile = map[y1][x1]
      //if there is a wall between the two entities... then they cannot see each other
      if (thisTile === '#') {
          return false
          break
      } else if (x1 === x2 && y1 === y2) {
          //this used to return true, before I added the more complex stuff below
      } 

      // Set coordinates
      coordinatesArray.push({x1, y1})
    }

    /*
      1) If the player is being searched for by an NPC, and there are no walls in the way:
        a) if the player is in the shadows...
        b) ...and there are more than (player.seeInShadow) number of tiles between player and NPC...
        c) ...then they can't be seen.
        d) Otherwise, they can be seen!
      2) Else if the player is searching for an NPC, and there are no walls in the way:
        a) if the NPC is in the shadows...
        b) ...and there are more than (player.seeInShadow) number of tiles between player and NPC...
        c) ...then they can't be seen.
        d) Otherwise, they can be seen!
    */
    if (entity2.char === '@') {
      if (entity2.currentTile === '/' && coordinatesArray.length > entity2.beSeenInShadow) {
        return false
      } else {
        return true
      }
    } else if (entity2.currentTile === '/' && coordinatesArray.length > entity1.seeInShadow) {
      return false
    } else {
      return true
    }
    
  }