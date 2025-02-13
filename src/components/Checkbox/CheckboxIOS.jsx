import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, Animated, StyleSheet, Text, TouchableNativeFeedback, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const COLORS = {
  blue: { checked: '#3b82f6', bg: '#dbeafe', border: '#93c5fd' },
  green: { checked: '#10b981', bg: '#d1fae5', border: '#6ee7b7' },
  purple: { checked: '#8b5cf6', bg: '#ede9fe', border: '#c4b5fd' },
  red: { checked: '#ef4444', bg: '#fee2e2', border: '#fca5a5' },
  gray: { checked: '#9ca3af', bg: '#e5e7eb', border: '#d1d5db' },
};

const useCheckboxAnimation = checked => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (checked) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [checked]);

  return { scaleAnim, bounceAnim };
};

const Checkbox = ({
  size = 20,
  theme = 'blue',
  checked: controlledChecked,
  disabled = false,
  onChange,
  label,
  labelStyle = {},
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  const { scaleAnim, bounceAnim } = useCheckboxAnimation(checked);
  const themeColors = useMemo(
    () => (disabled ? COLORS.gray : COLORS[theme] || COLORS.blue),
    [theme, disabled],
  );

  const toggleCheckbox = useCallback(() => {
    if (disabled) {
      return;
    }
    const newState = !checked;
    if (!isControlled) {
      setInternalChecked(newState);
    }
    onChange && onChange(newState);
  }, [checked, isControlled, onChange, disabled]);

  const rippleColor = themeColors.checked; // Set ripple color based on the theme

  return (
    <TouchableNativeFeedback
      onPress={toggleCheckbox}
      background={TouchableNativeFeedback.Ripple(rippleColor, false)}
      disabled={disabled}>
      <View style={[styles.container, disabled && styles.disabledContainer]}>
        <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
          <View style={[styles.checkboxWrapper, { width: size, height: size }]}>
            <View
              style={[
                styles.checkboxBg,
                {
                  backgroundColor: checked ? themeColors.checked : 'white',
                  borderColor: checked ? themeColors.checked : themeColors.border,
                  opacity: disabled ? 0.6 : 1,
                  width: size,
                  height: size,
                  borderRadius: 3,
                },
              ]}
            />
            <Svg width={size} height={size} viewBox="0 0 24 24" style={styles.svg}>
              <AnimatedPath
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12L10 18L20 6"
                strokeDasharray="40"
                strokeDashoffset={scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                })}
              />
            </Svg>
          </View>
        </Animated.View>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </View>
    </TouchableNativeFeedback>
  );
};

Checkbox.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.oneOf(['blue', 'green', 'purple', 'red']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
};

export default React.memo(Checkbox, (prevProps, nextProps) => {
  return (
    prevProps.size === nextProps.size &&
    prevProps.theme === nextProps.theme &&
    prevProps.checked === nextProps.checked &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.label === nextProps.label &&
    prevProps.labelStyle === nextProps.labelStyle
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  checkboxWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBg: {
    position: 'absolute',
    borderWidth: 2,
  },
  svg: {
    position: 'absolute',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
});

// usage Example:
/*
  const [isChecked, setIsChecked] = useState(false);

  <CheckboxIOS
    size={20}
    theme="green"
    checked={isChecked}
    onChange={setIsChecked}
    label="Accept Terms and Conditions"
    labelStyle={{ fontSize: 14, color: '#333' }}
  />
 */
