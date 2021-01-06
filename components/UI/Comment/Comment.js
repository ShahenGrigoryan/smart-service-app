import React from 'react';
import { Text, View } from 'native-base';
import { Image } from 'react-native';
import { getTime } from '../../../utils';
import userIcon from '../../../assets/images/user.png';

const Comment = ({ item }) => {
  const avatar = item?.user?.avatar
    ? { uri: item.user.avatar }
    : item?.member?.avatar
      ? { uri: item.member.avatar }
      : userIcon;
  return (
    <View
      key={item.id}
      style={{
        position: 'relative',
        paddingVertical: 15,
        marginVertical: 3,
        paddingHorizontal: 5,
        borderColor: '#a8a8a8',
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}
    >
      <View style={{ position: 'relative' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Image
            source={avatar}
            style={{
              width: 20, height: 20, borderRadius: 50, marginRight: 10,
            }}
          />
          <Text style={{ fontWeight: 'bold' }}>
            {item.user?.name ? item.user.name : item?.member?.name}
          </Text>
        </View>
      </View>
      <Text style={{
        color: '#a8a8a8', fontSize: 13, position: 'absolute', top: 3, right: 5,
      }}
      >
        {getTime(item.created_at)}
      </Text>

      <Text key={item.id}>{item.comment}</Text>
    </View>
  );
};

export default Comment;
