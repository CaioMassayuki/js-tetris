export default  (event, key) => {
  const { keyCode, which } = event
  return keyCode === key || which === key
}