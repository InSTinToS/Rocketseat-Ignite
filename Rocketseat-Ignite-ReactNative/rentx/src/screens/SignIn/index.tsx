import React, { useEffect, useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native'
import { Container, Footer, Form, Header, SubTitle, Title } from './styles'

import { Button, Input, Password } from 'src/components'
import { NavigationProps } from 'src/types/react-native/navigation'
import { useAuth } from 'src/hooks/useAuth'
import database from 'src/database'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: Yup.string().required('Informe a senha')
})

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()
  const { signIn } = useAuth()
  const navigation = useNavigation<NavigationProps<void>>()

  const handleSignIn = async () => {
    try {
      await schema.validate({ email, password })
      await signIn({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return Alert.alert(error.message)
      return Alert.alert('Algo deu errado, tente novamente')
    }
  }

  useEffect(() => {
    ;(async () => {
      const userCollection = database.get('users')
      const users = await userCollection.query().fetch()
    })()
  }, [])

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <StatusBar
              barStyle='dark-content'
              translucent
              backgroundColor='transparent'
            />

            <Title>Estamos{'\n'}quase lá.</Title>

            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />

            <Password
              iconName='lock'
              placeholder='Senha'
              marginTop={8}
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              enabled={!!(email && password)}
              loading={false}
              onPress={handleSignIn}
            />

            <Button
              style={{ marginTop: 8 }}
              color={theme.colors.background_secondary}
              title='Criar conta gratuita'
              onPress={() => navigation.navigate('SignUpFirstStep')}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignIn
