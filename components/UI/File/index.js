import React from 'react';
import {
  View, Text, Animated, TouchableOpacity,
} from 'react-native';
import { Card, Toast } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import FileStyles from './styles';
import { removeTaskFileStart } from '../../../redux/tasks/tasks.actions';
import { getDate, getTime } from '../../../utils';

const File = ({ file, taskId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    }
  };
  const downloadFile = ({ url, name }) => {
    console.log('url', url);
    console.log('name', name);
    const fileUri = `${FileSystem.documentDirectory}${name}`;
    FileSystem.downloadAsync(url, fileUri)
      .then(({ uri }) => {
        saveFile(uri);
      })
      .catch((error) => {
        Toast.show({
          type: 'danger', position: 'top', style: { top: 60 }, text: 'Что-то пошло не так!',
        });
      });
  };
  return (

    <Card style={FileStyles.card}>
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
          onPress={() => downloadFile({ url: file?.url, name: file?.name })}
        >
          <Entypo name="download" size={26} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(removeTaskFileStart({ fileId: file?.id, token, taskId }))}
        >
          <Entypo name="trash" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default File;
