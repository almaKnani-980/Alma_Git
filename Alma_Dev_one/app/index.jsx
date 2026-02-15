import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import TaskCard from "../components/TaskCard";


// index: here is the main screen for the todo list
export default function Index() {
  // state for current input
  const [task, setTask] = useState("");

  // state for all tasks
  const [tasks, setTasks] = useState([]);

  // useEffect:it  runs once when app opens
  useEffect(() => {
    console.log("App started!");
  }, []);

  // addTask: add new task to the list
  const addTask = () => {
    if (!task.trim()) return; // in order to ignore empty input

    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: task, done: false },
    ]);

    setTask(""); // clear input
  };

  // toggleDone: change task done state
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  // deleteTask: remove task from the list
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      <Text style={styles.subtitle}>Tap ✔️ to mark done</Text>

      {/* input +++ add button */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          placeholderTextColor="#8b5cf6"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />
        <ButtonComponent text="＋" onPress={addTask} style={{ width: 56 }} />
      </View>

      {/*  the list of tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <TaskCard item={item} toggleDone={toggleDone} deleteTask={deleteTask} />
        )}
      />

      {/* message that appears if there is  no tasks */}
      {tasks.length === 0 && <Text style={styles.emptyText}>No tasks yet</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f23",
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#c4b5fd",
    textAlign: "center",
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#1a1a3e",
    borderWidth: 2,
    borderColor: "#8b5cf6",
    borderRadius: 12,
    padding: 14,
    color: "#ffffff",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#c4b5fd",
    marginTop: 40,
    fontSize: 16,
  },
});
