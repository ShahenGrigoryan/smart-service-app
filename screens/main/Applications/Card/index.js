import React, { useState, useEffect } from 'react';
import {
  View, Text, Content, Card, Button, Textarea,
  Toast,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import AppCardStyles from './styles';
import CameraWrapper from '../../../../components/Containers/CameraWrapper';
import { getAssigneeObject } from '../../../../utils';
import {
  getCurrentTicketStart,
  createTicketCommentStart,
  addTicketFileStart,
} from '../../../../redux/tickets/tickets.actions';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import Comment from '../../../../components/UI/Comment/Comment';

const TicketCard = ({ navigation, route }) => {
  const { ticket } = route.params;
  const [comment, setComment] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);

  const current_ticket = useSelector((state) => state.tickets.current_ticket);
  const token = useSelector((state) => state.user.token);
  const statuses = [
    { text: 'Новая', name: 'pending', color: '#a8a8a8' },
    { text: 'В работе', name: 'processing', color: '#ef820d' },
    { text: 'Выполнен', name: 'finished', color: '#05b41c' },
    { text: 'Отменён', name: 'canceled', color: '#ec4034' },
    { text: 'Закрыть' },
  ];
  const dispatch = useDispatch();
  const [status, setStatus] = useState(statuses[0]);
  const addFile = (file) => {
    if (cameraOpen) {
      setCameraOpen(false);
    }
    dispatch(addTicketFileStart({ file, ticketId: current_ticket?.id, token }));
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
  useEffect(() => {
    dispatch(getCurrentTicketStart(token, ticket.id));
  }, []);
  useEffect(() => {
    statuses.forEach((item) => {
      if (item.name === current_ticket?.status) {
        setStatus(item);
      }
    });
  }, [current_ticket]);

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
          >
            <Text style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: status.color,
              color: '#fff',
              borderRadius: 5,
            }}
            >
              {ticket?.status?.name}
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
              {current_ticket?.assignees?.map((item, index, array) => (
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
              {current_ticket?.assignees?.map((item, index, array) => (
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
              {current_ticket?.assignees?.map((item, index, array) => (
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
