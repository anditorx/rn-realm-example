// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {Provider} from 'react-redux';
import store from './redux/store';
import FlashMessage from 'react-native-flash-message';

function App() {
  // ANCHOR: Reactotron
  React.useEffect(() => {
    if (__DEV__) {
      import('./config/reactotronConfig').then(() =>
        console.log('Reactotron Configured.'),
      );
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
