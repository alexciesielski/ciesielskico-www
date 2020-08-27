import React from 'react';
import './loading-spinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
