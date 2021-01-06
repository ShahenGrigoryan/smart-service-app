import React from 'react';
import {
  Container, Content,
} from 'native-base';
import Drawer from 'react-native-drawer';
import AppFooter from '../Footer/AppFooter';
import AppHeader from '../Header';
import SideMenuContent from '../SideMenuContent/SideMenuContent';

const drawerStyles = {
  drawer: {
    shadowColor: 'transparent', shadowOpacity: 0, shadowRadius: 0, height: '100%',
  },
  main: { paddingLeft: 0 },
};

const MainWrapper = ({ children }) => {
  let _drawer;
  const handleMenuOpen = () => {
    _drawer.open();
  };

  // const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  return (
    <Drawer
      type="static"
      content={<SideMenuContent />}
      tapToClose
      ref={(ref) => { _drawer = ref; }}
      open={false}
      openDrawerOffset={100}
      tweenDuration={150}
      styles={drawerStyles}
      tweenHandler={Drawer?.tweenPresets?.parallax}
    >
      <Container>
        <AppHeader menuOpen={handleMenuOpen} />
        <Content style={{ opacity: 0 }}>
          {children}
        </Content>
        <AppFooter />

      </Container>
    </Drawer>
  );
};

export default MainWrapper;
