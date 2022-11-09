import React, { useContext, useState } from "react";

import { RFValue } from "react-native-responsive-fontsize";

import {
  TitleWrapper,
  Title,
  SignInText,
  Footer,
  Header,
  Container,
  FooterWrapper,
} from "./styles";

import LogoSvg from "../../assets/logo.svg";
import SignInSocial from "../../components/SignInSocial";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { withGoogle, withApple } = useAuth();
  const { colors } = useTheme();

  const handleWithGoogle = async () => {
    setIsLoading(true);

    try {
      await withGoogle();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert("Não foi possível conectar na conta Google");
    }
  };

  const handleWithApple = async () => {
    setIsLoading(true);

    try {
      await withApple();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert("Não foi possível conectar na conta Apple");
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito simples
          </Title>
        </TitleWrapper>

        <SignInText>Faça seu login{"\n"}com uma das contas abaixos</SignInText>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocial
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleWithGoogle}
          />

          {Platform.OS === "ios" && (
            <SignInSocial
              svg={AppleSvg}
              title="Entrar com Apple"
              onPress={handleWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator color={colors.shape} style={{ marginTop: 18 }} />
        )}
      </Footer>
    </Container>
  );
};

export default SignIn;
