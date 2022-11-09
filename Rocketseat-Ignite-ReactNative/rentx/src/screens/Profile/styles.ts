import {
  BorderlessButton,
  RectButton,
  TouchableOpacity
} from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface isActive {
  active: boolean
}

export const Header = styled.View`
  align-items: center;

  width: 100%;
  height: 227px;

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.header};
`

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`

export const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: ${getStatusBarHeight() + 32}px;
`

export const LogoutButton = styled(BorderlessButton)``

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  margin-top: 48px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.shape};
`

export const PhotoButton = styled(RectButton)`
  position: absolute;
  right: 10px;
  bottom: 10px;

  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.main};
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 142px;
`

export const ContentHeader = styled.View``

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
  border-bottom-width: 1px;

  border-bottom-color: ${({ theme }) => theme.colors.line};
`

export const OptionTitle = styled.Text<isActive>`
  font-size: ${RFValue(20)}px;

  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};

  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_detail};
`

export const Option = styled(TouchableOpacity)<isActive>`
  ${({ active }) =>
    active &&
    css`
      padding-bottom: 14px;
      border-bottom-width: 3px;

      border-bottom-color: ${({ theme }) => theme.colors.main};
    `};
`

export const Section = styled.View``
