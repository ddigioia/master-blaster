export function hitTest (obj1, obj2) {
  var xDist = obj1.position.x - obj2.position.x
  var yDist = obj1.position.y - obj2.position.y
  var dist = Math.sqrt(xDist * xDist + yDist * yDist)
  if (dist < obj1.radius + obj2.radius) {
    return true
  }
  return false
}

export function checkIfElementIsInPlay (el) {
  return (
    el.position.x >= -25 &&
    el.position.x <= window.innerWidth + 25 &&
    el.position.y >= -25 &&
    el.position.y <= window.innerHeight + 25
  )
}

export function randomNumInRange (min, max) {
  return Math.random() * (max - min) + min
}

export function calcXDist (rotation, distance) {
  return Math.cos(rotation * Math.PI / 180) * distance
}

export function calcYDist (rotation, distance) {
  return Math.sin(rotation * Math.PI / 180) * distance
}

export function updateObj (initialObj, newObj) {
  return Object.assign({}, initialObj, newObj)
}

export let screen = {
  _width: null,
  _height: null,

  width () {
    if (!this._width) {
      this.resize()
    }
    return this._width
  },

  height () {
    if (!this._height) {
      this.resize()
    }
    return this._height
  },

  resize () {
    this._width = window.innerWidth
    this._height = window.innerHeight
  }
}

export function setCookie (name, value, days) {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '')  + expires + '; path=/'
}

export function getCookie (name) {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function deleteCookie (name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}