import React from 'react';
import AppContainer from './src/navigation';
import { Provider } from 'react-redux'
import store from './src/store';

const App = (props) => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  )
}

export default App;