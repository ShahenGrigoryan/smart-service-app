import React, { useState, useEffect } from 'react';
import {
  View, Text, Content, Card, Button, Textarea,
  Toast,
} from 'native-base';
import {
  TouchableOpacity, Image, RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AppCardStyles from './styles';
import CameraWrapper from '../../../components/Containers/CameraWrapper';
import { getTime, getAssigneeObject } from '../../../utils';
import { getCurrentTicketStart, createTicketCommentStart } from '../../../redux/tickets/tickets.actions';
import PageWrapper from '../../../components/Containers/PageWrapper';

const TicketCard = ({ navigation, route }) => {
  const { ticket } = route.params;
  const [comment, setComment] = useState('');

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
  const isLoading = useSelector((state) => state.pages.loading);
  const [image, setImage] = useState('');
  const [status, setStatus] = useState(statuses[0]);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(image);
    if (!result.cancelled) {
      setImage(result.uri);
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
  const [cameraOpen, setCameraOpen] = useState(false);

  const createComment = () => {
    const clearComment = comment.trim();
    if (!clearComment) {
      Toast.show({
        text: 'Комментарий не может быть пустым.', type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
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
    <CameraWrapper open={cameraOpen}>
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
              {ticket?.user?.name ?? '-'}
            </Text>
            <Text>
              Наблюдатель:
              {' '}
              {getAssigneeObject('supervisor', current_ticket?.assignees)?.user?.name}
            </Text>
            <Text>
              Исполнитель:
              {getAssigneeObject('organization', current_ticket?.assignees)?.user?.name ?? '-'}
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
                  <View
                    key={item.id}
                    style={{
                      position: 'relative',
                      paddingVertical: 15,
                      marginVertical: 3,
                      paddingHorizontal: 5,
                      borderColor: AppCardStyles.content.color,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderBottomLeftRadius: index !== array.length - 1
                                && array.length > 1 ? 0 : 10,
                      borderTopLeftRadius: index !== 0 ? 0 : 10,
                      borderTopRightRadius: index !== 0 ? 0 : 10,
                      borderBottomEndRadius: index !== array.length - 1 ? 0 : 10,
                    }}
                  >
                    <View style={{ position: 'relative' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Image
                          source={{
                            uri: item?.user?.avatar
                              ? item.user.avatar
                              : 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png',
                          }}
                          style={{
                            width: 20, height: 20, borderRadius: 50, marginRight: 10,
                          }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.user?.name ? item.user.name : 'Нет имени'}
                        </Text>
                      </View>
                    </View>
                    <Text style={{
                      color: '#a8a8a8', fontSize: 13, position: 'absolute', top: 3, right: 5,
                    }}
                    >
                      {getTime(item.created_at)}
                    </Text>

                    <Text key={item.id}>{item.comment}</Text>
                  </View>
                ))}
              </View>
            </Card>
          ) : <Text>Нет комментарий</Text>}
        </View>

        <View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
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
