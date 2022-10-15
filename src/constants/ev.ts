import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, NODE_ENV } = process.env

const EV = {
  postgres: {
    PASSWORD: POSTGRES_PASSWORD,
    DB: POSTGRES_DB,
    USER: POSTGRES_USER
  },
  NODE_ENV
}

export default EV
