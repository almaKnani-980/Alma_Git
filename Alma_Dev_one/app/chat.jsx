import axios from "axios";
import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Welcome! Type any name, and I will guess if it's Male or Female! 🕵️‍♂️🕵️‍♀️", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    
    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    const nameToSearch = input.trim();
    setInput("");
    setLoading(true);

    try {
    
      const response = await axios.get(`https://api.genderize.io/?name=${nameToSearch}`);

      const gender = response.data.gender;
      const probability = (response.data.probability * 100).toFixed(0);
      
      let resultText = "";
      if (gender) {
        resultText = `I'm ${probability}% sure that "${nameToSearch}" is ${gender.toUpperCase()}! 🤖`;
      } else {
        resultText = `Hmm, I couldn't guess the gender for "${nameToSearch}". Is it a unique name? 🤔`;
      }

      const botMsg = { id: (Date.now() + 1).toString(), text: resultText, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      
      console.error("API Error:", error);
      const botMsg = { id: "err", text: "⚠️ Oops! The server is a bit busy. Try again later!", sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🕵️ Gender Guesser AI</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === "user" ? styles.user : styles.bot]}>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        contentContainerStyle={{ padding: 15 }}
      />

      {loading && <ActivityIndicator color="#ff6b9d" style={{ marginBottom: 10 }} />}

      <View style={styles.footer}>
        <TextInput 
          style={styles.input} 
          value={input} 
          onChangeText={setInput} 
          placeholder="Enter a name..." 
          placeholderTextColor="#8b5cf6"
          onSubmitEditing={sendMessage}
        />
        <Pressable onPress={sendMessage} style={styles.btn}>
          <Text style={styles.btnText}>Check</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f23" },
  header: { paddingTop: 60, paddingBottom: 20, backgroundColor: "#1a1a3e", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#8b5cf6" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  bubble: { padding: 12, borderRadius: 15, marginVertical: 5, maxWidth: "80%" },
  user: { backgroundColor: "#ff6b9d", alignSelf: "flex-end" },
  bot: { backgroundColor: "#1a1a3e", alignSelf: "flex-start", borderWidth: 1, borderColor: "#8b5cf6" },
  msgText: { color: "#fff", fontSize: 16 },
  footer: { flexDirection: "row", padding: 15, gap: 10, backgroundColor: "#1a1a3e" },
  input: { flex: 1, backgroundColor: "#0f0f23", borderRadius: 25, paddingHorizontal: 20, color: "#fff", height: 45, borderWidth: 1, borderColor: "#8b5cf6" },
  btn: { backgroundColor: "#ff6b9d", paddingHorizontal: 20, borderRadius: 25, justifyContent: "center" },
  btnText: { color: "#fff", fontWeight: "bold" }
});