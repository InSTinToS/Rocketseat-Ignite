import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 0 24px;
  padding-top: ${getStatusBarHeight()}px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`

export const Steps = styled.View`
  flex-direction: row;
`

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`

export const FormTitle = styled.Text`
  margin-bottom: 24px;

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.title};
`
