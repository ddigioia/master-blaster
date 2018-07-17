import * as constants from '../constants'
import {
  screen,
  calcXDist,
  calcYDist,
  updateObj,
  randomNumInRange,
  checkIfElementIsInPlay
} from '../helpers'

let initAsteroid = {
  asteroids: []
}

function createAsteroid () {
  const scale = randomNumInRange(10, 60)
  const xStart = Math.round(Math.random()) > 0
  const startTop = Math.round(Math.random()) > 0
  const startLeft = Math.round(Math.random()) > 0
  const randXPosition = Math.random() * screen.width()
  const randYPosition = Math.random() * screen.height()
  const radius = screen.width() / scale

  return {
    position: {
      x: xStart ? (startLeft || screen.width()) : randXPosition,
      y: xStart ? randYPosition : (startTop || screen.height())
    },
    speed: randomNumInRange(3, 10),
    rotation: Math.round(Math.random() * 360),
    radius,
    vertices: asteroidVertices(radius)
  }
}

function createAsteroids (numOfAsteroids) {
  let asteroids = []

  for (let i = 0; i < numOfAsteroids; i++) {
    asteroids.push(createAsteroid())
  }

  return asteroids
}

function asteroidVertices (radius) {
  let vertices = []
  let count = constants.ASTEROID_VERTICES_COUNT
  let xVertice
  let yVertice

  for (let i = 0; i < count; i++) {
    xVertice = (-Math.sin((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius
    yVertice = (-Math.cos((360 / count) * i * Math.PI / 180) + Math.round(Math.random() * 2 - 1) * Math.random() / 3) * radius
    vertices.push(xVertice, yVertice)
  }

  return vertices
}

function updateAsteroidPosition (asteroid) {
  return updateObj(asteroid, {
    position: {
      x: asteroid.position.x + calcXDist(asteroid.rotation, asteroid.speed),
      y: asteroid.position.y + calcYDist(asteroid.rotation, asteroid.speed)
    }
  })
}

function asteroid (state = initAsteroid, action) {
  let asteroids
  let asteroidCount

  switch (action.type) {
    case constants.START:
      asteroids = createAsteroids(constants.ASTEROID_BATCH_COUNT)

      return updateObj(state, {asteroids})
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
      let { asteroid } = action
      asteroids = [...state.asteroids]

      asteroids.splice(asteroid.index, 1)

      return updateObj(state, {asteroids})

    default:
      return state
  }
}

export default asteroid
