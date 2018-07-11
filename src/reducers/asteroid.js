import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  randomNumInRange,
  checkIfElementIsInPlay
} from '../helpers'

function initAsteroid() {
  return {
    asteroids: []
  }
}

function createAsteroid() {
  const scale = randomNumInRange(10, 60)
  const xStart = Math.round(Math.random()) > 0
  const randXPosition = Math.random() * screen.width()
  const randYPosition = Math.random() * screen.height()
  // const radius = screen.width() / constants.ASTEROID_SCALE
  const radius = screen.width() / scale

  return {
    position: {
      x: xStart ? 0 : randXPosition,
      y: xStart ? randXPosition : 0
    },
    // maybe include x speed and y speed
    // speed: constants.ASTEROID_START_SPEED,
    speed: randomNumInRange(1, 5),
    // rotation: constants.ASTEROID_ROTATION_SPEED,
    rotation: Math.round(Math.random() * 360),
    radius,
    vertices: asteroidVertices(radius)
  }
}

function createAsteroids(numOfAsteroids) {
  let asteroids = []

  for(let i = 0; i < numOfAsteroids; i++) {
    asteroids.push(createAsteroid())
  }

  return asteroids
}

function asteroidVertices(radius) {
  let vertices = []
  let count = constants.ASTEROID_VERTICES_COUNT
  let xVertice
  let yVertice

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
  let asteroidCount

  switch(action.type) {
    case constants.START:
    case constants.CREATE_ASTEROIDS:
      asteroidCount = action.asteroidCount || constants.ASTEROID_BATCH_COUNT
      asteroids = [...state.asteroids, ...createAsteroids(asteroidCount)]

      return updateObj(state, {asteroids})
    case constants.UPDATE:
      asteroids = (
        state.asteroids
          .map(updateAsteroidPosition)
          .filter(checkIfElementIsInPlay)
      )

      return updateObj(state, {asteroids})
    case constants.ASTEROID_HIT:
      let { asteroid, laserBeam } = action
      asteroids = [...state.asteroids]

      asteroids.splice(asteroid.index, 1)

      return updateObj(state, {asteroids})

    default:
      return state
  }
}