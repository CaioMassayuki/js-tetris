import Tetrominos from './tetrominos'
import { ROTATE_RIGHT } from './constants'
import { flipMatrix, rotateMatrix } from './utils/matrixHelpers'

class Avatar {
  constructor(position, tetromino) {
    this.tetrominos = new Tetrominos()
    this.bag = ['J', 'L', 'I']
    // this.bag = [...this.tetrominos.pieces]
    // this.tetromino = this.tetromino || this.bagRandomizer()
    this.tetromino = this.tetromino || this.testRandomizer()
    this.position = position || { x: 3, y: 0 }
    this.savedPosition = null
    this.savedStance = null
  }

  resetPosition() {
    this.position = { x: 3, y: 0 }
  }

  undoAction(action) {
    switch (action) {
      case 'ROTATE':
        this.tetromino = [...this.savedStance]
        break
      case 'MOVE':
        this.position = { ...this.savedPosition }
        break
      default:
        console.log('NOTHING')
    }
  }

  savePosition() {
    this.savedPosition = { ...this.position }
  }

  saveStance() {
    this.savedStance = [...this.tetromino]
  }

  rotate(direction) {
    if (direction === ROTATE_RIGHT) {
      this.tetromino = rotateMatrix(flipMatrix(this.tetromino))
    } else {
      this.tetromino = flipMatrix(rotateMatrix(this.tetromino))
    }
  }

  testRandomizer() {
    if (this.bag.length === 0) {
      this.bag = ['J', 'L', 'I']
    }
    const tetromino = this.tetrominos.matrixes[this.bag.splice(0, 1)]
    if (!this.tetromino) {
      return tetromino
    }
    this.tetromino = tetromino
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
