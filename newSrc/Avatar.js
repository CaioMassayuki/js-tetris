import Tetrominos from './tetrominos'
import { ROTATE_RIGHT } from './constants'

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
        this.tetromino = this.savedStance
          ? [...this.savedStance]
          : this.tetromino
        break
      default:
        console.log('NADA')
    }
  }

  savePosition() {
    this.savedPosition = { ...this.position }
  }

  saveStance() {
    this.savedStance = [...this.tetromino]
  }

  rotate(direction) {
    const flipMatrix = matrix => {
      const tetrominoLength = Object.keys(matrix)
      const flippedMatrix = tetrominoLength.map(index => {
        return matrix.map(row => row[index])
      })
      return flippedMatrix
    }
    const rotateMatrix = matrix => {
      return [...matrix].reverse()
    }

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
