import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface InputProps {
  withBorderBottom: boolean
}

interface IconContainerProps {
  withBorderBottom: boolean
}

export const Container = styled.View`
  flex-direction: row;
`

export const IconContainer = styled.View<IconContainerProps>`
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ withBorderBottom, theme }) =>
    withBorderBottom &&
    css`
      border-bottom-width: 2px;

      border-bottom-color: ${theme.colors.main};
    `};
`

export const InputText = styled.TextInput<InputProps>`
  flex: 1;

  padding: 0 24px;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ withBorderBottom, theme }) =>
    withBorderBottom &&
    css`
      border-bottom-width: 2px;

      border-bottom-color: ${theme.colors.main};
    `};
`
