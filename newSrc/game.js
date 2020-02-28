import { LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, Z_KEY, X_KEY, ROTATE_RIGHT, ROTATE_LEFT } from './constants'
import { hasCollision, updateArena } from './physics'
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
      this.collisionCheck('MOVE', true)
    }
  }

  collisionCheck(action, isDownCollision = false) {
    if (hasCollision(this.avatar)) {
      if (action === 'ROTATE') {
        let offseat = 0
        while (hasCollision(this.avatar)) {
          offseat = -(offseat + (offseat > 0 ? 1 : -1))
          if (offseat > 0) {
            this.control.moveAvatarRight(offseat)
          } else {
            this.control.moveAvatarLeft(-offseat)
          }
        }
      }

      this.avatar.undoAction(action)

      if (isDownCollision) {
        updateArena(this.avatar)
        this.avatar.resetPosition()
        this.avatar.bagRandomizer()
      }
    }
  }

  setupController() {
    document.addEventListener('keydown', event => {
      if (validateEventKey(event, LEFT_ARROW)) {
        this.control.moveAvatarLeft(1)
        this.collisionCheck('MOVE')
      } else if (validateEventKey(event, RIGHT_ARROW)) {
        this.control.moveAvatarRight(1)
        this.collisionCheck('MOVE')
      } else if (validateEventKey(event, DOWN_ARROW)) {
        this.control.moveAvatarDown(1)
        this.collisionCheck('MOVE', true)
      } else if (validateEventKey(event, Z_KEY)) {
        this.control.rotateAvatar(ROTATE_LEFT)
        this.collisionCheck('ROTATE')
      } else if (validateEventKey(event, X_KEY)) {
        this.control.rotateAvatar(ROTATE_RIGHT)
        this.collisionCheck('ROTATE')
      }
    })
  }
}

export default Game
