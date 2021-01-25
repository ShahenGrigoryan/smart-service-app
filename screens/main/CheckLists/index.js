import React from 'react';
import {
  Card, Text, View,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AppCardStyles from '../Applications/Card/styles';
import CardStyles from '../../../globalStyles/card';
import CheckListStyles from './styles';
import CheckListItem from '../../../components/CheckListItem/CheckListItem';
import PageWrapper from '../../../components/Containers/PageWrapper';

const CheckLists = ({ navigation, route }) => {
  const { data, type } = route?.params;

  const checkList = type === 'task' ? useSelector((state) => state.tasks?.current_task?.task_todos)
    : useSelector((state) => state.checks?.current_check?.entity_task_todos);

  return (

    <PageWrapper>
      <View style={CheckListStyles.header}>
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={CheckListStyles.headerTextView}>
          <Text style={CheckListStyles.headerText}>
            Чек листы
            {' '}
            {type === 'task' ? 'задачи' : type === 'application' ? 'заявки' : type === 'check' ? 'проверки' : ''}
          </Text>
          <Text style={CheckListStyles.numberText}>
            №
            {' '}
            {data.id}
          </Text>
        </View>
      </View>
      <View style={CheckListStyles.listsDescription}>
        <Text style={{ fontWeight: 'bold' }}>
          {data.description}
        </Text>
      </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Card style={{ ...CardStyles.card, paddingHorizontal: 5, paddingVertical: 5 }}>
          {checkList?.map((item) => (
            <CheckListItem key={item.id} itemInfo={item} type={type} />
          ))}
          {!checkList?.length && (
          <Text>
            Чеклистов нет
          </Text>
          )}

        </Card>
      </View>
    </PageWrapper>
  );
};
export default CheckLists;
