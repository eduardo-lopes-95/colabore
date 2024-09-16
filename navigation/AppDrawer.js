import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider, Box } from 'native-base';
import CustomDrawerContent from '../components/CustomDrawerContent';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <NativeBaseProvider>
    <Box flex={1}>
      <Drawer.Navigator
        initialRouteName="AppStack"
        drawerContent={(props) => (
          <Box flex={1}>
            <CustomDrawerContent {...props} />
          </Box>
        )}
      >
        <Drawer.Screen 
          name="AppStack" 
          component={AppStack} 
          options={{ 
            title: 'Home',
            headerShown: false
          }} 
        />
      </Drawer.Navigator>
    </Box>
  </NativeBaseProvider>
);

export default AppDrawer;
