import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomCheckbox = ({
  checked = false,
  onChange,
  disabled = false,
  label = '',
  labelPosition = 'right',
  style,
  labelStyle,
  size = 24,
  color = '#007bff',
  accessibilityLabel = 'Checkbox',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row' },
      ]}
      onPress={!disabled ? () => onChange(!checked) : null}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked, disabled }}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: disabled ? '#d6d6d6' : color,
            backgroundColor: checked ? color : '#fff',
          },
          style,
        ]}>
        {checked && <View style={styles.checkmark} />}
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
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: '60%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default React.memo(CustomCheckbox);
