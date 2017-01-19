import React from 'react';
import Spinner from './spinner';

const Loader = () => {
  return (
    <div className="loader-wrapper valign-wrapper center-align">
      <div className="valign">
        <div className="preloader-wrapper big active">
          <Spinner />
        </div>
      </div>
    </div>
  )
}

export default Loader
