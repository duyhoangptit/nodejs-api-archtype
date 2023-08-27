import 'module-alias/register'
import setupApp from '@main/config/app'
import env from '@main/config/env'
import * as dotenv from 'dotenv'
dotenv.config()

const nodeEnv = process.env.APP_ENV

dotenv.config({
  path: `./environments/.env.${nodeEnv}`
})

const app = setupApp()

app.listen(env.port, () => { console.log(`Server running on port ${env.port}`) })
