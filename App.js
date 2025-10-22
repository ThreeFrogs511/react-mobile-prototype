import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

//All of our screens
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createNativeStackNavigator(); 

export default function App() {

  // Store the current user data globally.
  // 'user' and 'setUser' will be transfered as props (see below).
  // The login screen will use 'setUser' to fill the user data object.
  // The profile screen will display and update the data.
  const [user, setUser] = useState({});
  
  return (
  // Root container that manages the navigation state of the entire app.
  // It must wrap every navigator (Stack, Tabs, Drawer, etc.).
  <NavigationContainer>

    {/* 
      Stack Navigator: manages a stack-based navigation flow.
      Each new screen is pushed on top of the stack and can be popped to go back.
      The "initialRouteName" defines the first screen displayed when the app launches.
    */}
    <Stack.Navigator initialRouteName="Login">

      {/* 
        LOGIN SCREEN
        We use the function form instead of "component={...}" 
        so we can inject custom props (here, setUser).
        The spread {...props} keeps default navigation props (navigation, route, etc.).
      */}
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setUser={setUser} />}
      </Stack.Screen>

      {/* 
        PROFILE SCREEN
        Displays user information once logged in.
        We pass both "user" and "setUser" so the screen can 
        read and update the global user data.
      */}
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} setUser={setUser} />}
      </Stack.Screen>

    </Stack.Navigator>
  </NavigationContainer>
);

}
