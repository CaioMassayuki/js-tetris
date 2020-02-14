import tetrominoPosition from './utils/tetrominoPosition'
import tetrominoColor from './utils/tetrominoColor'

class Playfield {
  constructor() {
    if (!Playfield.instance) {
      this.canvas = document.getElementById('canvas')
      this.width = this.canvas.width
      this.height = this.canvas.height
      this.context = canvas.getContext('2d')
      this.pixel = this.canvas.width / 10
      this.arena = []
      Playfield.instance = this
    }
    return Playfield.instance
  }

  createPlayfield(width = 10, height = 20) {
    let xHeight = height
    while (xHeight--) {
      this.arena.push(new Array(width).fill(0))
    }
  }

  updatePlayfield(matrix, position) {
    this.context.fillStyle = '#212121'
    this.context.fillRect(0, 0, this.width, this.height)
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = tetrominoColor(value)
          this.context.fillRect(tetrominoPosition(x, this.pixel, position.x), tetrominoPosition(y, this.pixel, position.y), this.pixel, this.pixel)
        }
      })
    })
    this.arena.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = tetrominoColor(value)
          this.context.fillRect(tetrominoPosition(x, this.pixel, 0), tetrominoPosition(y, this.pixel, 0), this.pixel, this.pixel)
        }
      })
    })
  }

  playfieldGrid() {
    for (let column = 0; column < this.width; column++) {
      for (let line = 0; line < this.height; line++) {
        if (column % this.pixel === 0 && line % this.pixel === 0) {
          this.context.strokeStyle = '#fff'
          this.context.strokeRect(column, line, this.pixel, this.pixel)
        }
      }
    }
  }
}

const instance = new Playfield()
instance.createPlayfield()
instance.context.fillStyle = '#212121'
instance.context.fillRect(0, 0, instance.width, instance.height)
Object.freeze(instance)

export default instance
