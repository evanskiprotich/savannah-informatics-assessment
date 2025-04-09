import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Photo Gallery
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/home"
                  className="border-transparent text-gray-900 hover:text-blue-600 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <button
                  onClick={onLogout}
                  className="text-gray-900 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Sign out
                </button>
                <span className="text-gray-900 text-sm font-medium">
                  Welcome, {user.name}
                </span>
              </>
            ) : (
              <Link
                to="/login"
                className="border-transparent text-gray-900 hover:text-blue-600 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired
};

export default Navbar;