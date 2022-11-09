import React, { useEffect, useState } from 'react'
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles'
import { Alert, BackHandler, StatusBar, StyleSheet } from 'react-native'

import Car from 'src/components/Car'
import CarModel from 'src/database/models/Car'
import { Logo } from 'src/assets'
import api from 'src/services/api'
import { CarResType } from 'src/types/res/Car'
import { Load } from 'src/components'
import { NavigationProps } from 'src/types/react-native/navigation'
import AnimatedLoading from 'src/components/AnimatedLoading'
import database from 'src/database'

import { Ionicons } from '@expo/vector-icons'
import { synchronize } from '@nozbe/watermelondb/sync'
import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface CarDetailsParams {
  car: CarModel
}

type Params = CarDetailsParams | void

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<CarModel[]>()
  const navigation = useNavigation<NavigationProps<Params>>()
  const netInfo = useNetInfo()

  const handleCarDetails = (car: CarModel) => {
    navigation.navigate('CarDetails', { car })
  }

  const offlineSync = async () => {
    if (netInfo.isConnected === true) {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const res = await api.get(
            `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
          )

          const { latestVersion, changes } = res.data

          return { changes, timestamp: latestVersion }
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users
          await api.post('/users/sync/', user)
        }
      })
    } else if (netInfo.isConnected === false) {
      Alert.alert('Você está offline')
    }
  }

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const carCollection = database.get<CarModel>('cars')
        const cars = await carCollection.query().fetch()
        isMounted && setCars(cars)
      } catch (error) {
      } finally {
        isMounted && setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [])

  useEffect(() => {
    offlineSync()
  }, [netInfo.isConnected])

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor='transparent'
        />

        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && (
            <TotalCars>Total de {cars ? cars.length : 0} Carros</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <AnimatedLoading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  )
}

export default Home
