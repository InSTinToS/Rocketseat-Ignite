import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginTop: 20,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#a370f7',
  },
  buttonText: {
    fontSize: 17,
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
});

export default Button;
