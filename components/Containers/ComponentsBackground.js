import React from 'react';
import { ImageBackground } from 'react-native';
import HeadFootBg from '../../assets/images/head-foot-bg.jpg';

const ComponentsBackground = ({ children }) => (
  <ImageBackground source={HeadFootBg} style={{ width: window.width }}>
    {children}
  </ImageBackground>
);

export default ComponentsBackground;
