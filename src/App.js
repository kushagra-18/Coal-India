import './App.css';
import { Route, Routes,HashRouter } from "react-router-dom";
import Home from './pages/Home';
import HeaderNavbar from './components/HeaderNavbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
       <HeaderNavbar></HeaderNavbar>
        <Routes>
          <Route path="/" element={<Home/>} />     
          <Route path="/register" element={<RegisterPage/>} />  
          <Route path="/login" element={<LoginPage/>} />   
        </Routes>
    </div>
  );
}

export default App;
