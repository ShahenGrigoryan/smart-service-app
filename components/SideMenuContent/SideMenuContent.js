import React from 'react';
import {
  SafeAreaView, View, Image, TouchableOpacity,
} from 'react-native';
import { Text, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import SideMenuStyles from '../../globalStyles/sideMenu';
import * as UserActions from '../../redux/user/user.actions';
import * as RootNavigation from '../../RootNavigation';
import ComponentsBackground from '../Containers/ComponentsBackground';
import * as PageActions from '../../redux/pages/pages.actions';
import userIcon from '../../assets/images/user.png';

const SideMenuContent = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { token } = state.user;
  const avatar = state.user?.avatar?.standart ? { uri: state.user.avatar.standart } : userIcon;
  const logout = () => {
    closeDrawer();
    dispatch(UserActions.logout(token));
  };
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ComponentsBackground>
        <View style={SideMenuStyles.userView}>
          <Image source={avatar} style={SideMenuStyles.avatar} />
          <Text style={SideMenuStyles.name}>{state?.user?.name}</Text>
          <Text style={SideMenuStyles.tel}>
            {state?.user?.phone}
          </Text>
        </View>
      </ComponentsBackground>
      <View style={SideMenuStyles.ratingView}>
        <View style={SideMenuStyles.ratingTextView}>
          <Text style={SideMenuStyles.ratingText}>
            Мой рейтинг
          </Text>
          <Text style={SideMenuStyles.ratingText}>
            {state?.user?.rate}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={SideMenuStyles.ratingInfoButton}>
          <AntDesign name="infocirlceo" size={24} color="#2b9f98" />
        </TouchableOpacity>

      </View>
      <Button
        style={{ marginLeft: 15, borderRadius: 10 }}
        onPress={() => {
          RootNavigation.navigate('Accruals');
          dispatch(PageActions.changeRoute('Accruals'));
          closeDrawer();
        }}
      >
        <Text style={{ fontSize: 14, color: '#fff' }}>
          Начисления
        </Text>
      </Button>
      <Button
        onPress={logout}
        style={{
          position: 'absolute', bottom: 10, left: 15, borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 12 }}>
          Выход
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default SideMenuContent;
