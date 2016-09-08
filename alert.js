let guardHearingFactor = 4
let guardSeeingFactor = 2

let maxAlertCount = 10

function entityIsAlerted(entity, player, factor) {
    savePlayerPosition(increaseAlertLevel(entity, factor), player)
    alertCount(entity)
}

function increaseAlertLevel(entity, factor) {
    entity.alert.level = (entity.alert.level + (1 / factor))
    return entity
}

function savePlayerPosition(entity, player) {
    entity.alert.x = player.x
    entity.alert.y = player.y
    entity.alert.count = 0
}

function hasSeenPlayer(entity) {
    if (entity.alert.level > 0) {
        return true
    } else {
        return false
    }
}

function entityCannotSeePlayer(entity, player) {
    alertCount(entity)
}

function alertCount(entity) {
    if (entity.alert.count != maxAlertCount ) {
        entity.alert.count++
    } else {
        entity.alert.level = 0
    }
    return entity
}