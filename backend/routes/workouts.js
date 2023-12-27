const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  getWorkoutByDate,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();

//Get all workouts
router.get('/', getWorkouts);

//Get a single workout
router.get('/:id', getWorkout);

//Get workoutst by date
router.get('/date/:date', getWorkoutByDate);

//Post a new workout
router.post('/', createWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;