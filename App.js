import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/stacks/root';
import { Provider } from 'react-redux';

import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}