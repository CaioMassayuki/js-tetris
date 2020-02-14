class Tetromino {
  constructor() {
    this.tetrominoDrawing = {
      I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
      T: [[0, 2, 0], [2, 2, 2], [0, 0, 0]],
      O: [[3, 3], [3, 3]],
      S: [[0, 4, 4], [4, 4, 0], [0, 0, 0]],
      Z: [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
      L: [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
      J: [[0, 7, 0], [0, 7, 0], [7, 7, 0]]
    }
    this.length = this.tetrominoDrawing.keys().length
  }

  randomizer() {
    return this.pocket[this.pocket[Math.floor(Math.random() * this.pocket.length)]]
  }
}
