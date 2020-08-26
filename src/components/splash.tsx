import React from 'react';
import './splash.scss';

const SplashScreen: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
  return (
    <div className={`splash-screen${isLoaded ? ' loaded' : ''}`}>
      <h1>
        Alexander Ciesielski
        <br />
        ciesielski.co
      </h1>
    </div>
  );
};

export default SplashScreen;
