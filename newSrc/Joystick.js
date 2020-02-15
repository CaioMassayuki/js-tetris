class Joystick {
  constructor(avatar) {
    this.avatar = avatar
  }

  moveAvatarLeft() {
    this.avatar.savePosition()
    this.avatar.position.x--
  }
  moveAvatarRight() {
    this.avatar.savePosition()
    this.avatar.position.x++
  }
  moveAvatarDown() {
    this.avatar.savePosition()
    this.avatar.position.y++
  }
  rotateAvatar(direction) {
    this.avatar.saveStance()
    this.avatar.rotate(direction)
  }
}

export default Joystick
