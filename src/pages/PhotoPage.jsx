import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoById, updatePhotoTitle } from '../api/jsonPlaceholder';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const PhotoPage = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoData = await fetchPhotoById(photoId);
        setPhoto(photoData);
        setNewTitle(photoData.title);
      } catch (error) {
        toast.error('Failed to load photo. Please try again.');
        console.error('Error fetching photo:', error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [photoId, navigate]);

  const handleUpdateTitle = async () => {
    try {
      setLoading(true);
      const updatedPhoto = await updatePhotoTitle(photo.id, newTitle);
      setPhoto(updatedPhoto);
      toast.success('Photo title updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update photo title. Please try again.');
      console.error('Error updating photo title:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!photo) {
    return null;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Photo Gallery App | {photo.title}</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800">Photo Details</h3>
            <button
              onClick={() => navigate(`/albums/${photo.albumId}`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Back to Album
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img
                src={photo.url}
                alt={photo.title}
                className="rounded-lg w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white shadow-sm overflow-hidden rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Photo Information
                </h3>
              </div>
              <div className="px-6 py-5">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Album ID
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {photo.albumId}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Photo ID
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {photo.id}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    {editing ? (
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                        <button
                          onClick={handleUpdateTitle}
                          disabled={loading}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditing(false);
                            setNewTitle(photo.title);
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <dd className="mt-1 text-sm text-gray-900 flex justify-between items-center bg-gray-50 p-3 rounded-md">
                        <span className="font-medium">{photo.title}</span>
                        <button
                          onClick={() => setEditing(true)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          Edit Title
                        </button>
                      </dd>
                    )}
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;