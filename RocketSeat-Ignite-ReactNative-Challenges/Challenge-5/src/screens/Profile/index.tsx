import React from "react";

import { Button, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { Container } from "./styles";

const Profile = () => {
  return (
    <Container>
      <Text testID="text-title">Profile</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        value="Miguel"
        autoCorrect={false}
      />

      <TextInput
        testID="sur-name"
        autoCorrect={false}
        placeholder="Sobrenome"
      />

      <Button title="Salvar" onPress={() => {}} />
    </Container>
  );
};

export default Profile;
