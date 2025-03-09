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

/**
 * React hook to listen for application state changes and trigger callbacks accordingly.
 *
 * @param {Object} callbacks - Callback functions to handle app state changes.
 * @param {function(AppStateStatus): void} [callbacks.onApplicationWillChangeState] - Called when the app state is about to change.
 * @param {function(): void} [callbacks.onApplicationWillEnterForeground] - Called when the app enters the foreground.
 * @param {function(): void} [callbacks.onApplicationWillEnterBackground] - Called when the app enters the background.
 * @param {Object} [options] - Additional configuration options.
 * @param {boolean} [options.handleExtensionState] - Whether to handle extension states.
 *
 * @example
 * useOnAppStateChange({
 *   onApplicationWillChangeState: (nextState) => console.log('App state changed:', nextState),
 *   onApplicationWillEnterForeground: () => console.log('App entered foreground'),
 *   onApplicationWillEnterBackground: () => console.log('App entered background')
 * });
 */

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
