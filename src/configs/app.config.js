import 'dotenv/config'

const { HOSTNAME, PORT, DBUSER, DBPASSWORD, DATABASE } = process.env

const appConfig = {
  HOSTNAME,
  PORT,
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: DATABASE,
}

export default appConfig
