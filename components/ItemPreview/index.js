import React from 'react';
import { View, Card, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import ItemPreviewStyles from './styles';
import * as PageActions from '../../redux/pages/pages.actions';
import { getTime, getWeekAndDay } from '../../utils';

const ItemPreview = ({
  app, check, navigation, itemInfo,
}) => {
  const dispatch = useDispatch();
  const color = app ? '#24b24e' : check ? '#04a3e8' : '#ff8028';
  const link = app ? 'ApplicationCard' : check ? 'CheckCard' : 'TaskCard';
  const infoKey = app ? 'ticket' : check ? 'check' : 'task';
  const goTo = () => {
    navigation.navigate(link, { [infoKey]: itemInfo });
    dispatch(PageActions.changeRoute(link));
  };

  return (

    <View style={ItemPreviewStyles.root}>
      <View style={ItemPreviewStyles.dateView}>
        <Text style={{ ...ItemPreviewStyles.week, color }}>
          {getWeekAndDay(itemInfo?.created_at ?? itemInfo?.plan).week}
        </Text>
        <Text style={{ ...ItemPreviewStyles.day, color }}>
          {getWeekAndDay(itemInfo?.created_at ?? itemInfo?.plan).day}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={ItemPreviewStyles.cardWrapper} onPress={goTo}>
        <Card style={{ ...ItemPreviewStyles.card, borderColor: color }}>
          <Text style={ItemPreviewStyles.cardText}>
            {itemInfo?.subject ?? itemInfo?.entity?.name}
          </Text>
          <Text style={ItemPreviewStyles.cardTime}>
            {!check ? getTime(itemInfo?.created_at) : getTime(itemInfo?.plan)}
          </Text>
        </Card>
      </TouchableOpacity>

    </View>
  );
};

export default ItemPreview;
