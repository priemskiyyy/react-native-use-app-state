import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (newAppState: AppStateStatus) => {
      return setAppState(newAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      return subscription.remove();
    };
  }, []);

  return appState;
};
