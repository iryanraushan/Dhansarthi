import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { HiLogout } from 'react-icons/hi';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/logo.svg" alt="" className="w-10 h-10"/>
          <h1 className="text-white font-bold text-xl">Dhan Saarthi</h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden md:block">
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
          >
            <HiLogout className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
