// game specific constants
export const SHIP_ROTATION_SPEED = 15
export const SHIP_ACCL = 7
export const SHIP_SCALE = 66
export const SHIP_FRAGMENT_COUNT = 3
export const SHIP_FRAGMENT_SCALE = 165
export const SHIP_FRAGMENT_SPEED = 10
export const SHIP_FRAGMENT_ROT_SPEED = 10
export const LASER_BOLT_ACCL = 15
export const ASTEROID_START_MAX_ACCL = 1
export const ASTEROID_START_MAX_ACCL_INCR = 0.5
export const ASTEROID_START_COUNT = 5
export const ASTEROID_START_SPEED = 10
export const ASTEROID_SCALE = 13
export const ASTEROID_FRAGMENT_COUNT = 6
export const ASTEROID_FRAGMENT_SCALE = 110
export const ASTEROID_FRAGMENT_SPEED = 7
export const ASTEROID_FRAGMENT_ROT_SPEED = 10
export const CONSTELLATION_COUNT = 25
export const CONSTELLATION_MIN_RADIUS = 0.5
export const CONSTELLATION_MAX_RADIUS = 1.5

// action constants
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

// game state constants
export const PLAYING = 'PLAYING'
export const STOPPED = 'STOPPED'

// keycode constants
export const LEFT = 37
export const UP = 38
export const RIGHT = 39
export const DOWN = 40
export const SPACE = 32