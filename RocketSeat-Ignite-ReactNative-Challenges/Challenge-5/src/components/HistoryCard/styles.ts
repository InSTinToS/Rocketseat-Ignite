import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Amount = styled.Text`
  font-size: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 13px 24px;
  border-radius: 5px;
  margin-bottom: 8px;
  border-left-width: 5px;

  border-left-color: ${({ color }) => color};
  background-color: ${({ theme }) => theme.colors.shape};
`;
