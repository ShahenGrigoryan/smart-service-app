import React, { useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';
import styled from 'styled-components';
import BgImage from '../../../assets/images/head-foot-bg.jpg';
import Logo from '../../../assets/images/logo.png';

const Greeting = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);

  return (
    <View style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: Dimensions.get('window').height, zIndex: 99,
    }}
    >
      <Image
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        source={BgImage}
      />
      <GreetingView>
        <Image source={Logo} style={{ width: 40, height: 40 }} />
        <GreetingMainText>
          SMART SERVICE
        </GreetingMainText>
        <GreetingSecText>
          Будь эффективнее
        </GreetingSecText>

      </GreetingView>
    </View>
  );
};

const GreetingView = styled.View`
    width:100%;
    height:${Dimensions.get('window').height}px;
    justify-content:center;
    align-items:center
`;
const GreetingMainText = styled.Text`
    font-size:25px;
    color:#5c5c5c;
    margin-top:3px;
    margin-bottom:1px;
    font-weight:bold;
`;

const GreetingSecText = styled.Text`
    font-size:16px;
    letter-spacing:2px;
    color:#5c5c5c
`;

export default Greeting;
