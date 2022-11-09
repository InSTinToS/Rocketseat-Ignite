import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Footer = styled.View`
  align-items: center;

  width: 100%;
  margin: 80px 0;
`

export const Title = styled.Text`
  margin-top: 40px;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.shape};
`

export const Message = styled.Text`
  margin-top: 16px;

  text-align: center;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.shape};
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding-bottom: 80px;
`

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.header};
`
