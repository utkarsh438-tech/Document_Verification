import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const Header = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Document Verifier
          </Link>
          <div className="flex gap-4">
            <Link to="/upload" className="text-gray-600 hover:text-blue-600">
              Upload
            </Link>
            <Link to="/history" className="text-gray-600 hover:text-blue-600">
              History
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-blue-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header