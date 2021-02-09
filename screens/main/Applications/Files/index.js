import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CheckListStyles from '../../CheckLists/styles';
import AppCardStyles from '../Card/styles';
import PageWrapper from '../../../../components/Containers/PageWrapper';
import File from '../../../../components/UI/File';
import { getTicketFilesStart, removeTicketFileStart } from '../../../../redux/tickets/tickets.actions';

const ApplicationFiles = ({ navigation, route }) => {
  const { data } = route?.params;
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const files = useSelector((state) => state.tickets?.current_ticket?.files);
  useEffect(() => {
    dispatch(getTicketFilesStart(token, data?.id));
  }, []);
  return (
    <PageWrapper
      onRefresh={() => dispatch(getTicketFilesStart(token, data?.id))}
    >
      <View style={CheckListStyles.header}>
        <TouchableOpacity style={AppCardStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={CheckListStyles.headerTextView}>
          <Text style={CheckListStyles.headerText}>
            Файлы заявки
          </Text>
          <Text style={CheckListStyles.numberText}>
            №
            {' '}
            {data?.number ?? data.id}
          </Text>
        </View>
      </View>
      <View>
        {files?.length ? files?.map((item) => (
          <File
            onRemove={() => dispatch(removeTicketFileStart({
              fileId: item?.id,
              token,
              ticketId: data.id,
            }))}
            file={item}
            style={{ borderColor: '#24b24e' }}
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

export default ApplicationFiles;
