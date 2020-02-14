export default tetromino => {
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