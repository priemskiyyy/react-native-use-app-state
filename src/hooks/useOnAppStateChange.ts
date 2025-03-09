import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { isForegroundAppState } from '../utils/isForegroundAppState';
import { isFunction } from '../utils/isFunction';
import { isBackgroundAppState } from '../utils/isBackgroundAppState';

type OnAppStateChangeCallbacks = {
  onApplicationWillChangeState?: (nextAppState: AppStateStatus) => void;
  onApplicationWillEnterForeground?: () => void;
  onApplicationWillEnterBackground?: () => void;
};

type OnAppStateChangeOptions = {
  handleExtensionState?: boolean;
};

export const useOnAppStateChange = (
  callbacks: OnAppStateChangeCallbacks,
  options?: OnAppStateChangeOptions
) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const currentAppState = appState.current;

      if (isFunction(callbacks.onApplicationWillChangeState)) {
        callbacks.onApplicationWillChangeState(nextAppState);
      }

      appState.current = nextAppState;

      // HANDLE FOREGROUND APP STATE CHECK
      if (isFunction(callbacks.onApplicationWillEnterForeground)) {
        if (isForegroundAppState(nextAppState, options?.handleExtensionState)) {
          return callbacks.onApplicationWillEnterForeground();
        }
      }

      // HANDLE BACKGROUND APP STATE CHECK
      if (isFunction(callbacks.onApplicationWillEnterBackground)) {
        if (
          !isForegroundAppState(currentAppState, options?.handleExtensionState)
        ) {
          return;
        }

        if (isBackgroundAppState(nextAppState)) {
          return callbacks.onApplicationWillEnterBackground();
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      return subscription.remove();
    };
  }, [callbacks, options]);
};
