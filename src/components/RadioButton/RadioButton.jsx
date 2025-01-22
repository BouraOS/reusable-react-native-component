import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const RadioButton = ({
  selected = false,
  onPress,
  disabled = false,
  label = '',
  labelPosition = 'right',
  style,
  labelStyle,
  size = 24,
  color = '#007bff',
  accessibilityLabel = 'Radio Button',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row' },
      ]}
      onPress={!disabled ? onPress : null}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled }}>
      <View
        style={[
          styles.radio,
          {
            width: size,
            height: size,
            borderColor: disabled ? '#d6d6d6' : color,
          },
          style,
        ]}>
        {selected && (
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: disabled ? '#d6d6d6' : color,
                width: size / 2,
                height: size / 2,
              },
            ]}
          />
        )}
      </View>
      {label ? (
        <Text style={[styles.label, { color: disabled ? '#d6d6d6' : '#000' }, labelStyle]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    borderRadius: 50,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default React.memo(RadioButton);
