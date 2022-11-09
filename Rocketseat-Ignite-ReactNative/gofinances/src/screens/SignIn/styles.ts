import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const FooterWrapper = styled.View`
  justify-content: space-between;

  margin-top: ${RFPercentage(-4)}px;

  padding: 0 32px;
`;

export const Title = styled.Text`
  margin-top: 45px;
  text-align: center;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.shape};
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary}; ;
`;

export const SignInText = styled.Text`
  margin-top: 80px;
  margin-bottom: 64px;

  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.shape};
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Container = styled.View`
  flex: 1;
`;
