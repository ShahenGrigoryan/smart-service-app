import React from 'react';
import {
  View, Card, Text, Radio,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import TaskStyles from './styles';
import * as PageActions from '../../redux/pages/pages.actions';
import { getDate, getTime } from '../../utils';

const Task = ({ navigation, taskInfo }) => {
  const color = '#fff';
  const dispatch = useDispatch();
  const goTo = () => {
    navigation.navigate('TaskCard', { task: taskInfo });
    dispatch(PageActions.changeRoute('TaskCard'));
  };
  return (

    <View style={TaskStyles.root}>
      <TouchableOpacity activeOpacity={0.5} style={TaskStyles.cardWrapper} onPress={() => goTo()}>
        <Card style={{ ...TaskStyles.card, backgroundColor: color, borderRadius: 10 }}>
          <Text style={TaskStyles.cardTime}>
            {getTime(taskInfo?.created_at)}
          </Text>
          <View style={TaskStyles.radio}>
            <Radio />
          </View>
          <View>
            <Text style={TaskStyles.cardText}>
              {taskInfo?.subject}
            </Text>
            <Text style={TaskStyles.deadline}>
              Срок:
              {' '}
              {getDate(taskInfo?.due_by)}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>

    </View>
  );
};

export default Task;
