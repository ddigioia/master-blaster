/**
 * Game constants
 */

// ship
export const SHIP_ROTATION_SPEED = 5
export const SHIP_ACCL = 5
export const SHIP_INERTIA = 0.90
export const SHIP_SCALE = 150
export const SHIP_STROKE_WIDTH = 2
export const SHIP_FRAGMENT_COUNT = 3
export const SHIP_FRAGMENT_SCALE = 165
export const SHIP_FRAGMENT_SPEED = 10
export const SHIP_FRAGMENT_ROT_SPEED = 10
export const SHIP_COLOR = '#ffffff'

// laser
export const LASER_BEAM_SPEED = 15
export const LASER_STROKE_WIDTH = 3
export const LASER_COLOR = '#ffffff'
export const LASER_BEAM_RADIUS = 1

// asteroid
export const ASTEROID_START_MAX_ACCL = 1
export const ASTEROID_START_MAX_ACCL_INCR = 0.5
export const ASTEROID_BATCH_COUNT = 5
export const ASTEROID_START_SPEED = 1
export const ASTEROID_ROTATION_SPEED = 5
export const ASTEROID_SCALE = 30
export const ASTEROID_COLOR = '#ffffff'
export const ASTEROID_STROKE_WIDTH = 2
export const ASTEROID_VERTICES_COUNT = 8
export const ASTEROID_FRAGMENT_COUNT = 6
export const ASTEROID_FRAGMENT_SCALE = 110
export const ASTEROID_FRAGMENT_SPEED = 7
export const ASTEROID_FRAGMENT_ROT_SPEED = 10

/**
 * Action constants
 */
export const START = 'START'
export const ROTATE_RIGHT = 'ROTATE_RIGHT'
export const ROTATE_LEFT = 'ROTATE_LEFT'
export const FORWARD = 'FORWARD'
export const STOP = 'STOP'
export const STOP_ROTATION = 'STOP_ROTATION'
export const FIRE = 'FIRE'
export const UPDATE = 'UPDATE'
export const HIT_TEST = 'HIT_TEST'
export const ASTEROID_HIT = 'ASTEROID_HIT'
export const GAME_OVER = 'GAME_OVER'
export const CREATE_ASTEROIDS = 'CREATE_ASTEROIDS'

/**
 * Game state constants
 */
export const PLAYING = 'PLAYING'
export const STOPPED = 'STOPPED'

/**
 * Key code constants
 */
export const LEFT = 37
export const UP = 38
export const RIGHT = 39
export const DOWN = 40
export const SPACE = 32