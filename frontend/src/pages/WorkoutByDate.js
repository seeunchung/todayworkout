import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'
import { useParams } from 'react-router-dom';

//componets
import WorkoutDetails from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

const WorkoutByDate = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { date: dateToFilter } = useParams(); // URL에서 date 파라미터 가져오기

  useEffect(() => {
    dispatch({ type: 'FILTER_WORKOUTS_BY_DATE', payload: { date: dateToFilter } });
  }, [dispatch, dateToFilter]);

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
};

export default WorkoutByDate;