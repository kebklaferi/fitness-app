import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <a href="#o-nas" className="hover:text-indigo-600 transition font-semibold">
            O nas
          </a>
        </div>

        {/* Right side: social icons */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-indigo-600 transition">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            <FaFacebookF className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
