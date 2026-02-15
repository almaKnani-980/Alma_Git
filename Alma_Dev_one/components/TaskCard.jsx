import { Pressable, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "./ButtonComponent";

// TaskCard: show one task with check and delete button
// props: item -> task object {id, text, done}
//        toggleDone -> function to change done state
//        deleteTask -> function to delete task
export default function TaskCard({ item, toggleDone, deleteTask }) {
  return (
    <View style={styles.taskCard}>
      {/* check icon: mark task done */}
      <Pressable onPress={() => toggleDone(item.id)}>
        <Text style={styles.checkIcon}>{item.done ? "✔️" : "⭕"}</Text>
      </Pressable>

      {/* task text (title/name)*/}
      <Text style={[styles.taskText, item.done && styles.taskDone]}>
        {item.text}
      </Text>

      {/* delete button */}
      <ButtonComponent text="🗑️" onPress={() => deleteTask(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a3e",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#8b5cf6",
  },
  checkIcon: { fontSize: 22, marginRight: 12 },
  taskText: { fontSize: 16, color: "#ffffff", flex: 1 },
  taskDone: { textDecorationLine: "line-through", color: "#8b5cf6", opacity: 0.7 },
});
