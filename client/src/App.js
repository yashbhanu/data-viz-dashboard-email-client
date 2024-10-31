import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ViewChart from './Components/ViewChart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <main className='max-w-screen-2xl mx-auto px-16 py-8'>
        <div className='flex justify-center'>
          <span className='text-3xl font-semibold text-gray-800'>Data viz Dashboard</span>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/view-chart' element={<ViewChart />} />
          </Routes>
        </BrowserRouter>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
