// src/components/ThemeSwitcher.js
import React, { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import darkTheme from '../theme/dark';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access current theme and toggle function

  return (
    <View style={styles.switchContainer}>
      <Text style={{ color: theme.text }}>Dark Mode</Text>
      <Switch
        value={theme === darkTheme}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={theme === darkTheme ? '#f4f3f4' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 10,
  },
});

export default ThemeSwitcher;
