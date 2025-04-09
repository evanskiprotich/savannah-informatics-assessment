import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, fetchAlbums } from '../api/jsonPlaceholder';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, albumsData] = await Promise.all([
          fetchUsers(),
          fetchAlbums(),
        ]);
        setUsers(usersData);
        setAlbums(albumsData);
      } catch (error) {
        toast.error('Failed to load data. Please try again.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserAlbumCount = (userId) => {
    return albums.filter((album) => album.userId === userId).length;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Photo Gallery App | Users</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800">Users Directory</h3>
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md">
              Showing <span className="font-semibold text-blue-700">{users.length}</span> users
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              albumCount={getUserAlbumCount(user.id)}
              onClick={() => navigate(`/users/${user.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;