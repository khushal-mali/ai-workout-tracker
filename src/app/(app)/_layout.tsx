import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Layout = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  console.log("IsSignedIn", isSignedIn);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#0000ff"} size={"large"} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
