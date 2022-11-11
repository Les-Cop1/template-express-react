import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.send({ success: true })
})

export { router as indexRouter }
export * from './authentication'
export * from './user'
