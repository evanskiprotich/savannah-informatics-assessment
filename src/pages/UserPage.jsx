import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, fetchUserAlbums } from '../api/jsonPlaceholder';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, albumsData] = await Promise.all([
          fetchUserById(userId),
          fetchUserAlbums(userId),
        ]);
        setUser(userData);
        setAlbums(albumsData);
      } catch (error) {
        toast.error('Failed to load user data. Please try again.');
        console.error('Error fetching user data:', error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Photo Gallery App | {user.name}</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {user.name}'s Albums
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Username:</span> {user.username} | <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Back to Users
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            {albums.length} {albums.length === 1 ? 'Album' : 'Albums'}
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => navigate(`/albums/${album.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;