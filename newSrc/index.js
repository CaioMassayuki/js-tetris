import Game from './game'
import Playfield from './playfield'

function play() {
  const game = new Game()
  game.setupController()
  function update(time = 0) {
    game.clock.setDeltaTime(time)
    Playfield.updatePlayfield(game.avatar.tetromino, game.avatar.position)
    game.isDropTick()
    requestAnimationFrame(update)
  }
  update()
}

play()
