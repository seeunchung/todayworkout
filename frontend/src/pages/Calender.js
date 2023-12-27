import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'

//componets
import MainCalender from '../components/MainCalender';

const Calender = () => {
  const { dispatch } = useWorkoutsContext()
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
    <>
      <MainCalender />
    </>
  )
}

export default Calender;