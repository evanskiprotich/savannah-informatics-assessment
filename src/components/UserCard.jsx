const UserCard = ({ user, albumCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary-500 rounded-md p-3">
            <svg
              className="h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {user.name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {user.username}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{albumCount}</span>{' '}
            Albums
          </div>
          <div className="text-sm text-gray-500 truncate">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;