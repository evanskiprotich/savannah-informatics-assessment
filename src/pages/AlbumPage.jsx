import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAlbumById, fetchAlbumPhotos } from '../api/jsonPlaceholder';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumData, photosData] = await Promise.all([
          fetchAlbumById(albumId),
          fetchAlbumPhotos(albumId),
        ]);
        setAlbum(albumData);
        setPhotos(photosData);
      } catch (error) {
        toast.error('Failed to load album data. Please try again.');
        console.error('Error fetching album data:', error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!album) {
    return null;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Photo Gallery App | {album.title}</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {album.title}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Album ID: {album.id}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/users/${album.userId}`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Back to User
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Photos ({photos.length})</h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => navigate(`/photos/${photo.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;