class EmptyInput extends Error {
  constructor () {
    super()

    this.code = 'EEMPTY'
    this.message = 'Input is empty.'
  }
}

module.exports = EmptyInput
