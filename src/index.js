// CONSTANTS
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const Z_KEY = 90
const X_KEY = 88
const ROTATE_LEFT = -1
const ROTATE_RIGHT = 1

// TETROMINOS
const TETROMINOS = {
  I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  T: [[0, 2, 0], [2, 2, 2], [0, 0, 0]],
  O: [[3, 3], [3, 3]],
  S: [[0, 4, 4], [4, 4, 0], [0, 0, 0]],
  Z: [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
  L: [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
  J: [[0, 7, 0], [0, 7, 0], [7, 7, 0]],
}

// LAYOUT CONSTANTS
const CANVAS = document.getElementById('canvas')
const CONTEXT = canvas.getContext('2d')
const PIXEL = CANVAS.width / 10

// UTILS
const tetrominoPosition = (axis, square, position = 0) =>
  (axis + position) * square
const validateEventKey = (event, key) => {
  const { keyCode, which } = event
  return keyCode === key || which === key
}
const changeTetrominoColor = tetromino => {
  const colors = {
    1: 'cyan',
    2: 'purple',
    3: 'yellow',
    4: 'green',
    5: 'red',
    6: 'orange',
    7: 'blue',
  }
  return colors[tetromino]
}

// RENDER FUNCTIONS
function drawPlayfield() {
  for (let column = 0; column < CANVAS.width; column++) {
    for (let line = 0; line < CANVAS.height; line++) {
      if (column % PIXEL === 0 && line % PIXEL === 0) {
        CONTEXT.strokeStyle = '#fff'
        CONTEXT.strokeRect(column, line, PIXEL, PIXEL)
      }
    }
  }
}
function createPlayfield(width, height) {
  const matrix = []
  while (height--) {
    matrix.push(new Array(width).fill(0))
  }
  return matrix
}
function updatePlayfield(matrix, position) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        CONTEXT.fillStyle = changeTetrominoColor(value)
        CONTEXT.fillRect(
          tetrominoPosition(x, PIXEL, position.x),
          tetrominoPosition(y, PIXEL, position.y),
          PIXEL,
          PIXEL,
        )
      }
    })
  })
}
function arenaSweep() {
  outer: for (let row = arena.length - 1; row > 0; --row) {
    for (let column = 0; column < arena[row].length; ++column) {
      if (arena[row][column] === 0) {
        continue outer
      }
    }
    const removeRow = arena.splice(row, 1)[0].fill(0)
    arena.unshift(removeRow)
    ++row
  }
}
// PLAYER
const PLAYER = {
  position: { x: 3, y: 0 },
  tetromino: TETROMINOS.I,
}

let tetrominoBag = ['I', 'T', 'O', 'L', 'J', 'S', 'Z ']
function randomizer() {
  PLAYER.tetromino =
    TETROMINOS[tetrominoBag[Math.floor(Math.random() * tetrominoBag.length)]]
}

// PLAYER - ACTIONS
function dropAction() {
  PLAYER.position.y++
  if (collide(arena, PLAYER)) {
    PLAYER.position.y--
    merge(arena, PLAYER)
    PLAYER.position.y = 0
    PLAYER.position.x = 3
    randomizer()
    arenaSweep()
  }
  dropCounter = 0
}

function rotateAction(direction) {
  const position = PLAYER.position.x
  let offseat = 1
  rotate(PLAYER.tetromino, direction)
  while (collide(arena, PLAYER)) {
    PLAYER.position.x += offseat
    offseat = -(offseat + (offseat > 0 ? 1 : -1))
    if (offseat > PLAYER.tetromino.length) {
      rotate(PLAYER.tetromino, -direction)
      PLAYER.position.x = position
      return
    }
  }
}

// SETUP CONTROLLER
document.addEventListener('keyup', event => {
  if (validateEventKey(event, DOWN_ARROW)) {
    arrowDown = false
  }
})

document.addEventListener('keydown', event => {
  if (validateEventKey(event, LEFT_ARROW)) {
    PLAYER.position.x--
    if (collide(arena, PLAYER)) {
      PLAYER.position.x++
    }
  } else if (validateEventKey(event, RIGHT_ARROW)) {
    PLAYER.position.x++
    if (collide(arena, PLAYER)) {
      PLAYER.position.x--
    }
  } else if (validateEventKey(event, DOWN_ARROW)) {
    arrowDown = true
  } else if (validateEventKey(event, Z_KEY)) {
    rotateAction(ROTATE_LEFT)
  } else if (validateEventKey(event, X_KEY)) {
    rotateAction(ROTATE_RIGHT)
  }
})

// GAME LOGIC
function collide(arena, player) {
  const matrix = player.tetromino
  const position = player.position
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (
        matrix[y][x] !== 0 &&
        (!arena[y + position.y] || arena[y + position.y][x + position.x] !== 0)
      ) {
        return true
      }
    }
  }
  return false
}

function rotate(matrix, direction) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      ;[matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]]
    }
  }
  if (direction > 0) {
    matrix.forEach(row => row.reverse())
  } else {
    matrix.reverse()
  }
}

function merge(arena, player) {
  player.tetromino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.position.y][x + player.position.x] = value
      }
    })
  })
}

// START GAME
let arena = createPlayfield(10, 20)
function draw() {
  CONTEXT.fillStyle = '#212121'
  CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)
  updatePlayfield(PLAYER.tetromino, PLAYER.position, PLAYER.color)
  updatePlayfield(arena, { x: 0, y: 0 })
  drawPlayfield()
}

let arrowDown = false
let dropCounter = 0
let dropInterval = 1000
let lastime = 0
function update(time = 0) {
  const deltaTime = time - lastime
  lastime = time
  dropCounter += deltaTime
  console.log(dropCounter)
  if (arrowDown && dropCounter > dropInterval / 15) {
    dropAction()
  } else if (dropCounter > dropInterval) {
    dropAction()
  }
  draw()
  requestAnimationFrame(update)
}

update()
