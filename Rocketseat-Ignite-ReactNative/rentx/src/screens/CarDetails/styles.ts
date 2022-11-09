import {
  getBottomSpace,
  getStatusBarHeight
} from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const OfflineInfo = styled.Text`
  text-align: center;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.main};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px 24px ${getBottomSpace() + 24}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const Accessories = styled.View`
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`

export const About = styled.Text`
  margin-top: 23px;

  text-align: justify;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.text};
`

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-top: 38px;
`

export const Description = styled.View``

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text_detail};
`

export const Name = styled.Text`
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.title};
`

export const Rent = styled.View``

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.text_detail};
`

export const Price = styled.Text`
  font-size: ${RFValue(35)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};

  color: ${({ theme }) => theme.colors.main};
`

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 16}px;
`

export const Header = styled.View`
  position: absolute;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-left: 24px;
  margin-top: ${getStatusBarHeight() + 8}px;
`

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`
