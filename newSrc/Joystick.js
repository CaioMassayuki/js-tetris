class Joystick {
  constructor(avatar) {
    this.avatar = avatar
  }

  moveAvatarLeft(steps) {
    this.avatar.savePosition()
    this.avatar.position.x -= steps
  }
  moveAvatarRight(steps) {
    this.avatar.savePosition()
    this.avatar.position.x += steps
  }
  moveAvatarDown(steps) {
    this.avatar.savePosition()
    this.avatar.position.y += steps
  }
  rotateAvatar(direction) {
    this.avatar.rotate(direction)
  }
}

export default Joystick
