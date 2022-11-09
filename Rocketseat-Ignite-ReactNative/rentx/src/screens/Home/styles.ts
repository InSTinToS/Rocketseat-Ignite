import { FlatList, FlatListProps } from 'react-native'

import { CarResType } from 'src/types/res/Car'
import Car from 'src/database/models/Car'

import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const MyCarsButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};
`

export const CarList = styled(
  FlatList as new (props: FlatListProps<Car>) => FlatList<Car>
).attrs({
  contentContainerStyle: { padding: 24 },
  showVerticalScrollIndicator: false
})``

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  height: 100%;
  padding: 0 16px;
  padding-bottom: 32px;
`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.text};
`

export const Header = styled.View`
  width: 100%;
  height: 113px;

  font-family: ${({ theme }) => theme.fonts.secondary_600};
  background-color: ${({ theme }) => theme.colors.header}; ;
`

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`
