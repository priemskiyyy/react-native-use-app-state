import type { AppStateStatus } from 'react-native';
import { BACKGROUND_APP_STATE_REGEXP } from '../constants/regexp';

export const isBackgroundAppState = (appState: AppStateStatus): boolean => {
  return !!appState.match(BACKGROUND_APP_STATE_REGEXP);
};
