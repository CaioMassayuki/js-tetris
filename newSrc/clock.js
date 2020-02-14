class Clock {
  constructor() {
    this.lasttime = 0
    this.dropCounter = 0
    this.dropInterval = 1000
    this.deltaTime = 0
  }

  setDeltaTime(time) {
    this.deltaTime = time - this.lasttime
    this.lasttime = time
    this.dropCounter += this.deltaTime
  }
}

export default Clock
