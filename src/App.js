import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DishesPage from './pages/dishesPage';
import LoginPage from './pages/loginpage';
import PollResultPage from './pages/pollResult';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
       <BrowserRouter> 
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dishes" element={<DishesPage/>} />
          <Route path="/pollResult" element={<PollResultPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}
export default App;
