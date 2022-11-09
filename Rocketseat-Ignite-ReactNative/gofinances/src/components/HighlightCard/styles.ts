import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { CardTypes } from ".";

interface IconProps {
  type: CardTypes;
}

interface ContainerProps {
  type: CardTypes;
}

interface TitleProps {
  type: CardTypes;
}

interface AmountProps {
  type: CardTypes;
}

interface LastTransactionProps {
  type: CardTypes;
}

export const LastTransaction = styled.Text<LastTransactionProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Amount = styled.Text<AmountProps>`
  margin-top: 38px;

  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Footer = styled.View``;

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;

  color: ${({ theme, type }) => {
    switch (type) {
      case "up":
        return theme.colors.success;
      case "down":
        return theme.colors.attention;
      default:
        return theme.colors.shape;
    }
  }};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.View<ContainerProps>`
  width: ${RFValue(300)}px;
  border-radius: 5px;

  margin-right: 16px;
  padding: 19px 23px ${RFValue(42)}px 23px;

  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
`;

export default Container;
