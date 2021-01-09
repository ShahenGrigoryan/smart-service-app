import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CheckListStyles from '../CheckLists/styles';
import AppCardStyles from '../ApplicationCard/styles';
import { getTaskFilesStart } from '../../../redux/tasks/tasks.actions';
import PageWrapper from '../../../components/Containers/PageWrapper';
import File from '../../../components/UI/File';

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
    <PageWrapper
      onRefresh={() => dispatch(getTaskFilesStart(token, data?.id))}
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
          <File taskId={data?.id} file={item} key={item.id} />
        )) : (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <Text>
              Файлов нет
            </Text>
          </View>
        )}
      </View>
    </PageWrapper>
  );
};

export default Files;
