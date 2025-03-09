import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

/**
 * React hook that provides the current application state and updates when it changes.
 *
 * @returns {AppStateStatus} The current app state.
 *
 * @example
 * const appState = useAppState();
 * console.log('Current App State:', appState);
 */
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
