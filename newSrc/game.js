import { LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, Z_KEY, X_KEY, ROTATE_RIGHT, ROTATE_LEFT } from './constants'
import { hasCollision, updateArena, hasRotateCollision } from './physics'
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
      this.avatar.savePosition()
      this.control.moveAvatarDown(1)
      this.moveCollisionCheck(true)
    }
  }

  moveCollisionCheck(isDownCollision = false) {
    if (hasCollision(this.avatar)) {
      this.avatar.undoAction('MOVE')
      if (isDownCollision) {
        updateArena(this.avatar)
        this.avatar.resetPosition()
        this.avatar.testRandomizer()
      }
    }
  }
  
  rotateCollisionCheck() {
    // TODO Ajustar todos as variaveis largadas em um objeto que armazena as informações sobre a colisão
    let trueBothCheck = []
    let bothCount = 0
    this.avatar.savePosition()

    for (let offseat = 1; hasCollision(this.avatar); offseat++) {
      let collisionLocation

      if (collisionLocation !== 'BOTTOM') {
        collisionLocation = hasRotateCollision(this.avatar)
      }

      if (trueBothCheck.find(sides => sides === 'LEFT') && trueBothCheck.find(sides => sides === 'RIGHT')) {
        collisionLocation = 'BOTH'
      }

      if (offseat > 2) offseat = 0
      switch (collisionLocation) {
        case 'LEFT':
          this.control.moveAvatarRight(1)
          trueBothCheck.push(collisionLocation)
          break
        case 'RIGHT':
          this.control.moveAvatarLeft(1)
          trueBothCheck.push(collisionLocation)
          break
        case 'BOTH':
          if (bothCount < 1) {
            this.control.moveAvatarUp(1)
            bothCount++
          } else {
            this.avatar.undoAction('ROTATE')
            this.avatar.undoAction('MOVE')
          }
          break
        default:
          if (trueBothCheck.length > 0) {
            this.control.moveAvatarUp(2)
          }
          this.control.moveAvatarUp(1)
      }
      console.log(collisionLocation)
    }
    console.log(this.avatar.tetromino, 'END')
  }

  setupController() {
    document.addEventListener('keydown', event => {
      this.avatar.savePosition()
      if (validateEventKey(event, LEFT_ARROW)) {
        this.control.moveAvatarLeft(1)
        this.moveCollisionCheck()
      } else if (validateEventKey(event, RIGHT_ARROW)) {
        this.control.moveAvatarRight(1)
        this.moveCollisionCheck()
      } else if (validateEventKey(event, DOWN_ARROW)) {
        this.control.moveAvatarDown(1)
        this.moveCollisionCheck(true)
      } else if (validateEventKey(event, Z_KEY)) {
        console.log(this.avatar.tetromino, 'START')
        this.control.rotateAvatar(ROTATE_LEFT)
        this.rotateCollisionCheck()
      } else if (validateEventKey(event, X_KEY)) {
        console.log(this.avatar.tetromino, 'START')
        this.control.rotateAvatar(ROTATE_RIGHT)
        this.rotateCollisionCheck()
      }
    })
  }
}

export default Game
