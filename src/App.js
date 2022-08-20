import "./App.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import HeaderNavbar from "./components/HeaderNavbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VehicleData from "./pages/VehicleData";
import AllData from "./pages/AllData";
import AuthContext, { AuthContextProvider } from "./storage/auth-context";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <HeaderNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/data-all" element={<AllData />} />
          <Route path='/vehicle-data' element={<VehicleData />} />
        
          {/* 404 page */}
          <Route
            path="*"
            element={
              <div>
                <center>
                  <h1>404</h1>
                  <h2>Page not found</h2>
                </center>
              </div>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
