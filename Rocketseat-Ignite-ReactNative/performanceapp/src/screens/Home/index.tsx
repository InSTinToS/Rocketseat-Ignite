import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import FriendList from "../../components/FriendList";

const Home = () => {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`http://192.168.15.2:3333/friends?q=${name}`);
    const data = await res.json();
    setFriends(data);
  };

  //useCallback impede de recriar a função ou seja
  //impede de realocar um novo espaço de memória para a função
  //se nada dentro do array de dependências for alterado
  const unFollow = useCallback(() => {
    console.log("unfollow");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do amigo"
        onChangeText={setName}
      />

      <Button title="Buscar amigo" onPress={handleSearch} />

      <ScrollView style={styles.scroll}>
        <FriendList unFollow={unFollow} data={friends} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    marginTop: 100,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

export default Home;
