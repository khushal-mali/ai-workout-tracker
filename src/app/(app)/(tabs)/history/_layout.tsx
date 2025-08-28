import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Workout History",
          headerBackTitle: "Workouts",
        }}
        name="workout-record"
      />
    </Stack>
  );
};

export default Layout;
