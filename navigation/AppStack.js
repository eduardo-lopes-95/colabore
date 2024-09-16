import React from 'react';
import { NativeBaseProvider } from 'native-base';

const AppStack = () => (
  <NativeBaseProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Job" component={JobPage} />
      <Stack.Screen name="JobListing" component={JobListingPage} />
      <Stack.Screen name="Resumes" component={ResumePage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="LogIn" component={LogInPage} />
      <Stack.Screen name="PicMe" component={PicMePage} />
    </Stack.Navigator>
  </NativeBaseProvider>
);

export default AppStack;
