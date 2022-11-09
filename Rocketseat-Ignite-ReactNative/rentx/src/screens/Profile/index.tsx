import React, { useState } from 'react'
import {
  Container,
  Content,
  ContentHeader,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section
} from './styles'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'

import { BackButton, Button, Input, Password } from 'src/components'
import { useAuth } from 'src/hooks/useAuth'

import { Feather } from '@expo/vector-icons'
import { useNetInfo } from '@react-native-community/netinfo'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as ImagePicker from 'expo-image-picker'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required('Informe um nome'),
  driver_license: Yup.string().required('Informe o CNH')
})

const Profile = () => {
  const { user, signOut, updateUser } = useAuth()
  const [name, setName] = useState(user?.name)
  const [avatar, setAvatar] = useState(user?.avatar)
  const [driver_license, setDriver_license] = useState(user?.driver_license)
  const [option, setOption] = useState<'data' | 'password'>('data')

  const theme = useTheme()
  const netInfo = useNetInfo()

  const handleSignOut = () => {
    Alert.alert(
      'Tem certeza?',
      'Se você sair irá precisar de internet para conectar novamente',
      [
        {
          text: 'Não',
          onPress: () => {}
        },
        {
          text: 'Sim, quero sair',
          onPress: signOut
        }
      ]
    )
  }

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (!result.cancelled) {
      const { uri } = result as { uri: string }
      setAvatar(uri)
    } else return
  }

  const handleProfileUpdate = async () => {
    try {
      const data = { name, driver_license }
      await schema.validate(data)

      // await updateUser({
      //   ...user,
      //   name,
      //   avatar,
      //   driver_license
      // })
    } catch (error) {
      if (error instanceof Yup.ValidationError) Alert.alert(error.message)
      Alert.alert('Não foi possivel atualizar o perfil')
    }
  }

  const handleOptionChange = (newOption: 'data' | 'password') => {
    if (netInfo.isConnected === false && newOption === 'password')
      Alert.alert('Conecte-se a Internet para alterar sua senha')
    else setOption(newOption)
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: avatar || undefined }} />

              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <ContentHeader>
              <Options>
                <Option
                  active={option === 'data'}
                  onPress={() => handleOptionChange('data')}
                >
                  <OptionTitle active={option === 'data'}>Dados</OptionTitle>
                </Option>

                <Option
                  active={option === 'password'}
                  onPress={() => handleOptionChange('password')}
                >
                  <OptionTitle active={option === 'password'}>
                    Trocar senha
                  </OptionTitle>
                </Option>
              </Options>
            </ContentHeader>

            {option === 'data' ? (
              <Section>
                {/* <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  defaultValue={user.driver_license}
                  onChangeText={setDriver_license}
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                /> */}
              </Section>
            ) : (
              <Section>
                <Password
                  iconName='lock'
                  placeholder='Senha atual'
                  autoCorrect={false}
                />

                <Password
                  placeholder='Nova senha'
                  iconName='lock'
                  autoCorrect={false}
                />

                <Password
                  iconName='lock'
                  autoCorrect={false}
                  placeholder='Confirmar senha'
                />
              </Section>
            )}

            <Button title='Salvar alterações' onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Profile
