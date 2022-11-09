import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  error?: boolean;
  active?: boolean;
}

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin: 7px;

  color: ${({ theme }) => theme.colors.attention};
`;

export const Container = styled.TextInput<ContainerProps>`
  width: 100%;
  padding: 16px 18px;
  border-radius: 5px;
  margin-bottom: 8px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};

  ${({ theme, error, active }) =>
    (error || active) &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention};
    `};
`;
