import { Router } from 'express'
import { Leaderboard } from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find({ period: '2026-08' }).populate('user', 'username firstName lastName').populate('team', 'name color').sort({ rank: 1 }))
})

export default router
