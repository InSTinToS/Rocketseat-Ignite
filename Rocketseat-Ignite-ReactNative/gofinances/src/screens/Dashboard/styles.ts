import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import { BorderlessButton } from "react-native-gesture-handler";

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TransactionsIcon = styled(MaterialIcons).attrs({
  size: 32,
})`
  color: ${({ theme }) => theme.colors.attention};
`;

export const TransactionsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 0 16px;
`;

export const TransactionsList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
    paddingRight: 8,
  },
})``;

export const Title = styled.Text`
  margin-bottom: 16px;

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Transactions = styled.View`
  flex: 1;

  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  position: absolute;
  top: ${RFPercentage(20)}px;

  width: 100%;
  padding-bottom: 8px;
`;

export const LogoutIcon = styled(Feather).attrs({ name: "power" })`
  font-size: ${RFValue(24)}px;

  color: ${({ theme }) => theme.colors.secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 24px;

  margin-top: ${getStatusBarHeight() + RFValue(20)}px;
`;

export const UserGreeting = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.shape};
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const Avatar = styled.Image`
  border-radius: 10px;
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

const Container = styled.SafeAreaView`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export default Container;
