import React from 'react'; 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  dispatch: React.Dispatch<any>;
}

const WorkoutByDate: React.FC = () => {
  const { workouts, dispatch } = useWorkoutsContext() as WorkoutsContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const { date } = useParams<{ date: string }>(); // URL에서 date 파라미터 가져오기

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (date) {
        try {
          const response = await fetch(`/api/workouts/date/${date}`);
          const json = await response.json();
          if (response.ok) {
            dispatch({ type: 'SET_WORKOUTS', payload: json });
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching workouts:', error);
          setLoading(false);
        }
      }
    };
    fetchWorkouts();
  }, [dispatch, date]);

  return (
    <div className='home'>
      <div className='workouts'>
        <h3>{date}</h3>
        {!loading && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default WorkoutByDate;
