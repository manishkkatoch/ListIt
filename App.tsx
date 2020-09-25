import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';

import { ItemCards } from './src/components/ListCard';

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ marginHorizontal: 32, marginTop: 32 }}>
          <ItemCards></ItemCards>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfebe6",
    alignItems: "center"
  },
  safeAreaView: {
    alignSelf: "stretch",
    flex: 1
  }
})

export default App;
