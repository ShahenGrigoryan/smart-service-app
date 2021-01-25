import React, { useState, useEffect } from 'react';
import {
  View, Text, Card, Textarea, Button, Toast,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import NetInfo from '@react-native-community/netinfo';
import AppCardStyles from '../../Applications/Card/styles';
import CardStyles from '../../../../globalStyles/card';
import CameraWrapper from '../../../../components/Containers/CameraWrapper';
import {
  addCheckFileStart,
  createCheckCommentStart,
  getCurrentCheckStart,
} from '../../../../redux/checks/checks.actions';
import { getAssigneeObject, getDate, getTime } from '../../../../utils';
import Comment from '../../../../components/UI/Comment/Comment';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import { changeCheckStatus } from '../../../../api/checks';
import CheckStatusButton from '../../../../components/UI/CheckStatusButton';
import { addFileToQue, uploadFilesInQue } from '../../../../redux/files_que/files_que.reducer';

const CheckCard = ({ navigation, route }) => {
  const { check } = route.params;
  const checkId = check.id;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const current_check = useSelector((state) => state.checks.current_check);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [comment, setComment] = useState('');

  const placeFileInQue = (file) => {
    dispatch(addFileToQue({ section_name: 'entity_tasks', file, id: current_check?.id }));
    Toast.show({
      text: 'Нет интернета. Файл добавлен в очередь', type: 'warning', position: 'top', textStyle: { textAlign: 'center' },
    });
  };

  const addFile = (file) => {
    if (cameraOpen) {
      setCameraOpen(false);
    }
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(addCheckFileStart({ file, checkId: current_check?.id, token }));
      } else {
        placeFileInQue(file);
      }
    });
  };
  const pickFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (file.type === 'success') {
        addFile(file);
      }
    } catch (e) {
      console.log('error==', e);
    }
  };
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
  const [status, setStatus] = useState(current_check?.status);
  useEffect(() => {
    setStatus(current_check?.status);
  }, [current_check]);
  const changeStatus = async () => {
    try {
      const newStatus = current_check?.status === 'processing'
        ? { status: 'finished' } : current_check?.status === 'pending'
          ? { status: 'processing' } : null;
      await changeCheckStatus({
        token,
        checkId: current_check.id,
        status: newStatus,
      });
      setStatus(newStatus.status);
    } catch (e) {
      Toast.show({ text: e.message, type: 'danger', position: 'top' });
    }
  };
  const files_in_que = useSelector((state) => state.files_in_que);
  useEffect(() => {
    if (files_in_que?.tasks?.length
        || files_in_que?.entity_tasks?.length || files_in_que?.tickets?.length) {
      dispatch(uploadFilesInQue({ files_in_que, token }));
    }
  }, []);
  return (
    <CameraWrapper onAdd={addFile} open={cameraOpen}>
      <PageWrapper
        onRefresh={() => dispatch(getCurrentCheckStart(token, check.id))}
      >
        <View style={{
          ...AppCardStyles.header, justifyContent: 'flex-end', flexWrap: 'wrap', paddingHorizontal: 20,
        }}
        >
          <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <CheckStatusButton status={status} changeStatus={changeStatus} />
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

            <Text style={{ color: '#31afe6', fontWeight: 'bold', fontSize: 18 }}>
              Ответственные:
              {' '}
              {getAssigneeObject('organisation', current_check?.assignees)?.map((item, index, array) => (
                <React.Fragment key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </React.Fragment>
              ))}
            </Text>
            <Text style={{ color: '#31afe6', fontWeight: 'bold', fontSize: 18 }}>
              От заказчика:
              {' '}
              {getAssigneeObject('customer', current_check?.assignees)?.map((item, index, array) => (
                <React.Fragment key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </React.Fragment>
              ))}
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginVertical: 10,
            }}
            >
              <Button
                onPress={() => navigation.navigate('CheckFiles',
                  { data: current_check })}
                style={{ borderRadius: 10 }}
              >
                <Text>Файлы</Text>
              </Button>
              <Button
                style={{ borderRadius: 10 }}
                onPress={() => navigation.navigate('CheckLists', { type: 'check', data: current_check })}
              >
                <Text>Чек листы</Text>
              </Button>
            </View>
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
                <TouchableOpacity onPress={pickFile}>
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
