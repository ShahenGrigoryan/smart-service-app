import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CheckListStyles from '../../CheckLists/styles';
import AppCardStyles from '../../Applications/Card/styles';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import File from '../../../../components/UI/File';
import { getCheckFilesStart, removeCheckFileStart } from '../../../../redux/checks/checks.actions';

const CheckFiles = ({ navigation, route }) => {
  const { data } = route?.params;
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const files = useSelector((state) => state.checks?.current_check?.files);
  useEffect(() => {
    dispatch(getCheckFilesStart(token, data?.id));
  }, []);
  return (
    <PageWrapper
      onRefresh={() => dispatch(getCheckFilesStart(token, data?.id))}
    >
      <View style={CheckListStyles.header}>
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={CheckListStyles.headerTextView}>
          <Text style={CheckListStyles.headerText}>
            Файлы проверки
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
          <File
            onRemove={() => dispatch(removeCheckFileStart({
              fileId: item?.id,
              token,
              checkId: data.id,
            }))}
            style={{ borderColor: '#04a3e8' }}
            file={item}
            key={item.id}
          />
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

export default CheckFiles;
