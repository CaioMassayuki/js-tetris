class Player {
  constructor() {
    this.position = { x: 3, y: 0 }
    this.tetromino = this.randomizer()
    this.pocket = ['I', 'T', 'O', 'L', 'J', 'S', 'Z ']
  }

  
}

// PLAYER
const PLAYER = {
  position: { x: 3, y: 0 },
  tetromino: TETROMINOS.I
}

let tetrominoBag = ['I', 'T', 'O', 'L', 'J', 'S', 'Z ']


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
