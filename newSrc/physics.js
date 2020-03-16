import Playfield from './playfield'
import { isEven } from './utils/mathHelpers'

// Matrix Mapper Utils
const isTetrominoOccupiedCell = (tetromino, row, cell) => tetromino[row][cell] !== 0
const isArenaOutsideRow = (row, avatarPositionY) => !Playfield.arena[row + avatarPositionY]
const isArenaOccupiedCell = (row, cell, avatarPosition) => {
  return (
    isArenaOutsideRow(row, avatarPosition.y) || Playfield.arena[row + avatarPosition.y][cell + avatarPosition.x] !== 0
  )
}
const isBottomCollision = (tetromino, avatarPosition) => {
  if (isEven(tetromino.length)) {
    if (
      (isTetrominoOccupiedCell(tetromino, tetromino.length - 1, 1) &&
        isArenaOccupiedCell(tetromino.length - 1, 1, avatarPosition)) ||
      (isTetrominoOccupiedCell(tetromino, tetromino.length - 1, 2) &&
        isArenaOccupiedCell(tetromino.length - 1, 2, avatarPosition))
    ) {
      return true
    }
  }
  if (
    isTetrominoOccupiedCell(tetromino, tetromino.length - 1, 1) &&
    isArenaOccupiedCell(tetromino.length - 1, 1, avatarPosition)
  ) {
    return true
  }
  return false
}

const isBothCollision = (tetromino, row, avatarPosition) => {
  if (isEven(tetromino.length)) {
    if (
      ((isTetrominoOccupiedCell(tetromino, row, tetromino[row].length - 1) &&
        isTetrominoOccupiedCell(tetromino, row, 0)) ||
        (isTetrominoOccupiedCell(tetromino, row, tetromino[row].length - 2) &&
          isTetrominoOccupiedCell(tetromino, row, 0)) ||
        (isTetrominoOccupiedCell(tetromino, row, tetromino[row].length - 1) &&
          isTetrominoOccupiedCell(tetromino, row, 1))) &&
      ((isArenaOccupiedCell(row, tetromino.length - 1, avatarPosition) &&
        isArenaOccupiedCell(row, 0, avatarPosition)) ||
        (isArenaOccupiedCell(row, tetromino.length - 2, avatarPosition) &&
          isArenaOccupiedCell(row, 0, avatarPosition)) ||
        (isArenaOccupiedCell(row, tetromino.length - 1, avatarPosition) && isArenaOccupiedCell(row, 1, avatarPosition)))
    ) {
      return true
    }
  }
  if (
    isTetrominoOccupiedCell(tetromino, row, tetromino[row].length - 1) &&
    isTetrominoOccupiedCell(tetromino, row, 0) &&
    isArenaOccupiedCell(row, tetromino[row].length - 1, avatarPosition) &&
    isArenaOccupiedCell(row, 0, avatarPosition)
  ) {
    return true
  }
  return false
}

const isLeftCollision = (tetromino, row, avatarPosition) => {
  if (isTetrominoOccupiedCell(tetromino, row, 0) && isArenaOccupiedCell(row, 0, avatarPosition)) {
    return true
  }
  return false
}

const isRightCollision = (tetromino, row, avatarPosition) => {
  if (
    isTetrominoOccupiedCell(tetromino, row, tetromino[row].length - 1) &&
    isArenaOccupiedCell(row, tetromino[row].length - 1, avatarPosition)
  ) {
    return true
  }
  return false
}

export const hasCollision = avatar => {
  const { position: avatarPosition, tetromino } = avatar
  for (let row = 0; row < tetromino.length; row++) {
    for (let cell = 0; cell < tetromino[row].length; cell++) {
      if (isTetrominoOccupiedCell(tetromino, row, cell) && isArenaOccupiedCell(row, cell, avatarPosition)) {
        return true
      }
    }
  }
  return false
}

export const hasRotateCollision = avatar => {
  const { position: avatarPosition, tetromino } = avatar
  for (let row = 0; row < tetromino.length; row++) {
    for (let cell = 0; cell < tetromino[row].length; cell++) {
      if (isBottomCollision(tetromino, avatarPosition)) {
        return 'BOTTOM'
      }
      if (isBothCollision(tetromino, row, avatarPosition)) {
        return 'BOTH'
      }
      if (isLeftCollision(tetromino, row, avatarPosition)) {
        return 'LEFT'
      }
      if (isRightCollision(tetromino, row, avatarPosition)) {
        return 'RIGHT'
      }
    }
  }
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
