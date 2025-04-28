import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface RadioButtonProps {
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  size?: number;
  borderColor?: string;
  innerCircleColor?: string;
  accessibilityLabel?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected = false,
  onPress,
  disabled = false,
  label = '',
  labelPosition = 'right',
  style,
  labelStyle,
  size = 24,
  borderColor = '#007bff',
  innerCircleColor = '#674459',
  accessibilityLabel = 'Radio Button',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row' },
      ]}
      onPress={!disabled ? onPress : undefined}
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
            borderColor: disabled ? '#d6d6d6' : borderColor,
          },
          style,
        ]}>
        {selected && (
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: disabled ? '#d6d6d6' : innerCircleColor,
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
    borderRadius: 40,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default React.memo(RadioButton);
