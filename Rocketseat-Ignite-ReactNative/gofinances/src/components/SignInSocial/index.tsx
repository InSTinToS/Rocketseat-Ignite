import React, { FC } from "react";

import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Title, Container, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: FC<SvgProps>;
}

const SignInSocial = ({ title, svg: Svg, ...props }: Props) => {
  return (
    <Container {...props}>
      <Icon>
        <Svg />
      </Icon>

      <Title>{title}</Title>
    </Container>
  );
};

export default SignInSocial;
