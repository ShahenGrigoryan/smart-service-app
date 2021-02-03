import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Platform, StatusBar, Dimensions } from 'react-native';
import {
  Item, Label, Input, Button, Text, View,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import LogoGreen from '../../../assets/images/LogoGreen.png';
import * as UserActions from '../../../redux/user/user.actions';
import Loader from '../../../components/UI/Loader';

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  const { isLoggedIn } = userStore;
  const isLoading = useSelector((state) => state.pages.loading);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Desktop');
      setUserInfo({ email: '', password: '' });
    }
  }, [isLoggedIn]);

  const login = () => {
    dispatch(UserActions.login(userInfo));
  };

  return (

    <KeyboardAwareScrollView>
      {isLoading && <Loader />}
      <View>
        <LoginView style={{ height: Dimensions.get('window').height }}>
          <LogoTextView>
            <GreenLogoImage source={LogoGreen} />
            <GreenMainText>
              SMART SERVICE
            </GreenMainText>
            <GreenSecText>
              Будь эффективнее
            </GreenSecText>
          </LogoTextView>

          <LoginFormView>
            <Item style={{ marginBottom: 20 }} floatingLabel>
              <Label>Логин</Label>
              <Input
                value={userInfo.email}
                onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
              />
            </Item>
            <Item style={{ marginBottom: 30 }} floatingLabel>
              <Label>Пароль</Label>
              <Input
                value={userInfo.password}
                onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
                secureTextEntry
              />
            </Item>
            <View style={{ alignItems: 'center' }}>
              <Button
                onPress={() => login()}
                style={{
                  padding: 0, height: 30, zIndex: -155, backgroundColor: '#438763',
                }}
              >
                <Text>
                  Войти
                </Text>
              </Button>
            </View>
          </LoginFormView>
        </LoginView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const LoginView = styled.SafeAreaView`
    flex:1;
    padding-top:${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
    z-index:0
`;
const LogoTextView = styled.View`
    justify-content:center;
    align-items:center;
    
    
`;
const GreenLogoImage = styled.Image`
    width:60px;
    height:60px;
    margin-bottom:5px;
    
`;
const GreenMainText = styled.Text`
    font-size:25px;
    margin-bottom:2px;
    font-weight:bold;
    color:#438763;
    font-family:Roboto
`;

const GreenSecText = styled.Text`
    font-size:16px;
    margin-bottom:2px;
    letter-spacing:2px;
    color:#438763;
`;

const LoginFormView = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    padding-horizontal:50px;
    
`;

export default Login;
