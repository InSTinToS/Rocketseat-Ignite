import React, { useState } from 'react'
import { Container, Form, FormTitle, Header, Steps } from './styles'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'

import { BackButton, Button, Password } from 'src/components'
import Bullets from 'src/components/Bullets'
import { SubTitle, Title } from '../../SignIn/styles'
import { NavigationProps } from 'src/types/react-native/navigation'
import { Params as ConfirmationParams } from 'src/screens/Confirmation'
import api from 'src/services/api'

import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

export interface FormData {
  name: string
  email: string
  cnh: string
}

const SecondStep = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const theme = useTheme()
  const route = useRoute()

  const navigation = useNavigation<NavigationProps<ConfirmationParams>>()

  const { name, cnh, email } = route.params as FormData

  const handleRegister = async () => {
    if (!password || !confirmPassword) return Alert.alert('Informe a senha')
    if (password !== confirmPassword)
      return Alert.alert('As senhas não coincidem')

    await api
      .post('/users/', { name, email, password, driver_license: cnh })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada',
          message: 'Agora é só fazer login\ne aproveitar',
          nextScreen: 'SignIn'
        })
      })
      .catch(error => Alert.alert('Falha ao cadastrar'))
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <BackButton />

            <Steps>
              <Bullets active />
              <Bullets />
            </Steps>
          </Header>

          <Title style={{ marginTop: 60, marginBottom: 16 }}>
            Crie sua{'\n'}conta.
          </Title>

          <SubTitle>Faça seu cadastro{'\n'}de forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Senha</FormTitle>

            <Password
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />

            <Password
              marginTop={8}
              iconName='lock'
              value={confirmPassword}
              placeholder='Repetir senha'
              onChangeText={setConfirmPassword}
            />
          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SecondStep
