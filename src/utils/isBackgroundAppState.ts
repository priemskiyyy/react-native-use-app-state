import type { AppStateStatus } from 'react-native';
import { BACKGROUND_APP_STATE_REGEXP } from '../constants/regexp';

/**
 * Checks if the given app state indicates the application is in the background.
 *
 * @param {AppStateStatus} appState - The current application state.
 * @returns {boolean} `true` if the app is in the background, otherwise `false`.
 *
 * @example
 * const isBackground = isBackgroundAppState(AppState.currentState);
 * console.log('Is app in background:', isBackground);
 */
export const isBackgroundAppState = (appState: AppStateStatus): boolean => {
  return !!appState.match(BACKGROUND_APP_STATE_REGEXP);
};
