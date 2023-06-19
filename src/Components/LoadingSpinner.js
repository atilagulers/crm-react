import React, {useEffect} from 'react';

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;

//<div className="spinner-grow text-primary" role="status">
//  <span className="sr-only">Loading...</span>
//</div>;
