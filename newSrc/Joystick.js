class Joystick {
  constructor(avatar) {
    this.avatar = avatar
  }

  moveAvatarLeft(steps) {
    this.avatar.position.x -= steps
  }
  moveAvatarRight(steps) {
    this.avatar.position.x += steps
  }
  moveAvatarDown(steps) {
    this.avatar.position.y += steps
  }
  moveAvatarUp(steps) {
    this.avatar.position.y -= steps
  }
  rotateAvatar(direction) {
    this.avatar.saveStance()
    this.avatar.rotate(direction)
  }
}

export default Joystick
