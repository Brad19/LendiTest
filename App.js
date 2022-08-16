/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsList from './src/home/NewsList';
import News from './src/home/News';

const HomeStack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="News"
          component={NewsList}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="NewsPage"
          component={News}
          options={{
            title: '',
            headerBackTitle: 'News',
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default App;