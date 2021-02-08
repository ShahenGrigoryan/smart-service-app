import React, { useState, useEffect } from 'react';
import {
  View, Text, Card, Button, Textarea,
  Toast, ActionSheet,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import NetInfo from '@react-native-community/netinfo';
import AppCardStyles from './styles';
import CameraWrapper from '../../../../components/Containers/CameraWrapper';
import { getAssigneeObject } from '../../../../utils';
import {
  getCurrentTicketStart,
  createTicketCommentStart,
  addTicketFileStart, changeTicketStatusStart,
} from '../../../../redux/tickets/tickets.actions';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import Comment from '../../../../components/UI/Comment/Comment';
import { addFileToQue } from '../../../../redux/files_que/files_que.reducer';

const TicketCard = ({ navigation, route }) => {
  const { ticket } = route.params;
  const [comment, setComment] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);

  const current_ticket = useSelector((state) => state.tickets.current_ticket);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const placeFileInQue = (file) => {
    dispatch(addFileToQue({ section_name: 'tickets', file, id: current_ticket?.id }));
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
        dispatch(addTicketFileStart({ file, ticketId: current_ticket?.id, token }));
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
      console.log(e);
    }
  };
  useEffect(() => {
    dispatch(getCurrentTicketStart(token, ticket.id));
  }, []);
  const changeTicketStatus = async (index) => {
    dispatch(changeTicketStatusStart({
      token,
      ticketId: current_ticket?.id,
      status: current_ticket?.statuses?.[index],
    }));
  };

  const createComment = () => {
    const clearComment = comment.trim();
    if (!clearComment) {
      Toast.show({
        text: 'Комментарий не может быть пустым.', type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return null;
    }
    dispatch(createTicketCommentStart({
      token,
      ticketId: ticket.id,
      comment,
    }));
    setComment('');
    return null;
  };

  return (
    <CameraWrapper onAdd={addFile} open={cameraOpen}>
      <PageWrapper
        onRefresh={() => dispatch(getCurrentTicketStart(token, ticket.id))}
      >
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{
          ...AppCardStyles.header, justifyContent: 'center', alignItems: 'center', paddingRight: 20, flexWrap: 'wrap', marginHorizontal: 40,
        }}
        >

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>
            Статус:
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => ActionSheet.show(
              {
                options: (current_ticket?.statuses ?? [])?.map((item) => item.name),
                cancelButtonIndex: 4,
                destructiveButtonIndex: 3,
              },
              (buttonIndex) => {
                if (buttonIndex !== 4) {
                  changeTicketStatus(buttonIndex);
                }
              },
            )}
          >
            <Text style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: 'grey',
              color: '#fff',
              borderRadius: 5,
            }}
            >
              {current_ticket?.status?.name}
            </Text>

          </TouchableOpacity>
        </View>

        <View style={{ ...AppCardStyles.card }}>
          <Card style={AppCardStyles.card}>
            <Text style={AppCardStyles.title}>
              Тема:
            </Text>
            <Text style={AppCardStyles.content}>
              {ticket.subject}
            </Text>
          </Card>
          <Card style={AppCardStyles.card}>
            <Text style={AppCardStyles.title}>
              Описание:
            </Text>
            <Text style={AppCardStyles.content.color}>
              {ticket.description}
            </Text>
          </Card>
          <Card style={AppCardStyles.card}>
            <Text>
              Инициатор:
              {' '}
              {ticket?.user?.name || ticket?.member?.name || '-'}
            </Text>
            <Text>
              Наблюдатель:
              {' '}
              {' '}
              {getAssigneeObject('supervisor', current_ticket?.assignees)?.map((item, index, array) => (
                <Text key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </Text>
              ))}
            </Text>
            <Text>
              Исполнитель:
              {' '}
              {getAssigneeObject('organisation', current_ticket?.assignees)?.map((item, index, array) => (
                <Text key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </Text>
              ))}
            </Text>
            <Text>
              От заказчика:
              {' '}
              {getAssigneeObject('customer', current_ticket?.assignees)?.map((item, index, array) => (
                <Text key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </Text>
              ))}
            </Text>
          </Card>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 3,
            marginVertical: 10,
          }}
          />
          {current_ticket?.comments?.length ? (
            <Card style={AppCardStyles.card}>
              <Text style={AppCardStyles.title}>
                Комментарии
              </Text>
              <View style={AppCardStyles.content}>
                {current_ticket?.comments?.map((item, index, array) => (
                  <Comment item={item} index={index} comments={array} key={item.id} />
                ))}
              </View>
            </Card>
          ) : <Text>Нет комментарий</Text>}
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 23,
          marginVertical: 10,
        }}
        >
          <Button
            onPress={() => navigation.navigate('ApplicationFiles',
              { data: current_ticket })}
            style={{ borderRadius: 10 }}
          >
            <Text>Файлы</Text>
          </Button>
        </View>
        <View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
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
              borderRadius: 10,
              paddingHorizontal: 10,
              marginHorizontal: 20,
              marginBottom: 10,
              paddingVertical: 5,
              backgroundColor: '#fff',
              height: 120,

            }}
            value={comment}
            onChangeText={(text) => {
              setComment(text);
            }}
          />
          <Button
            style={AppCardStyles.addButton}
            onPress={createComment}
          >
            <Text>
              Добавить
            </Text>
          </Button>
        </View>
      </PageWrapper>
    </CameraWrapper>

  );
};

export default TicketCard;
