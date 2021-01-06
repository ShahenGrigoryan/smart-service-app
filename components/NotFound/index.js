import React from 'react';
import {
  View, Image, Text, Dimensions,
} from 'react-native';
import NotFoundIcon from '../../assets/images/not-found.png';

const NotFound = () => (
  <View style={{
    justifyContent: 'center', alignItems: 'center', width: '100%', height: Dimensions.get('window').height - 140,
  }}
  >
    <Image style={{ width: 60, height: 60, marginBottom: 10 }} source={NotFoundIcon} />
    <Text style={{ color: '#F32424', fontSize: 18 }}>
      Ничего не найдено
    </Text>
  </View>
);

export default NotFound;
