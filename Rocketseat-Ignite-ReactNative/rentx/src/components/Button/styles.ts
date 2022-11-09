import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps extends RectButtonProps {
  color?: string
  enabled: boolean
}

interface TitleProps {
  light: boolean
}

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`

export const Container = styled(RectButton)<ContainerProps>`
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 19px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme }) => theme.colors.shape};
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
  background-color: ${({ theme, color }) => color || theme.colors.main};
`
