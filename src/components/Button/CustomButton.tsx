import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  style?: object;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  disabled = false,
  loading = false,
  bgColor,
  style = {},
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const [isFocused, setFocused] = React.useState(false);

  // Default button styles
  const defaultStyles = {
    backgroundColor: bgColor || '#007bff',
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      style={[styles.button, defaultStyles, style, isFocused && styles.focusedButton]}
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled || loading}
      activeOpacity={0.7}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}>
      <View style={styles.content}>
        {iconPosition === 'left' && icon}
        {loading ? (
          <ActivityIndicator size="small" color="#fff" style={styles.spinner} />
        ) : (
          <Text style={styles.text}>{children}</Text>
        )}
        {iconPosition === 'right' && icon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  spinner: {
    marginLeft: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // Adjusts the gap between text and icon
  },
  focusedButton: {
    shadowColor: '#007bff',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default CustomButton;
