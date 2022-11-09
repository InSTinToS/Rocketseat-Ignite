import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const CarFooterDate = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.title};
`

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`

export const CarFooterTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text_detail};
`

export const CarFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 12px;
  margin-top: -10px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const CarWrapper = styled.View`
  margin: 16px;
`

export const AppointmentsTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.title};
`

export const AppointmentsQuantity = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme }) => theme.colors.text};
`

export const Appointments = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 24px 0;
`

export const Content = styled.View`
  flex: 1;

  width: 100%;
  padding: 0 16px;
`

export const SubTitle = styled.Text`
  margin-top: 24px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};

  color: ${({ theme }) => theme.colors.shape};
`

export const Title = styled.Text`
  margin-top: 24px;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.shape};
`

export const Header = styled.View`
  justify-content: center;

  width: 100%;
  height: 325px;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 30}px;

  background-color: ${({ theme }) => theme.colors.header};
`

export const Container = styled.View`
  flex: 1;
  align-content: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`
