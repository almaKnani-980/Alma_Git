import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1a1a3e",
          borderTopColor: "#8b5cf6",
          borderTopWidth: 2,
          height: 65,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#ff6b9d",
        tabBarInactiveTintColor: "#8b5cf6",
        headerShown: false,
      }}
    >
      {}
      <Tabs.Screen
        name="index"
        options={{
          title: "To-Do",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📝</Text>,
        }}
      />
      
      {}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>💬</Text>,
        }}
      />

      {}
      <Tabs.Screen
        name="components"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}