

const setControllerActions = () => {
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
}

export default setControllerActions