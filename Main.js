import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Drawer from 'react-native-drawer';
import Login from './screens/main/Login';
import Desktop from './screens/main/Desktop';
import AppHeader from './components/Header';
import AppFooter from './components/Footer/AppFooter';
import SideMenuContent from './components/SideMenuContent/SideMenuContent';
import Applications from './screens/main/Applications';
import Checks from './screens/main/Checks';
import Tasks from './screens/main/Tasks';
import { navigationRef } from './RootNavigation';
import Greeting from './screens/main/Greeting';
import ApplicationCard from './screens/main/Applications/Card';
import CheckCard from './screens/main/Checks/Card';
import TaskCard from './screens/main/Tasks/Card';
import CheckLists from './screens/main/CheckLists';
import Accruals from './screens/main/Accruals';
import TaskFiles from './screens/main/Tasks/Files';
import CheckFiles from './screens/main/Checks/Files';
import ApplicationFiles from './screens/main/Applications/Files';

const drawerStyles = {
  drawer: {
    shadowColor: 'transparent', shadowOpacity: 0, shadowRadius: 0, height: '100%',
  },
  main: { paddingLeft: 0 },
};
const Stack = createStackNavigator();
const Main = () => {
  const userStore = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);
  const { isLoggedIn } = userStore;
  let _drawer;
  const handleMenuOpen = () => {
    _drawer.open();
  };
  const handleMenuClose = () => {
    _drawer.close();
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer
        type="static"
        content={<SideMenuContent closeDrawer={handleMenuClose} />}
        tapToClose
        ref={(ref) => { _drawer = ref; }}
        open={false}
        openDrawerOffset={100}
        tweenDuration={150}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        {isLoggedIn && <AppHeader menuOpen={handleMenuOpen} />}
        <Stack.Navigator
          onNavigationStateChange={() => {
          }}
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Desktop" component={Desktop} />
              <Stack.Screen name="Applications" component={Applications} />
              <Stack.Screen name="Checks" component={Checks} />
              <Stack.Screen name="Tasks" component={Tasks} />
              <Stack.Screen name="ApplicationCard" component={ApplicationCard} />
              <Stack.Screen name="CheckCard" component={CheckCard} />
              <Stack.Screen name="TaskCard" component={TaskCard} />
              <Stack.Screen name="CheckLists" component={CheckLists} />
              <Stack.Screen name="Accruals" component={Accruals} />
              <Stack.Screen name="TaskFiles" component={TaskFiles} />
              <Stack.Screen name="CheckFiles" component={CheckFiles} />
              <Stack.Screen name="ApplicationFiles" component={ApplicationFiles} />
            </>
          ) : (
            <>
              {!visit.count
                       && (<Stack.Screen name="Greeting" component={Greeting} />)}
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
        {isLoggedIn && <AppFooter />}
      </Drawer>
    </NavigationContainer>
  );
};

export default Main;
