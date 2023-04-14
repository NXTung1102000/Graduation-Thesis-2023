import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from './router/AppRouter';
import { persistor, store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppRouter />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
