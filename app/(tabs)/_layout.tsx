// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <Ionicons name="people" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Mio Profilo',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}