import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Fields = styled.View``;

export const FormContent = styled.View`
  justify-content: space-between;

  flex: 1;
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.shape};
  background-color: ${({ theme }) => theme.colors.primary}; ;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  padding-bottom: 19px;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.primary}; ;
`;

const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export default Container;
