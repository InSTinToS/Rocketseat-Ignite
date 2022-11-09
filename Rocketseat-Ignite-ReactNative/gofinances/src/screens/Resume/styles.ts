import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons";

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 24px;
  margin-top: 24px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const Content = styled.ScrollView``;

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

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;
