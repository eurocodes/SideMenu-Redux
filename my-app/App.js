import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackScreens from './screens/StackScreen';
import DrawerContent from './screens/DrawerContent';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="back"
          drawerContent={props => <DrawerContent {...props} />}

        >
          <Drawer.Screen name="Home" component={StackScreens} />
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
