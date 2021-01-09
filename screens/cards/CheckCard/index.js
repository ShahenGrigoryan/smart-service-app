import React, { useState, useEffect } from 'react';
import {
  View, Text, Content, Card, Textarea, Button, Toast,
} from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AppCardStyles from '../ApplicationCard/styles';
import CardStyles from '../../../globalStyles/card';
import CameraWrapper from '../../../components/Containers/CameraWrapper';
import PagesBackground from '../../../components/Containers/PagesBackground';
import { createCheckCommentStart, getCurrentCheckStart } from '../../../redux/checks/checks.actions';
import { getDate, getTime } from '../../../utils';
import Comment from '../../../components/UI/Comment/Comment';
import ItemsWrapper from '../../../components/Containers/ItemsWrapper';
import PageWrapper from '../../../components/Containers/PageWrapper';

const CheckCard = ({ navigation, route }) => {
  const { check } = route.params;
  const checkId = check.id;
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const current_check = useSelector((state) => state.checks.current_check);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [comment, setComment] = useState('');
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    console.log(image);
  };
  const isLoading = useSelector((state) => state.pages.loading);

  const createComment = () => {
    const clearComment = comment.trim();
    if (!clearComment) {
      Toast.show({
        text: 'Комментарий не может быть пустым.', type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return null;
    }
    dispatch(createCheckCommentStart({
      token,
      checkId: current_check.id,
      comment,
    }));
    setComment('');
    return null;
  };
  useEffect(() => {
    dispatch(getCurrentCheckStart(token, checkId));
  }, []);

  return (
    <CameraWrapper open={cameraOpen}>
      <PageWrapper
        onRefresh={() => dispatch(getCurrentCheckStart(token, check.id))}
      >
        <View style={{ ...AppCardStyles.header, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
          <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Button style={{ borderRadius: 10, zIndex: -99, position: 'relative' }}>
            <Text>
              Начать
            </Text>
          </Button>
        </View>
        <View style={{ ...AppCardStyles.card }}>
          <Card style={AppCardStyles.card}>
            <Text style={CardStyles.number}>
              №
              {' '}
              {current_check?.id}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {current_check?.entity?.name}
              {'\n'}
              {current_check?.entity?.address}
            </Text>
            <Text style={CardStyles.date}>
              Плановая дата проверки:
              {' '}
              {getDate(current_check?.plan)}
              {' '}
              {getTime(current_check?.plan)}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CheckLists', { type: 'check', data: current_check })}>
              <Text style={{ color: '#b849b9', marginVertical: 10, fontSize: 18 }}>
                Чек-листы
              </Text>
            </TouchableOpacity>
            <Text style={{ color: '#31afe6', fontWeight: 'bold', fontSize: 18 }}>
              Ответственные:
              {' '}
              {current_check?.assignees?.map((item, index, array) => (
                <React.Fragment key={item.id}>
                  {item?.user?.name ?? '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </React.Fragment>

              ))}
            </Text>
            <Text style={{ color: '#31afe6', fontWeight: 'bold', fontSize: 18 }}>
              От заказчика:
              {current_check?.customer?.name}
            </Text>
            {current_check?.comments?.length ? (
              <Card style={AppCardStyles.card}>
                <Text style={AppCardStyles.title}>
                  Комментарии
                </Text>
                <View style={AppCardStyles.content}>
                  {current_check?.comments?.map((item, index, array) => (
                    <Comment item={item} index={index} comments={array} key={item.id} />
                  ))}
                </View>
              </Card>
            ) : <Text>Нет комментарий</Text>}
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={pickImage}>
                  <MaterialIcons name="attach-file" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCameraOpen(true)}>
                  <MaterialIcons name="photo-camera" size={35} color="black" />
                </TouchableOpacity>
              </View>
              <Textarea
                bordered
                style={{
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  paddingVertical: 5,
                  backgroundColor: '#fff',
                  height: 120,
                  borderRadius: 10,
                }}
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              <Button
                style={{ ...AppCardStyles.addButton, marginRight: 0 }}
                onPress={createComment}
              >
                <Text>
                  Добавить
                </Text>
              </Button>
            </View>
          </Card>

        </View>
      </PageWrapper>
    </CameraWrapper>
  );
};

export default CheckCard;
