import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ViewChart from './Components/ViewChart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';

function App() {
  return (
    <div className="App">
      <main className='max-w-screen-2xl mx-auto lg:px-16 lg:py-8 px-4 py-12'>
        <div className='flex justify-center'>
          <span className='text-3xl font-semibold text-gray-800'>Data viz Dashboard</span>
        </div>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/view-chart' element={<ViewChart />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
