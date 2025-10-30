import { User, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Centered nav links */}
        <div className="flex-1 flex justify-center space-x-10">
          <Link
            to="/ponudba"
            className={`font-semibold border-b-2 pb-1 ${
              location.pathname === "/ponudba"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent hover:text-indigo-600"
            }`}
          >
            Ponudba
          </Link>
          <Link
            to="/urnik"
            className={`font-semibold border-b-2 pb-1 ${
              location.pathname === "/urnik"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent hover:text-indigo-600"
            }`}
          >
            Urnik
          </Link>
          <Link
            to="/proteinski-kalkulator"
            className={`font-semibold border-b-2 pb-1 ${
              location.pathname === "/proteinski-kalkulator"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent hover:text-indigo-600"
            }`}
          >
            Proteinski kalkulator
          </Link>
        </div>

        {/* Right side buttons with icons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 border border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-50 transition space-x-2">
            <User className="w-5 h-5" />
            <span>Prijava</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Registracija</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
