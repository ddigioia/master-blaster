import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  checkIfElementIsInPlay
} from '../helpers'

function initAsteroid() {
  return {
    asteroids: []
  }
}

function createAsteroid() {
  const xStart = Math.round(Math.random()) > 0
  const randXPosition = Math.random() * screen.width()
  const randYPosition = Math.random() * screen.height()
  const radius = screen.width() / constants.ASTEROID_SCALE

  return {
    position: {
      x: xStart ? 0 : randXPosition,
      y: xStart ? randXPosition : 0
    },
    // maybe include x speed and y speed
    speed: constants.ASTEROID_START_SPEED,
    rotation: constants.ASTEROID_ROTATION_SPEED,
    radius,
    vertices: asteroidVertices(radius)
  }
}

function createInitialAsteroids() {
  let asteroids = []

  while(asteroids.length < constants.ASTEROID_START_COUNT) {
    asteroids.push(createAsteroid())
  }

  return asteroids
}

function asteroidVertices(radius) {
  let vertices = []
  let count = constants.ASTEROID_VERTICES_COUNT
  let xVertice
  let yVertice

  // while (vertices.length < count) { // 2 points per vertice
  for (let i = 0; i < count; i++) {
    xVertice = (-Math.sin((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3) * radius
    yVertice = (-Math.cos((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3) * radius
    vertices.push(xVertice, yVertice)
  }

  return vertices
}

function updateAsteroidPosition(asteroid) {
  return updateObj(asteroid, {
    position: {
      x: asteroid.position.x + calcXDist(asteroid.rotation, asteroid.speed),
      y: asteroid.position.y + calcYDist(asteroid.rotation, asteroid.speed)
    }
  })
}

export default function asteroid(state, action) {
  
  if (typeof state === 'undefined') {
    state = updateObj(state, initAsteroid())
  }
  
  let asteroids

  switch(action.type) {
    case constants.START:
      asteroids = createInitialAsteroids()

      return updateObj(state, {asteroids})
    case constants.UPDATE:
      asteroids = (
        state.asteroids
          .map(updateAsteroidPosition)
          .filter(checkIfElementIsInPlay)
      )

      return updateObj(state, {asteroids})
    default:
      return state
  }
}