import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "react-native";

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          title: "Active Workout",
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          // href: null,
          tabBarIcon: ({ color, size }) => (
            // <Image source={}/>
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
