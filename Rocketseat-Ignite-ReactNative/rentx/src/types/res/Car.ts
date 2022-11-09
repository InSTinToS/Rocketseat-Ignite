import { CarType } from 'src/utils/getAccessoryIcon'

export type PhotosResType = {
  id: string
  photo: string
}[]

export type AccessoriesResType = {
  id: string
  name: string
  type: keyof CarType
}[]

export interface CarResType {
  id: string
  name: string
  brand: string
  about: string
  price: string
  period: string
  thumbnail: string
  photos: PhotosResType
  accessories: AccessoriesResType
  fuel_type: 'hybrid_motor' | 'electric' | 'gasoline_motor'
}
