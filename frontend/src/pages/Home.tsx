import React from 'react'; 
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'

//componets
import WorkoutDetails from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

// Workout 타입 정의
interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  set: number;
  date: string;
  [key: string]: any; 
}

// useWorkoutsContext 훅의 타입 정의
interface WorkoutsContextType {
  workouts: Workout[];
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

const Home: React.FC = () => {
  const { workouts, dispatch } = useWorkoutsContext() as WorkoutsContextType;

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    fetchWorkouts();
  }, [dispatch])
  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        )
        )}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;