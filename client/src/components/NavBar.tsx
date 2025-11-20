import { User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { token, logout } = useAuth();

  const linkClass = (path: string) =>
    `font-semibold border-b-2 pb-1 ${
      location.pathname === path
        ? "border-indigo-600 text-indigo-600"
        : "border-transparent hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex-1 flex justify-center space-x-10">
          <Link to="/ponudba" className={linkClass("/ponudba")}>Ponudba</Link>
          <Link to="/urnik" className={linkClass("/urnik")}>Urnik</Link>
          <Link to="/proteinski-kalkulator" className={linkClass("/proteinski-kalkulator")}>Proteinski kalkulator</Link>
          {token && (
            <Link to="/my-profile" className={linkClass("/my-profile")}>
              Moj profil
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!token && (
            <>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 border border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-50 transition space-x-2 font-semibold"
              >
                <User className="w-5 h-5" />
                <span>Prijava</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition space-x-2 font-semibold"
              >
                <User className="w-5 h-5" />
                <span>Registracija</span>
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition space-x-2 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>Odjava</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
