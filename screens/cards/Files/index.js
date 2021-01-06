import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Content, Text, View,
} from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PagesBackground from '../../../components/Containers/PagesBackground';
import CheckListStyles from '../CheckLists/styles';
import AppCardStyles from '../ApplicationCard/styles';
import { getTaskFilesStart } from '../../../redux/tasks/tasks.actions';

const Files = ({ navigation, route }) => {
  const { data } = route?.params;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.pages.loading);
  const token = useSelector((state) => state?.user?.token);
  const files = useSelector((state) => state.tasks?.current_task?.files);
  useEffect(() => {
    dispatch(getTaskFilesStart(token, data?.id));
  }, []);
  return (
    <PagesBackground>
      <Content
        scrollEnabled={!isLoading}
        refreshControl={(
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(getTaskFilesStart(token, data?.id))}
          />
                )}
      >
        <View style={CheckListStyles.header}>
          <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <View style={CheckListStyles.headerTextView}>
            <Text style={CheckListStyles.headerText}>
              Файлы задачи
            </Text>
            <Text style={CheckListStyles.numberText}>
              №
              {' '}
              {data.id}
            </Text>
          </View>
        </View>
        <View>
          {files?.length ? files?.map((item) => (
            <Text>
              {item?.name}
            </Text>
          )) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Text>
                Файлов нет
              </Text>
            </View>
          )}
        </View>
      </Content>
    </PagesBackground>
  );
};

export default Files;
