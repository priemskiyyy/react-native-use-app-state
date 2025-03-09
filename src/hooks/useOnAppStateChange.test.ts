import { act, renderHook } from '@testing-library/react-native';
import { AppState, type AppStateStatus } from 'react-native';
import { useOnAppStateChange } from './useOnAppStateChange';

jest.mock('react-native', () => ({
  AppState: {
    currentState: 'active',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

describe('useOnAppStateChange', () => {
  const addEventListenerMock = AppState.addEventListener as jest.Mock;
  let listener: (newStatus: AppStateStatus) => void;

  beforeEach(() => {
    addEventListenerMock.mockImplementation((_, fn) => {
      listener = fn;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const emitAppStateChange = (newStatus: AppStateStatus) => {
    act(() => {
      listener(newStatus);
    });
  };

  it('should not fire any callback on mount', () => {
    const callbacks = {
      onApplicationWillChangeState: jest.fn(),
      onApplicationWillEnterForeground: jest.fn(),
      onApplicationWillEnterBackground: jest.fn(),
    };

    renderHook(() => useOnAppStateChange(callbacks));

    expect(callbacks.onApplicationWillChangeState).not.toHaveBeenCalled();
    expect(callbacks.onApplicationWillEnterForeground).not.toHaveBeenCalled();
    expect(callbacks.onApplicationWillEnterBackground).not.toHaveBeenCalled();
  });

  it('should call onApplicationWillChangeState when app state changes', () => {
    const onApplicationWillChangeState = jest.fn();
    renderHook(() => useOnAppStateChange({ onApplicationWillChangeState }));

    // SET APP STATE TO "BACKGROUND"
    emitAppStateChange('background');

    expect(onApplicationWillChangeState).toHaveBeenCalledWith('background');
  });

  it('should call onApplicationWillEnterForeground when app becomes active', () => {
    const callbacks = {
      onApplicationWillChangeState: jest.fn(),
      onApplicationWillEnterForeground: jest.fn(),
      onApplicationWillEnterBackground: jest.fn(),
    };

    renderHook(() => useOnAppStateChange(callbacks));

    // SET APP STATE TO "FOREGROUND"
    emitAppStateChange('active');

    expect(callbacks.onApplicationWillEnterForeground).toHaveBeenCalled();
    expect(callbacks.onApplicationWillEnterBackground).not.toHaveBeenCalled();
  });

  it('should call onApplicationWillEnterBackground when app goes to background', () => {
    const callbacks = {
      onApplicationWillChangeState: jest.fn(),
      onApplicationWillEnterForeground: jest.fn(),
      onApplicationWillEnterBackground: jest.fn(),
    };

    renderHook(() => useOnAppStateChange(callbacks));

    // SET APP STATE TO "FOREGROUND"
    emitAppStateChange('active');

    expect(callbacks.onApplicationWillEnterForeground).toHaveBeenCalled();
    expect(callbacks.onApplicationWillChangeState).toHaveBeenCalled();
    expect(callbacks.onApplicationWillEnterBackground).not.toHaveBeenCalled();

    // SET APP STATE TO "BACKGROUND"
    emitAppStateChange('background');

    expect(callbacks.onApplicationWillEnterBackground).toHaveBeenCalled();
    expect(callbacks.onApplicationWillEnterForeground).toHaveBeenCalledTimes(1);
  });
});
