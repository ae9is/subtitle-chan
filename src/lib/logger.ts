class Logger {
  log(message: any) {
    console.log(message)
  }

  error(message: any) {
    console.error(message)
  }
}

const logger = new Logger()

export default logger
