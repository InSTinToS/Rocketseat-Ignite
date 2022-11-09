import React, { useMemo } from "react";

import { View, StyleSheet, Text, FlatList } from "react-native";
import Friend from "../Friend";

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
  unFollow: () => void;
}

const FriendList = ({ data, unFollow }: Props) => {
  const totalLikes = useMemo(
    () => data.reduce((likes, friend) => likes + friend.likes, 0),
    [data]
  );

  return (
    <View style={styles.container}>
      <Text>Total de likes: {totalLikes}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Friend unFollow={unFollow} data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

export default FriendList;
