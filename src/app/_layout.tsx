import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { Slot } from "expo-router";
import "../global.css";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function Layout() {
  return (
    <ErrorBoundary>
      <ClerkProvider tokenCache={tokenCache}>
        <Slot screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </ErrorBoundary>
  );
}
