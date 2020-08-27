import React from 'react';
import LoadingSpinner from './loading-spinner';
import './splash.scss';

const SplashScreen: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
  return (
    <div className={`splash-screen${isLoaded ? ' loaded' : ''}`}>
      <h1>Alexander Ciesielski</h1>
      <h1>ciesielski.co</h1>
      <LoadingSpinner></LoadingSpinner>
    </div>
  );
};

export default SplashScreen;
