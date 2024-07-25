import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';

// WorkoutsContext에서 사용되는 타입
interface WorkoutsContextType {
  workouts: any[] | null;
  dispatch: React.Dispatch<any>;
}

// useWorkoutsContext 훅 정의
export const useWorkoutsContext = () => {
  const context = useContext<WorkoutsContextType | undefined>(WorkoutsContext);

  if (context === undefined) {
    throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
  }

  return context;
};