import { Pressable, StyleSheet, Text } from "react-native";

// ButtonComponent: reusable button for the app
// props: onPress -> function when button is pressed
//        text -> text to show on button
//        style -> extra style if needed
export default function ButtonComponent({ onPress, text, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff6b9d",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

