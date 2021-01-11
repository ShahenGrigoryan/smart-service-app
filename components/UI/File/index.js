import React from 'react';
import {
  View, Text, Animated, TouchableOpacity,
} from 'react-native';
import { Card } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import FileStyles from './styles';
import { getDate, getTime } from '../../../utils';

const File = ({ file, onRemove, style = {} }) => {
  const downloadFile = ({ url }) => {
    WebBrowser.openBrowserAsync(url);
  };
  return (

    <Card style={{ ...FileStyles.card, ...style }}>
      <View style={{ width: '75%' }}>
        <Animated.Text style={FileStyles.name}>
          {file?.name}
        </Animated.Text>
        <Text style={FileStyles.date}>
          Дата добавления:
          {' '}
          {getDate(file?.created_at)}
          {' '}
          {getTime(file?.created_at)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => downloadFile({ url: file?.url })}
        >
          <Entypo name="download" size={26} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRemove}
        >
          <Entypo name="trash" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default File;
