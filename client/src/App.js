import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';

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
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
