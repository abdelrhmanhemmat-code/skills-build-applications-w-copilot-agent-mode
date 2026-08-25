import { Router } from 'express'
import { Team } from '../models/team.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username firstName lastName').sort({ totalPoints: -1 }))
})

export default router
