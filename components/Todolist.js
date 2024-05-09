import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import useStore from "./Store";

const TaskList = () => {
  const { tasks, addTask, deleteTask, editTask } = useStore();
  const [task, setTask] = useState({
    task: "",
    name: "",
    institutionID: "",
    categoryCode: "",
    subjectSummary: "",
    subjectTitle: "",
    academicSession: "",
    idImage: "",
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (name, value) => {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const submitTask = () => {
    if (!task.task.trim()) return;

    if (editId) {
      editTask({ ...task, id: editId });
      setEditId(null);
    } else {
      addTask({ ...task, id: Date.now().toString() });
    }
    clearForm();
  };

  const clearForm = () => {
    setTask({
      task: "",
      name: "",
      institutionID: "",
      categoryCode: "",
      subjectSummary: "",
      subjectTitle: "",
      academicSession: "",
      idImage: "",
    });
  };

  const handleEdit = (item) => {
    setTask(item);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      {inputs.map(({ key, placeholder }) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#1E5021"
          value={task[key]}
          onChangeText={(text) => handleInputChange(key, text)}
        />
      ))}

      <TouchableOpacity
        style={[
          styles.button,
          styles.circleButton,
          { backgroundColor: "#00FF00" },
        ]}
        onPress={submitTask}
      >
        <Text style={styles.buttonText}>{editId ? "Update" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.idImage }}
              style={styles.image}
              resizeMode="cover"
            />
            {infoKeys.map((key) => (
              <Text key={key}>{item[key]}</Text>
            ))}
            <TouchableOpacity
              style={[
                styles.button,
                styles.circleButton,
                { backgroundColor: "#00FF00" },
              ]}
              title="Edit"
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.circleButton,
                { backgroundColor: "#00FF00" },
              ]}
              title="Delete"
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.buttonText}>Done ✔</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const inputs = [
  { key: "task", placeholder: "Task" },
  { key: "name", placeholder: "Name" },
  { key: "institutionID", placeholder: "Institution ID" },
  { key: "categoryCode", placeholder: "Category Code" },
  { key: "subjectSummary", placeholder: "Subject Summary" },
  { key: "subjectTitle", placeholder: "Subject Title" },
  { key: "academicSession", placeholder: "Academic Session" },
  { key: "idImage", placeholder: "ID Image URL" },
];

const infoKeys = Object.keys(inputs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 30,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#00FF00",
    backgroundColor: "#FFFFFF",
  },
  button: {
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    marginBottom: 5,
  },
});

export default TaskList;
