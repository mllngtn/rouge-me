function canHear(entity1, entity2, range) {
    //can entity1 hear entity2?
    return rectAroundPoint(entity1, range).some(point => point.x === entity2.x && point.y === entity2.y)
}

function scan(entity1, entity2, range) {   
    //can entity1 see entity2?
    if (canSee(entity1, entity2)) {
        return 1
    } else {
        //if not, check if entity1 can hear entity 2...
        if (canHear(entity1, entity2, range)) {
            return 2
        } else {
            return 3
        }   
    }
}
