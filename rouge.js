//let's grab our map and stick it in a big array
let maze = map2.maze
let map = maze.map(line => line.split(''))
let gameOver = false
const clientHeight = document.getElementById("wrapper").clientHeight
const clientWidth = document.getElementById("wrapper").clientWidth


//ask if our player can see any guards, then render the map on document load 
if (playerScan(player, guards)) {
    render(map)
}

/*  
    This is the logic that powers the whole show!
    1) If the map needs to be moved underneath the player, then do it!
    2) If the game is over, then nothing happens
    3) Otherwise...
        a) find out which way the player wants to go, 
        b) stop screen scroll,
        c) move the player,
        d) ask if our guards can see the player, and move them accordingly,
        e) then ask if our player can see any guards,
        f) before rendering the map
*/
document.onkeydown = function(e) {

    e.preventDefault()
    moveMap(e)

    if (gameOver) {
        alert('Reload the page to start again.')
    } else {
        document.getElementById('text').innerHTML = ''
        document.getElementById('text2').innerHTML = ''

        const direction = keyCodeToDirection[e.keyCode]
        if (direction) {
            player = movePlayer(player, direction, e.keyCode)
            if (npcScanAndMove(guards, player)) {
                setTimeout(function() {
                    if (playerScan(player, guards) && playerScan(player, treasures)) {   
                        render(map)
                    }
                }, 0)   
            }
        }
    }
}