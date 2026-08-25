import mongoose from 'mongoose';
import { Activity } from '../models/activity.js'
import { Leaderboard } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { username: 'maya.runner', email: 'maya@example.com', firstName: 'Maya', lastName: 'Rivera', profile: { grade: 10, avatar: 'MR' } },
      { username: 'liam.lifts', email: 'liam@example.com', firstName: 'Liam', lastName: 'Chen', profile: { grade: 11, avatar: 'LC' } },
      { username: 'zoe.moves', email: 'zoe@example.com', firstName: 'Zoe', lastName: 'Patel', profile: { grade: 9, avatar: 'ZP' } },
      { username: 'noah.trains', email: 'noah@example.com', firstName: 'Noah', lastName: 'Williams', profile: { grade: 12, avatar: 'NW' } },
    ])

    const teams = await Team.create([
      { name: 'Trail Blazers', color: '#e76f51', members: [users[0]._id, users[2]._id], totalPoints: 360 },
      { name: 'Peak Performers', color: '#2a9d8f', members: [users[1]._id, users[3]._id], totalPoints: 405 },
    ])

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, points: 120, completedAt: new Date('2026-08-21') },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, points: 150, completedAt: new Date('2026-08-22') },
      { user: users[2]._id, type: 'walking', durationMinutes: 38, distanceMiles: 2.2, points: 90, completedAt: new Date('2026-08-23') },
      { user: users[3]._id, type: 'running', durationMinutes: 28, distanceMiles: 2.7, points: 135, completedAt: new Date('2026-08-24') },
    ])

    await Leaderboard.create([
      { user: users[3]._id, team: teams[1]._id, points: 235, rank: 1, period: '2026-08' },
      { user: users[1]._id, team: teams[1]._id, points: 170, rank: 2, period: '2026-08' },
      { user: users[0]._id, team: teams[0]._id, points: 190, rank: 3, period: '2026-08' },
      { user: users[2]._id, team: teams[0]._id, points: 170, rank: 4, period: '2026-08' },
    ])

    await Workout.create([
      { title: 'Neighborhood Tempo Run', description: 'A steady run with short faster intervals.', category: 'cardio', difficulty: 'intermediate', durationMinutes: 30, equipment: [] },
      { title: 'Bodyweight Circuit', description: 'Build full-body strength with simple movements.', category: 'strength', difficulty: 'beginner', durationMinutes: 20, equipment: ['mat'] },
      { title: 'Post-Workout Reset', description: 'Restore mobility with a guided stretch sequence.', category: 'mobility', difficulty: 'beginner', durationMinutes: 12, equipment: ['mat'] },
    ])

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
