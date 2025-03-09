
# react-native-use-app-state

This library provides functions and hooks to manage and track the application's state, including foreground, background, and extension states.

## Installation

```sh
npm install react-native-use-app-state
```


## Functions

### `isForegroundAppState(appState, handleExtensionState = false)`

Checks if the app is in the foreground (active or extension state).

- **Parameters**:
  - `appState` (`AppStateStatus`): The current app state, which can be `'active'`, `'background'`, or `'inactive'`.
  - `handleExtensionState` (`boolean`): A flag to consider the 'extension' state as a foreground state (default: `false`).

- **Returns**: `boolean` - Returns `true` if the app is in the 'active' state (or 'extension' state if `handleExtensionState` is `true`), otherwise `false`.

- **Usage**:
  ```js
  const isForeground = isForegroundAppState(AppState.currentState, true);
  console.log('Is app in foreground:', isForeground);
  ```

### `isBackgroundAppState(appState)`

Checks if the app is in the background.

- **Parameters**:
  - `appState` (`AppStateStatus`): The current app state.

- **Returns**: `boolean` - Returns `true` if the app is in the background, otherwise `false`.

- **Usage**:
  ```js
  const isBackground = isBackgroundAppState(AppState.currentState);
  console.log('Is app in background:', isBackground);
  ```

## Hooks

### `useOnAppStateChange(callbacks, options)`

React hook that listens for application state changes and triggers callbacks accordingly.

- **Parameters**:
  - `callbacks` (`Object`): Callback functions for different app state changes.
    - `onApplicationWillChangeState` (`function(AppStateStatus): void`): Called when the app state is about to change.
    - `onApplicationWillEnterForeground` (`function(): void`): Called when the app enters the foreground.
    - `onApplicationWillEnterBackground` (`function(): void`): Called when the app enters the background.
  - `options` (`Object`): Additional configuration options.
    - `handleExtensionState` (`boolean`): Whether to handle extension states.

- **Usage**:
  ```js
  useOnAppStateChange({
    onApplicationWillChangeState: (nextState) => console.log('App state changed:', nextState),
    onApplicationWillEnterForeground: () => console.log('App entered foreground'),
    onApplicationWillEnterBackground: () => console.log('App entered background')
  });
  ```

### `useAppState()`

React hook that provides the current application state and updates when it changes.

- **Returns**: `AppStateStatus` - The current app state.

- **Usage**:
  ```js
  const appState = useAppState();
  console.log('Current App State:', appState);
  ```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
