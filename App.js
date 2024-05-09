import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ToDoList from "./components/Todolist";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODOLIST</Text>
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00FF00",
    paddingHorizontal: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#000000",
  },
});
