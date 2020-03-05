import { LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, Z_KEY, X_KEY, ROTATE_RIGHT, ROTATE_LEFT } from './constants'
import { hasCollision, updateArena } from './physics'
import { isEven } from './utils/mathHelpers'
import validateEventKey from './utils/validateEventKey'
import Clock from './clock'
import Avatar from './Avatar'
import Joystick from './Joystick'
import Playfield from './playfield'

class Game {
  constructor() {
    this.avatar = new Avatar({ x: 3, y: 0 })
    this.control = new Joystick(this.avatar)
    this.clock = new Clock()
  }

  isDropTick(dropInterval = this.clock.dropInterval) {
    if (this.clock.dropCounter > dropInterval) {
      this.clock.dropCounter = 0
      this.control.moveAvatarDown(1)
      this.moveCollisionCheck(true)
    }
  }

  moveCollisionCheck(isDownCollision = false) {
    if (hasCollision(this.avatar)) {
      this.avatar.undoAction()
      if (isDownCollision) {
        updateArena(this.avatar)
        this.avatar.resetPosition()
        this.avatar.bagRandomizer()
      }
    }
  }

  rotateCollisionCheck() {
    for (let offseat = 0; hasCollision(this.avatar); offseat++) {
      if (isEven(offseat)) {
        this.control.moveAvatarRight(offseat)
      } else {
        this.control.moveAvatarLeft(offseat)
      }
    }
  }

  setupController() {
    document.addEventListener('keydown', event => {
      if (validateEventKey(event, LEFT_ARROW)) {
        this.control.moveAvatarLeft(1)
        moveCollisionCheck()
      } else if (validateEventKey(event, RIGHT_ARROW)) {
        this.control.moveAvatarRight(1)
        moveCollisionCheck()
      } else if (validateEventKey(event, DOWN_ARROW)) {
        this.control.moveAvatarDown(1)
        moveCollisionCheck(true)
      } else if (validateEventKey(event, Z_KEY)) {
        this.control.rotateAvatar(ROTATE_LEFT)
        rotateCollisionCheck()
      } else if (validateEventKey(event, X_KEY)) {
        this.control.rotateAvatar(ROTATE_RIGHT)
        rotateCollisionCheck()
      }
    })
  }
}

export default Game
