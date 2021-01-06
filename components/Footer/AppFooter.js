import React from 'react';
import { Footer, FooterTab } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import FooterButton from '../UI/FooterButton/FooterButton';
import FooterStyles from '../../screens/main/Desktop/styles';
import * as RootNavigation from '../../RootNavigation';
import ComponentsBackground from '../Containers/ComponentsBackground';
import * as PageActions from '../../redux/pages/pages.actions';

const AppFooter = () => {
  const dispatch = useDispatch();

  const goTo = (route) => {
    RootNavigation.navigate(route);
    dispatch(PageActions.changeRoute(route));
  };
  const route = useSelector((state) => state.pages.route);

  return (
    <ComponentsBackground>
      <Footer style={FooterStyles.root}>
        <FooterTab style={{ backgroundColor: 'transparent' }}>
          <FooterButton onPress={() => goTo('Desktop')} active={route === 'Desktop'} title="Главная" icon="home" />
          <FooterButton onPress={() => goTo('Applications')} active={route === 'Applications'} title="Заявки" icon="apps" />
          <FooterButton onPress={() => goTo('Checks')} active={route === 'Checks'} newsCount={1} title="Проверки" icon="checks" />
          <FooterButton onPress={() => goTo('Tasks')} active={route === 'Tasks'} title="Задачи" icon="tasks" />
        </FooterTab>

      </Footer>
    </ComponentsBackground>

  );
};

export default AppFooter;
