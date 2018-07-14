export function hitTest(obj1, obj2) {
  var xDist = obj1.position.x - obj2.position.x
  var yDist = obj1.position.y - obj2.position.y
  var dist = Math.sqrt(xDist * xDist + yDist * yDist)
  if (dist < obj1.radius + obj2.radius) {
    return true
  }
  return false
}

export function checkIfElementIsInPlay(el) {
  return  (
    el.position.x >= 0 &&
    el.position.x <= window.innerWidth &&
    el.position.y >= 0 &&
    el.position.y <= window.innerHeight
  )
}

export function randomNumInRange(min, max) {
  return Math.random() * (max - min) + min
}

export function calcXDist(rotation, distance) {
  return Math.cos(rotation * Math.PI / 180) * distance
}

export function calcYDist(rotation, distance) {
  return Math.sin(rotation * Math.PI / 180) * distance
}

export function updateObj(initialObj, newObj) {
  return Object.assign({}, initialObj, newObj)
}

export let screen = {
  _width: null,
  _height: null,

  width() {
    if (!this._width) {
      this.resize()
    }
    return this._width
  },

  height() {
    if (!this._height) {
      this.resize()
    }
    return this._height
  },

  resize() {
    this._width = window.innerWidth
    this._height = window.innerHeight
  }
}