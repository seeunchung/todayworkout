import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'
//componets
import WorkoutDetails from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

const WorkoutByDate = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const [loading, setLoading] = useState(true);
  const { date } = useParams(); // URL에서 date 파라미터 가져오기

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/workouts/date/${date}`)
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, [dispatch, date])
  return (
    <div className='home'>
      <div className='workouts'>
        {!loading && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        )
        )}
      </div>
      <WorkoutForm />
    </div>
  )
};

export default WorkoutByDate;