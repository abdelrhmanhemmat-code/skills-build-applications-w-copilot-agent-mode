import { Router } from 'express'
import { Workout } from '../models/workout.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }))
})

export default router
