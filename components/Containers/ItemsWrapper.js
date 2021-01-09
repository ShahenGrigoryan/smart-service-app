import React from 'react';
import { Dimensions, View } from 'react-native';

const ItemsWrapper = ({ children }) => (
  <View style={{ minHeight: Dimensions.get('window').height, height: '100%' }}>
    {children}
  </View>
);

export default ItemsWrapper;
