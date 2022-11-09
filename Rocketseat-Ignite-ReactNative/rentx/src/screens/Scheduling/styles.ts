import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface DateValueProps {
  selected: boolean
}

export const Footer = styled.View`
  padding: 24px;
`

export const Content = styled.ScrollView.attrs({
  showVerticalIndicator: false,
  contentContainerStyle: {
    padding: 24
  }
})``

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text};
`

export const DateValue = styled.Text<DateValueProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme }) => theme.colors.shape};

  ${({ theme, selected }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `};
`

export const DateInfo = styled.View`
  width: 30%;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text};
`

export const RentalPeriod = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin: 32px 0;
`

export const Title = styled.Text`
  margin-top: 24px;

  font-size: ${RFValue(34)}px;
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

  background-color: ${({ theme }) => theme.colors.background_secondary};
`
