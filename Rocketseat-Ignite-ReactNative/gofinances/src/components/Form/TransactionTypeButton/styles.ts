import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  type: "up" | "down";
  isActive: boolean;
}

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Button = styled(RectButton)`
  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding: 16px 35px;
`;

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border-radius: 5px;

  border: solid
    ${({ isActive, type, theme }) =>
      `${isActive ? 0 : "1px"} ${
        type === "up"
          ? theme.colors.success_light
          : theme.colors.attention_light
      }`};

  ${({ theme, isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `};

  ${({ theme, isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `};
`;
