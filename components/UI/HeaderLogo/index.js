import React from 'react';
import { Image } from 'react-native';
import LogoWhite from '../../../assets/images/LogoWhite.png';
import { HeaderMainText, HeaderSecText } from './styles';

const HeaderLogo = () => (
  <>
    <Image source={LogoWhite} style={{ width: 15, height: 15 }} />
    <HeaderMainText>
      SMART SERVICE
    </HeaderMainText>
    <HeaderSecText>
      Будь эффективнее
    </HeaderSecText>
  </>
);

export default HeaderLogo;
