const generateMessage = (text, extras) => {
  const combined = {
      ...{
          message: text,
          createdAt: new Date().getTime()
      },
      ...extras
  }
  return combined
}

module.exports = {
  generateMessage
}