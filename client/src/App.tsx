import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Ponudba from "./pages/Ponudba";
import Urnik from "./pages/Urnik";
import Kalkulator from "./pages/Kalkulator";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/ponudba" />} />
        <Route path="/ponudba" element={<Ponudba />} />
        <Route path="/urnik" element={<Urnik />} />
        <Route path="/proteinski-kalkulator" element={<Kalkulator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
