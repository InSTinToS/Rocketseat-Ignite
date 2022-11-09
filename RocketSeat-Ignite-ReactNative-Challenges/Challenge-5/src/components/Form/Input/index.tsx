import React from "react";
import { TextInputProps } from "react-native";

import { Container, Error } from "./styles";

interface InputProps extends TextInputProps {
  error?: string;
  touched?: boolean;
  active?: boolean;
}

const Input = ({ active, touched, error, ...props }: InputProps) => {
  return (
    <>
      {error && touched && <Error>{error}</Error>}

      <Container error={!!error && touched} active={active} {...props} />
    </>
  );
};

export default Input;
