import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Home from './src/pages/Home';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://5995427e36c7459c9001dd405d303e7f@o1100400.ingest.sentry.io/6125457',
});

const App = () => {
  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    throw new Error('Error test');

    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Home />
    </>
  );
};

// code push para atualização silenciosa
// on app resume atualiza enquanto o app esta sendo utilizado e se houver alguma
// atualização é realizada somente na próxima vez que o usuário abrir o app
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
