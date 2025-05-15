import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Create from './Components/Create';
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Dashbord from "./Components/Home";
import Income from "./Components/Income";
import Expenses from "./Components/Expenses";
import UserProvider from "./Contexts/Usercontex"
import Overview from "./Components/Overview";

function AppContent() {
  const location = useLocation();
  const hideNavbarByRout = ['/login', '/'];

  return (
    <>
      <UserProvider>
        {!hideNavbarByRout.includes(location.pathname) && <Navbar />}
        {/* //hideNavbarByRout is an array which check if the hideNavbarByRout array does not  contain "/" and "/login" route  //it  will show Navbar */}


        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashbord />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/overview" element={<Overview/>} />
        </Routes>
      </UserProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
