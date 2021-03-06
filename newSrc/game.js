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
      this.control.moveAvatarDown(1)
      this.moveCollisionCheck(true)
    }
  }

  moveCollisionCheck(isDownCollision = false) {
    console.log(this.avatar.position)
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
    let trueBothCheck = []
    // TODO lógica salvar movimentos feitos no LEFT e RIGHT para que o trueBothCheck consiga resetar a posição corretamente
    for (let offseat = 0; hasCollision(this.avatar); offseat++) {
      let collisionLocation
      if (collisionLocation !== 'BOTTOM') {
        collisionLocation = hasRotateCollision(this.avatar)
      }
      if (offseat > 2) offseat = 0
      if (trueBothCheck.find(sides => sides === 'LEFT') && trueBothCheck.find(sides => sides === 'RIGHT')) {
        collisionLocation = 'BOTH'
        console.log(collisionLocation)
      }
      switch (collisionLocation) {
        case 'LEFT':
          this.control.moveAvatarRight(offseat)
          trueBothCheck.push(collisionLocation)
          break
        case 'RIGHT':
          this.control.moveAvatarLeft(offseat)
          trueBothCheck.push(collisionLocation)
          break
        case 'BOTH':
          console.log(`HELLOS`)
          this.avatar.undoAction('ROTATE')
          return
        default:
          this.control.moveAvatarUp(1)
      }
      console.log(collisionLocation, offseat)
    }
    console.log(this.avatar.tetromino, 'END')
  }

  setupController() {
    document.addEventListener('keydown', event => {
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
