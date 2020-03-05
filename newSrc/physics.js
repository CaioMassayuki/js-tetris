import Playfield from './playfield'

const isTetrominoOccupiedCell = (tetromino, row, cell) => tetromino[row][cell] !== 0
const isArenaOutsideRow = (row, avatarPositionY) => !Playfield.arena[row + avatarPositionY]
const isArenaOccupiedCell = (row, cell, avatarPosition) => Playfield.arena[row + avatarPosition.y][cell + avatarPosition.x] !== 0

export const hasCollision = avatar => {
  const { position: avatarPosition, tetromino } = avatar
  for (let row = 0; row < tetromino.length; row++) {
    for (let cell = 0; cell < tetromino[row].length; cell++) {
      if (isTetrominoOccupiedCell(tetromino, row, cell) && (isArenaOutsideRow(row, avatarPosition.y) || isArenaOccupiedCell(row, cell, avatarPosition))) {
        return true
      }
    }
  }
  return false
}

export const updateArena = avatar => {
  const { position: avatarPosition, tetromino } = avatar
  for (let row = 0; row < tetromino.length; row++) {
    for (let cell = 0; cell < tetromino[row].length; cell++) {
      if (isTetrominoOccupiedCell(tetromino, row, cell)) {
        Playfield.arena[row + avatarPosition.y][cell + avatarPosition.x] = tetromino[row][cell]
      }
    }
  }
}
