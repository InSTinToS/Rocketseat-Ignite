import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
