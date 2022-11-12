import express from 'express'

import { getCorsOptions } from '@helpers'
import { authenticationRouter, indexRouter, userRouter } from '@routes'
import { Express } from '@types'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '/../../.env') })

const app: Express = express()

app.use(cors(getCorsOptions()))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', indexRouter)
app.use('/api/authenticate', authenticationRouter)
app.use('/api/user', userRouter)

export default app
