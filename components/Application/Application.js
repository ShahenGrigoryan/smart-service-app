import React from 'react';
import {
  Card, CardItem, Text, View,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import CardStyles from '../../globalStyles/card';
import * as PageActions from '../../redux/pages/pages.actions';
import { getDate, getTime } from '../../utils';

const Application = ({ navigation, ticketInfo }) => {
  const dispatch = useDispatch();
  const goTo = () => {
    navigation.navigate('ApplicationCard', { ticket: ticketInfo });
    dispatch(PageActions.changeRoute('Accruals'));
  };

  return (
    <TouchableOpacity activeOpacity={0.5} style={CardStyles.cardRoot} onPress={goTo}>
      <Card style={CardStyles.appCard}>
        <Text style={CardStyles.number}>
          №
          {' '}
          {ticketInfo?.number.replace(/\s/g, '')}
        </Text>
        <CardItem style={CardStyles.cardHeader}>

          <View style={CardStyles.headerView}>
            <Text style={CardStyles.title}>
              {ticketInfo?.subject}
            </Text>
          </View>
          <Text style={CardStyles.date}>
            Срок выполнения:
            {' '}
            {getDate(ticketInfo?.due_by)}
            {' '}
            {getTime(ticketInfo?.due_by)}
          </Text>
          <Text style={{ ...CardStyles.bodyText, color: '#000' }}>
            {ticketInfo?.address}
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default Application;
