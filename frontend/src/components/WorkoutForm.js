import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkcoutsContext'
import { useParams } from 'react-router-dom';

//date fns
import { format } from 'date-fns'


const WorkoutForm = () => {
  const { date: urlDate } = useParams();
  let date;
  // URL 파라미터 값이 있으면 해당 값을 파싱하여 초기화
  if (urlDate) {
    date = urlDate;
  } else {
    // URL 파라미터 값이 없으면 현재 날짜를 초기화
    date = format(new Date(), 'yyyy-MM-dd');
  }

  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [set, setSet] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps, set, date };
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setSet('');
      setError(null);
      setEmptyFields([]);
      console.log('new workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  }
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>운동을 추가하세요</h3>
      <label>운동 Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>무게 (in kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>횟수(분):</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>세트:</label>
      <input
        type='number'
        onChange={(e) => setSet(e.target.value)}
        value={set}
        className={emptyFields.includes('set') ? 'error' : ''}
      />
      <button>ADD</button>
      {error && <div className='error'>{error}</div>}
    </form>

  )
}

export default WorkoutForm;