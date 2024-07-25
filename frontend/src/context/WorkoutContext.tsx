import React ,{ createContext, useReducer, ReactNode } from 'react';

export const WorkoutsContext = createContext<any>(null);

interface Action {
  type: string;
  payload?: any;
}

interface State {
  workouts: any[] | null;
}

export const workoutsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };

    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...(state.workouts || [])]
      };
      
    case 'DELETE_WORKOUT':
      return {
        workouts: (state.workouts || []).filter((w: any) => w._id !== action.payload?._id)
      };

    case 'FILTER_WORKOUTS_BY_DATE':
      // 날짜에 해당하는 운동 정보만 필터링
      const filteredWorkouts = (state.workouts || []).filter((w: any) => {
        return w.date === action.payload?.date;
      });
      return {
        workouts: filteredWorkouts
      };

    default:
      return state;
  }
};

interface WorkoutsContextProviderProps {
  children: ReactNode;
}

export const WorkoutsContextProvider = ({ children }: WorkoutsContextProviderProps) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
