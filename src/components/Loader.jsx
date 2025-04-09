import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ small = false }) => {
  return (
    <div className={`flex justify-center items-center ${small ? '' : 'min-h-screen'}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${small ? 'h-5 w-5' : 'h-16 w-16'
          }`}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  small: PropTypes.bool
};

export default Loader;