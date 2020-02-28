export const flipMatrix = matrix => {
  const matrixIndexes = Object.keys(matrix)
  const flippedMatrix = matrixIndexes.map(index => {
    return matrix.map(row => row[index])
  })
  return flippedMatrix
}

export const rotateMatrix = matrix => {
  return [...matrix].reverse()
}
