import React, { useState, useEffect } from 'react';
import {
  View, Text, Card, Button, Textarea, ActionSheet,
  Toast,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import NetInfo from '@react-native-community/netinfo';
import AppCardStyles from '../../Applications/Card/styles';
import CameraWrapper from '../../../../components/Containers/CameraWrapper';
import CardStyles from '../../../../globalStyles/card';
import { getAssigneeObject, getDate, getTime } from '../../../../utils';
import {
  getCurrentTaskStart,
  createTaskCommentStart,
  updateTaskStart,
  addTaskFileStart,
} from '../../../../redux/tasks/tasks.actions';
import Comment from '../../../../components/UI/Comment/Comment';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import { addFileToQue, uploadFilesInQue } from '../../../../redux/files_que/files_que.reducer';

const TaskCard = ({ navigation, route }) => {
  const { task } = route.params;
  const [comment, setComment] = useState('');

  const current_task = useSelector((state) => state.tasks.current_task);
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
  const [cameraOpen, setCameraOpen] = useState(false);

  const placeFileInQue = (file) => {
    dispatch(addFileToQue({ section_name: 'tasks', file, id: current_task?.id }));
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
        dispatch(addTaskFileStart({ file, taskId: current_task?.id, token }));
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

  useEffect(() => {
    dispatch(getCurrentTaskStart(token, task.id));
  }, []);
  useEffect(() => {
    statuses.forEach((item) => {
      if (item.name === current_task?.status) {
        setStatus(item);
      }
    });
  }, [current_task]);

  const createComment = () => {
    const clearComment = comment.trim();
    if (!clearComment) {
      Toast.show({
        text: 'Комментарий не может быть пустым.', type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return null;
    }
    dispatch(createTaskCommentStart({
      token,
      taskId: task.id,
      comment,
    }));
    setComment('');
    return null;
  };
  const updateTask = ({ status }) => {
    const body = {
      task: {
        due_by: task.due_by,
        status: status.name,
        subject: task.subject,
        description: task.description,
        amount: task.amount,
      },
    };
    dispatch(updateTaskStart({ token, body, id: task.id }));
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
        onRefresh={() => dispatch(getCurrentTaskStart(token, task.id))}
      >
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{
          ...AppCardStyles.header, justifyContent: 'center', alignItems: 'center', paddingRight: 20,
        }}
        >

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>
            Статус:
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => ActionSheet.show(
              {
                options: statuses,
                cancelButtonIndex: 4,
                destructiveButtonIndex: 3,
              },
              (buttonIndex) => {
                if (buttonIndex !== 4) {
                  setStatus(statuses[buttonIndex]);
                  updateTask({ status: statuses[buttonIndex] });
                }
              },
            )}
          >
            <Text style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: status.color,
              color: '#fff',
              borderRadius: 5,
            }}
            >
              {status.text}
            </Text>

          </TouchableOpacity>
        </View>
        <View style={AppCardStyles.card}>
          <Text style={CardStyles.date}>
            Выполнить до:
            {' '}
            {getDate(task.due_by)}
            {' '}
            до
            {' '}
            {getTime(task.due_by)}
          </Text>
        </View>

        <View style={{ ...AppCardStyles.card }}>
          <Card style={AppCardStyles.card}>
            <Text style={AppCardStyles.title}>
              Тема задачи:
            </Text>
            <Text style={AppCardStyles.content}>
              {task.subject}
            </Text>
          </Card>
          <Card style={AppCardStyles.card}>
            <Text style={AppCardStyles.title}>
              Описание:
            </Text>
            <Text style={AppCardStyles.content.color}>
              {task.description}
            </Text>
          </Card>
          <Card style={AppCardStyles.card}>
            <Text>
              Инициатор:
              {' '}
              {task?.user?.name || task?.member?.name || '-'}
            </Text>
            <Text>
              Наблюдатель:
              {' '}
              {getAssigneeObject('supervisor', current_task?.assignees)?.map((item, index, array) => (
                <React.Fragment key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </React.Fragment>
              ))}
            </Text>
            <Text style={{ color: 'red' }}>
              Ответственные:
              {' '}
              {getAssigneeObject('organisation', current_task?.assignees)?.map((item, index, array) => (
                <React.Fragment key={item.id}>
                  {item?.user?.name || item?.member?.name || '-'}
                  {index !== array.length - 1 ? ', ' : ''}
                  {' '}
                </React.Fragment>
              ))}
            </Text>
          </Card>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 3,
            marginVertical: 10,
          }}
          >
            <Button
              onPress={() => navigation.navigate('TaskFiles',
                { data: task })}
              style={{ borderRadius: 10 }}
            >
              <Text>Файлы</Text>
            </Button>
            <Button
              style={{ borderRadius: 10 }}
              onPress={() => navigation.navigate('CheckLists',
                { data: task, checkList: current_task?.task_todos, type: 'task' })}
            >
              <Text>Чек листы</Text>
            </Button>
          </View>
          {current_task?.comments?.length ? (
            <Card style={AppCardStyles.card}>
              <Text style={AppCardStyles.title}>
                Комментарии
              </Text>
              <View style={AppCardStyles.content}>
                {current_task?.comments?.map((item, index, array) => (
                  <Comment item={item} index={index} comments={array} key={item.id} />
                ))}
              </View>
            </Card>
          ) : <Text>Нет комментарий</Text>}
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

export default TaskCard;
