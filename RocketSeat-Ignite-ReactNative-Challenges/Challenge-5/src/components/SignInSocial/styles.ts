import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Icon = styled.View`
  align-items: center;
  justify-content: center;

  height: 100%;
  border-right-width: 1px;
  padding: ${RFValue(16)}px;

  border-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  border-radius: 5px;
  margin-bottom: 16px;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};
`;
