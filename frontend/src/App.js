import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components
import Home from './pages/Home';
import Calender from './pages/Calender';
import Navbar from './components/Navbar';
import WorkoutByDate from './pages/WorkoutByDate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route path='/calender' element={<Calender />} />
            <Route path='/:date' element={<WorkoutByDate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
