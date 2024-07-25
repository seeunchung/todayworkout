import React from 'react';
import { FC } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext';

// Workout 타입 정의
interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  set: number;
  date: string;
}

// 컴포넌트 Props 타입 정의
interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails: FC<WorkoutDetailsProps> = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE'
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      } else {
        console.error('Failed to delete workout:', json.error);
      }
    } catch (error) {
      console.error('An error occurred while deleting the workout:', error);
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>무게 (kg):</strong> {workout.load}</p>
      <p><strong>횟수(분):</strong> {workout.reps}</p>
      <p><strong>세트:</strong> {workout.set}</p>
      <p>{workout.date}</p>
      <span onClick={handleClick} style={{ cursor: 'pointer'}}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
