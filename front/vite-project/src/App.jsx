import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import About from './views/about/About';
import AppointmentForm from './views/appointmentform/AppointmentForm';
import Contact from './views/contact/Contact';
import Home from './views/home/Home';
import Landing from './views/landing/Landing';
import Login from './views/login/Login';
import Appointments from './views/misTurnos/MisTurnos';
import Register from './views/register/Register';
import ErrorPage from "./views/errorPage/ErrorPage";

function App() {

  const { pathname } = useLocation();
  return (
    <div>
      {
        pathname !== "/" && pathname !== "/login" && pathname !== "/register" ? (
          <Navbar />
        ) : null
      }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointmentform" element={<AppointmentForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
