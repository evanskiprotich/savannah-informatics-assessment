import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Photo Gallery App | Welcome</title>
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Photo Gallery App
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Explore users, albums, and photos from JSONPlaceholder API
        </p>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            {user ? (
              <Link
                to="/home"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">Features</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-blue-600">Users</h4>
              <p className="mt-1 text-sm text-gray-600">
                Browse all users and their albums
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-blue-600">Albums</h4>
              <p className="mt-1 text-sm text-gray-600">
                View photo albums for each user
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-blue-600">Photos</h4>
              <p className="mt-1 text-sm text-gray-600">
                See high-quality photos with details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;