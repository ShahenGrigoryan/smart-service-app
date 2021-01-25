import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import PagesBg from '../../assets/images/pagesBg.jpg';
import Loader from '../UI/Loader';

const PagesBackground = ({ children }) => {
  const isLoading = useSelector((state) => state.pages?.loading);

  return (
    <>
      <Image
        source={PagesBg}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          top: 0,
          right: 0,
          bottom: 0,
          height: '100%',
        }}
      />
      {isLoading && <Loader noIcon />}
      {children}
    </>
  );
};

export default PagesBackground;
