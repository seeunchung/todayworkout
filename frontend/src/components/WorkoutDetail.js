import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'

//date fns
import { format } from 'date-fns'


const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>무게 (kg):</strong>{workout.load}</p>
      <p><strong>횟수(분):</strong>{workout.reps}</p>
      <p><strong>세트:</strong>{workout.set}</p>
      <p>{format(new Date(workout.createdAt), 'yyyy.MM.dd')}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails;