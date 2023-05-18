import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Puff color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Loader;