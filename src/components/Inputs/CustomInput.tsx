import React from 'react';
import { TextInput, StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native';
import EyeIcon from '../../../assets/icons/svg/eyeIcon';
import EyeOffIcon from '../../../assets/icons/svg/eyeOffIcon';
interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  errorMessage?: string;
  inputStyle?: object;
  containerStyle?: object;
  [key: string]: any;
}

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  leftIcon, // left icon prop
  rightIcon, // right icon prop (for password or other purposes)
  secureTextEntry = false, // for password input
  keyboardType = 'default', // for email, numeric, etc.
  errorMessage = '',
  inputStyle = {},
  containerStyle = {},
  ...rest
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconRight}
            accessible={true}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? (
              <EyeIcon width={20} height={20} fill="#ccc" />
            ) : (
              <EyeOffIcon width={20} height={20} fill="#ccc" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}*</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    // backgroundColor: 'powderblue',
  },
  iconLeft: {
    paddingVertical: 5,
    // backgroundColor: 'steelblue',
  },
  iconRight: {
    paddingVertical: 5,
    // backgroundColor: 'steelblue',
  },
  error: {
    width: '100%',
    textAlign: 'left',
    color: 'red',
    marginBottom: 5,
    fontSize: 12,
  },
});

export default CustomInput;
