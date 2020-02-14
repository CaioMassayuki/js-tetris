import Playfield from './playfield'

const isTetrominoOccupiedCell = (tetromino, row, column) => tetromino[row][column] !== 0

export const hasCollision = avatar => {
  const tetromino = avatar.tetromino
  for (let row = 0; row < tetromino.length; row++) {
    for (let column = 0; column < tetromino[row].length; column++) {
      if (isTetrominoOccupiedCell(tetromino, row, column) && (!Playfield.arena[row + avatar.position.y] || Playfield.arena[row + avatar.position.y][column + avatar.position.x] !== 0)) {
        return true
      }
    }
  }
  return false
}

export const updateArena = avatar => {
  avatar.tetromino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        Playfield.arena[y + avatar.position.y][x + avatar.position.x] = value
      }
    })
  })
}