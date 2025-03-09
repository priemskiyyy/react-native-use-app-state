import type { AppStateStatus } from 'react-native';

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
