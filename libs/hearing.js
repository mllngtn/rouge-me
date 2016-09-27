function canHear(entity1, entity2, range) { 
    //if it is possible for entity2 to be heard... can entity1 hear entity2?
    if(entity2.heardMessage) {
         return rectAroundPoint(entity1, range).some(point => point.x === entity2.x && point.y === entity2.y)
    }
}

function rectAroundPoint(point, diameter) {
    const radius = Math.floor(diameter / 2)
    return getRect({x: point.x - radius, y: point.y - radius}, {x: point.x + radius, y: point.y + radius})
}

function getRect(topLeft, bottomRight) {
    const line = range(topLeft.x, bottomRight.x + 1)
    const column = range(topLeft.y, bottomRight.y + 1)
    const box = line.map(x => column.map(y =>({x,y})))
    return flatten(box)
}

function flatten(arr) {
    return [].concat.apply([], arr)
}

function range(a, b, step) {
    if (arguments.length === 1) {
        b = a;
        a = 0;
    }
    step = step || 1;
    var x, r = [];
    for (x = a; (b - x) * step > 0; x += step) {
        r.push(x);
    }
    return r;
}
