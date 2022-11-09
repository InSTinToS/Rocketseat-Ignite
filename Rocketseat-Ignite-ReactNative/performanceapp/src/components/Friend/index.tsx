import React, { memo } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  data: {
    name: string;
    likes: number;
    id: number;
  };
  unFollow: () => void;
}

const FriendComponent = ({ data, unFollow }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {data.name} - Likes: {data.likes}
      </Text>

      <TouchableOpacity onPress={unFollow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

// se no return de memo for false ele renderizar o componente
const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});

export default Friend;
