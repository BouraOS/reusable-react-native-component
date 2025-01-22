import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import Fonts from './theme/fonts';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <TestApp />
    </ThemeProvider>
  );
}

const TestApp = () => {
  const { theme } = React.useContext(ThemeContext); // Access current theme

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>{'Hello World'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.PRIMARY?.SemiBold,
    fontSize: Fonts.SIZES.large,
    marginBottom: 20,
  },
});

export default App;
