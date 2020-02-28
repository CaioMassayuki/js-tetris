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

// export const hasCollisionV2 = avatar => {
//   const { position: avatarPosition, tetromino } = avatar
//   const movePiece = Math.trunc(tetromino.length / 2)
//   const newArena = tetromino.some((row, y) => {
//     row.some((cell, x) => {
//       isTetrominoOccupiedCell(tetromino, row, cell)
//     })
//   })
// }

export const updateArena = avatar => {
  avatar.tetromino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        Playfield.arena[y + avatar.position.y][x + avatar.position.x] = value
      }
    })
  })
}
