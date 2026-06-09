import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-white font-bold text-xl">
        BodyMap <span className="text-teal-400">3D</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
          Dashboard
        </Link>
        <span className="text-gray-600 text-sm">|</span>
        <span className="text-gray-400 text-sm">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}