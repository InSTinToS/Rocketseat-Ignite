import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Category, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

const CategorySelect = ({ title, ...props }: Props) => {
  return (
    <Container {...props}>
      <Category>{title}</Category>

      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelect;
