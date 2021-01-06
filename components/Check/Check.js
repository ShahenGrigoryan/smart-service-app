import React from 'react';
import {
  Card, CardItem, Text, View,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import CardStyles from '../../globalStyles/card';
import * as PageActions from '../../redux/pages/pages.actions';
import { getDate, getTime } from '../../utils';

const Check = ({ navigation, itemInfo }) => {
  const dispatch = useDispatch();

  const goTo = () => {
    navigation.navigate('CheckCard', { check: itemInfo });
    dispatch(PageActions.changeRoute('Accruals'));
  };

  return (
    <TouchableOpacity activeOpacity={0.5} style={CardStyles.cardRoot} onPress={goTo}>
      <Card style={CardStyles.checkCard}>
        <CardItem style={CardStyles.cardHeader}>
          <Text style={CardStyles.number}>
            №
            {' '}
            {itemInfo?.id}
          </Text>
          <View style={CardStyles.headerView}>
            <Text style={CardStyles.title} />

          </View>
          <Text style={CardStyles.date}>
            Плановая дата проверки:
            {' '}
            {getDate(itemInfo?.plan)}
            {' '}
            {getTime(itemInfo?.plan)}
          </Text>
          <Text style={CardStyles.bodyText}>
            {itemInfo?.entity?.name}
            {'\n'}
            {itemInfo?.entity?.address}
          </Text>
        </CardItem>

      </Card>
    </TouchableOpacity>
  );
};

export default Check;
