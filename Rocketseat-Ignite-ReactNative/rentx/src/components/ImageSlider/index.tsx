import React, { useRef, useState } from 'react'
import { CarImage, CarImageWrapper, Container, ImageIndexes } from './styles'
import { FlatList, ViewToken } from 'react-native'

import Bullets from '../Bullets'
import { PhotosResType } from 'src/types/res/Car'

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

interface Props {
  imageUrls: PhotosResType
}

const ImageSlider = ({ imageUrls }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    // ! Exclamação no final = neste caso não é nulo
    setSelectedIndex(info.viewableItems[0].index!)
  })

  return (
    <Container>
      <ImageIndexes>
        {imageUrls.map((item, index) => (
          <Bullets active={index === selectedIndex} key={item.id} />
        ))}
      </ImageIndexes>

      <FlatList
        horizontal
        data={imageUrls}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode='contain' />
          </CarImageWrapper>
        )}
      />
    </Container>
  )
}

export default ImageSlider
