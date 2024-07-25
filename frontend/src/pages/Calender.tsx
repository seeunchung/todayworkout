import React from 'react'; 
import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'

//componets
import MainCalender from '../components/MainCalender';

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

const Calender: React.FC = () => {
  const { workouts, dispatch } = useWorkoutsContext() as WorkoutsContextType;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false); // 데이터 로딩이 완료
      }

    }

    fetchWorkouts();
  }, [dispatch])
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MainCalender workouts={workouts} />
      )}
    </>
  )
}

export default Calender;