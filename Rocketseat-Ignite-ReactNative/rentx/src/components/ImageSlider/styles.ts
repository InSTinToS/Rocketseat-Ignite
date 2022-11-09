import { Dimensions } from 'react-native'

import styled from 'styled-components/native'

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`

export const CarImageWrapper = styled.View`
  align-items: center;
  justify-content: center;

  height: 132px;
  width: ${Dimensions.get('window').width}px;
`

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;

  padding-right: 24px;
`

export const Container = styled.View`
  width: 100%;
`
