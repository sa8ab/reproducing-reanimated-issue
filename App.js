import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import InitScreen from './src/Screens/InitScreen';
import SliderScreen from './src/Screens/SliderScreen';
import TerryExampleScreen from './src/Screens/TerryExampleScreen';

enableScreens();

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          // headerShown: false,
          headerTintColor: '#9CCA63',
        }}
        name="Init"
        component={InitScreen}
      />
      <Stack.Screen
        options={{
          headerTintColor: '#9CCA63',
        }}
        name="Slider"
        component={SliderScreen}
      />
      <Stack.Screen
        options={{
          headerTintColor: '#9CCA63',
        }}
        name="Terry"
        component={TerryExampleScreen}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
