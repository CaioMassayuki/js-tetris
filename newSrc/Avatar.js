import Tetrominos from './tetrominos'
import { ROTATE_RIGHT } from './constants'
import { flipMatrix, rotateMatrix } from './utils/matrixHelpers'

class Avatar {
  constructor(position, tetromino) {
    this.tetrominos = new Tetrominos()
    this.bag = [...this.tetrominos.pieces]
    this.tetromino = tetromino || this.bagRandomizer()
    this.position = position || { x: 3, y: 0 }
    this.savedPosition = null
    this.savedStance = null
  }

  resetPosition() {
    this.position = { x: 3, y: 0 }
  }

  undoAction(action) {
    switch (action) {
      case 'MOVE':
        this.position = { ...this.savedPosition }
        break
      case 'ROTATE':
        this.tetromino = this.savedStance ? [...this.savedStance] : this.tetromino
        break
      default:
        this.position = { ...this.savedPosition }
        this.tetromino = this.savedStance ? [...this.savedStance] : this.tetromino
    }
  }

  savePosition() {
    this.savedPosition = { ...this.position }
  }

  rotate(direction) {
    if (direction === ROTATE_RIGHT) {
      this.tetromino = rotateMatrix(flipMatrix(this.tetromino))
    } else {
      this.tetromino = flipMatrix(rotateMatrix(this.tetromino))
    }
  }

  bagRandomizer() {
    if (this.bag.length === 0) {
      this.bag = ['I', 'T', 'O', 'S', 'Z', 'L', 'J']
    }
    const position = Math.floor(Math.random() * this.bag.length)
    const tetromino = this.tetrominos.matrixes[this.bag[position]]
    this.bag.splice(position, 1)

    if (!this.tetromino) {
      return tetromino
    }
    this.tetromino = tetromino
  }
}

export default Avatar
