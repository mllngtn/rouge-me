let maze = map1.maze

let map = maze.map(line => line.split(''))

document.onkeydown = function(e) {
    document.getElementById('text').innerHTML = ''
    const direction = keyCodeToDirection[e.keyCode]
    if (direction) {
        //stop screen scroll
        e.preventDefault()
        player = movePlayer(player, direction)
        if (npcScanAndMove(guards, player)) {
            if (playerScan(player, guards)) {
                render(map)
            }
        }
    }
}

if (playerScan(player, guards)) {
    render(map)
}