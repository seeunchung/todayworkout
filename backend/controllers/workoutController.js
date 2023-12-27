const Workout = require('../models/workoutsModel');
const mongoose = require('mongoose');


//get all workouts
const getWorkouts = async (req, res) => {
  // 문자열 형태로 저장된 날짜를 기준으로 내림차순 정렬
  const workouts = await Workout.find({}).sort({ date: -1, createdAt: -1 });
  res.status(200).json(workouts);
}


// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: 'No such workout' });
  }
  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'no such workout' })
  }
  res.status(200).json(workout);
}

// get workouts by date
const getWorkoutByDate = async (req, res) => {
  const { date } = req.params;
  const workouts = await Workout.find({ date: date }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
}



//create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps, set, date } = req.body;

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!set) {
    emptyFields.push('set')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps, set, date });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: 'no such workout' })
  }

  res.status(200).json(workout);

}

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!workout) {
    return res.status(404).json({ error: 'no such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  getWorkoutByDate,
  createWorkout,
  deleteWorkout,
  updateWorkout
}