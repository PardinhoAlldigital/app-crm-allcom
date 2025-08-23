import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar 
        style="light" 
        backgroundColor={theme.colors.primary}
      />
    </Provider>
  );
}
