import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/calender.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';

// HTMLDivElement 타입이 있는지 확인합니다.
const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}