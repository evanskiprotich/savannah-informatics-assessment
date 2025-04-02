const PhotoCard = ({ photo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">
          {photo.title}
        </h3>
      </div>
    </div>
  );
};

export default PhotoCard;