import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Ponudba from "./pages/Ponudba";
import Urnik from "./pages/Urnik";
import Kalkulator from "./pages/Kalkulator";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/ponudba" />} />
        <Route path="/ponudba" element={<Ponudba />} />
        <Route path="/urnik" element={<Urnik />} />
        <Route path="/proteinski-kalkulator" element={<Kalkulator />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
