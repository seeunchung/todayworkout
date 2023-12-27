import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }

    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    case 'FILTER_WORKOUTS_BY_DATE':
      // 날짜에 해당하는 운동 정보만 필터링
      const filteredWorkouts = state.workouts.filter((w) => {
        return w.date === action.payload.date;
      });
      return {
        workouts: filteredWorkouts
      };
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}