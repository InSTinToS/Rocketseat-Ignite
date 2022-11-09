import React, { useState } from 'react'
import { Container, Form, FormTitle, Header, Steps } from './styles'
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native'

import { BackButton, Button, Input } from 'src/components'
import Bullets from 'src/components/Bullets'
import { SubTitle, Title } from '../../SignIn/styles'
import { NavigationProps } from 'src/types/react-native/navigation'
import { FormData } from '../SecondStep'

import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required('Informe a senha'),
  email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
  cnh: Yup.string().required('Informe a CNH')
})

const FirstStep = () => {
  const [cnh, setCnh] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigation = useNavigation<NavigationProps<void | FormData>>()

  const handleNextStep = async () => {
    try {
      await schema.validate({ name, email, cnh })
      navigation.navigate('SignUpSecondStep', { name, email, cnh })
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return Alert.alert(error.message)
      return Alert.alert('Algo deu errado')
    }
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              value={name}
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
              style={{ marginTop: 8 }}
            />

            <Input
              placeholder='CNH'
              keyboardType='numeric'
              iconName='credit-card'
              style={{ marginTop: 8 }}
              onChangeText={setCnh}
              value={cnh}
            />
          </Form>

          <Button title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default FirstStep
