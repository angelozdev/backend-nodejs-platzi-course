import dotenv from 'dotenv'

dotenv.config()

const {
  API_KEY,
  NODE_ENV,
  PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER
} = process.env

const EV = {
  postgres: {
    PASSWORD: POSTGRES_PASSWORD,
    DB: POSTGRES_DB,
    USER: POSTGRES_USER
  },
  NODE_ENV,
  PORT: PORT || 3000,
  API_KEY
}

export default EV
