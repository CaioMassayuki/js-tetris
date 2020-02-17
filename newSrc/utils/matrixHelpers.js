export const flipMatrix = matrix => {
  const tetrominoLength = Object.keys(matrix)
  const flippedMatrix = tetrominoLength.map(index => {
    return matrix.map(row => row[index])
  })
  return flippedMatrix
}

export const rotateMatrix = matrix => {
  return [...matrix].reverse()
}
