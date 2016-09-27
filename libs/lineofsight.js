//Bresenham's algorithm for line of sight, nicked from StackOverflow

//I added a little coordinate function, though. What a legend.
function coordinates(yPoint, xPoint) {
    return {x: xPoint, y: yPoint}
}

/*
  canSee returns true if entity1 can see entity2, and false if they cannot!
  Here's the logic...
  1) If the player is being searched for by an NPC:
    a) and any of the following statements is true:
      i) the NPC is travelling south and the player is north of the NPC
      ii) the NPC is travelling north and the player is south of the NPC
      iii) the NPC is travelling east and the player is west of the NPC
      iv) the NPC is travelling west and the player is east of the NPC
      v) the player is in shadow and is far enough away from the NPC that they cannot be seen
    ...then the NPC cannot see the player (return false)
    b) otherwise, if all of the above statements are false, then we call lineOfSightCalculation() (and potentially return true)
  2) Else if the player is searching for an NPC:
    a) if the NPC is right next to them, then the player has been caught! End the game
    b) else, if the NPC is in shadow and far enough away, then the player cannot see the NPC (return false)
    c) otherwise, we call lineOfSightCalculation() (and potentially return true)
*/
function canSee (entity1, entity2) {

  //work out the distance between our two entities 
  //(we can't use the number of tiles lineOfSightCalculation() has flipped through, because lineOfSightCalculation() allows diagonals!)
  distanceFrom = Math.abs((entity2.x - entity1.x)) + Math.abs((entity2.y - entity1.y))

  if (entity2.char === '@') {
    xdir = entity1.direction.x
    ydir = entity1.direction.y
    if (
          ydir === 1 && entity2.y < entity1.y ||
          ydir === -1 && entity2.y > entity1.y ||
          xdir === 1 && entity2.x > entity1.x ||
          xdir === -1 && entity2.x < entity1.x ||
          entity2.currentTile === '/' && distanceFrom > entity2.beSeenInShadow
      ) {
      return false
    } else {
      return lineOfSightCalculation(entity1, entity2)
    }
  } else if (distanceFrom === 1) {
      endLevel(entity2)     
  } else if (entity2.currentTile === '/' && distanceFrom > entity1.seeInShadow){
    return false
  } else {
    return lineOfSightCalculation(entity1, entity2)
  }
}

//checks whether there is a clear line of sight between entity1 and entity2 (no walls in the way)
function lineOfSightCalculation (entity1, entity2) {

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
      //if there is a wall between the two entities... then entity1 can see entity2
      if (thisTile.includes('#')) {
          return false
          break
      } 
    }
    //if there is no wall between the two entities... then entity1 cannot see entity2! 
    return true
  }