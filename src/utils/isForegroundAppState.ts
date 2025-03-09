import type { AppStateStatus } from 'react-native';

/**
 * Checks if the app is in the foreground (active or extension state).
 *
 * @param {AppStateStatus} appState - The current app state, which can be 'active', 'background', or 'inactive'.
 * @param {boolean} [handleExtensionState=false] - A flag to determine if the 'extension' state should also be considered as foreground.
 * @returns {boolean} - Returns `true` if the app is in the 'active' state (or 'extension' state if `handleExtensionState` is `true`), otherwise `false`.
 *
 * @example
 * const isForeground = isForegroundAppState(AppState.currentState, true);
 * console.log('Is app in foreground:', isForeground);
 */
export const isForegroundAppState = (
  appState: AppStateStatus,
  handleExtensionState = false
) => {
  const isActive = appState === 'active';

  if (handleExtensionState) {
    return isActive || appState === 'extension';
  }

  return isActive;
};
