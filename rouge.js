//let's grab our map and stick it in a big array
let maze = map1.maze
let map = maze.map(line => line.split(''))

//ask if our player can see any guards, then render the map on document load 
if (playerScan(player, guards)) {
    render(map)
}

var rendering = false

/*  
    This is the logic that powers the whole show!
    1) find out which way the player wants to go, 
    2) stop screen scroll,
    3) move the player,
    4) ask if our guards can see the player, and move them accordingly,
    5) then ask if our player can see any guards,
    6) before rendering the map
*/
document.onkeydown = function(e) {
    document.getElementById('text').innerHTML = ''
    document.getElementById('text2').innerHTML = ''

    const direction = keyCodeToDirection[e.keyCode]
    if (direction) {
        e.preventDefault()
        player = movePlayer(player, direction)
        if (npcScanAndMove(guards, player)) {
            setTimeout(function() {
                if (playerScan(player, guards)) {   
                    render(map)
                }
            }, 0)   
        }
    }
}
