import {
  useAppState,
  useOnAppStateChange,
  isBackgroundAppState,
  isForegroundAppState,
} from 'react-native-use-app-state';
import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const state = useAppState();
  const [count, setCount] = useState(0);
  useOnAppStateChange({
    onApplicationWillEnterForeground: () => {
      console.log('onApplicationWillEnterForeground');
    },
    onApplicationWillEnterBackground: () => {
      console.log('onApplicationWillEnterBackground');
    },
    onApplicationWillChangeState: (nextAppState) => {
      setCount((prevCount) => prevCount + 1);
      if (isBackgroundAppState(nextAppState)) {
        console.log('onApplicationWillChangeState: will go background state');
      }

      if (isForegroundAppState(nextAppState)) {
        console.log('onApplicationWillChangeState: will go foreground state');
      }

      console.log('onApplicationWillChangeState');
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current App State: {state.toString()}</Text>
      <Text style={styles.text}>
        useOnAppStateChange onApplicationWillChangeState calls count:
        {count.toString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 30,
  },
  text: {
    textAlign: 'center',
  },
});
