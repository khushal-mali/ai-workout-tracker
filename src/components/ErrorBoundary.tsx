import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-red-50 p-6">
          <ScrollView className="flex-1">
            <View className="items-center justify-center flex-1">
              <Text className="text-2xl font-bold text-red-800 mb-4">
                Something went wrong
              </Text>
              <Text className="text-red-600 text-center mb-6">
                The app encountered an error and needs to restart.
              </Text>

              {__DEV__ && this.state.error && (
                <View className="bg-red-100 p-4 rounded-lg mb-4 w-full">
                  <Text className="text-red-800 font-semibold mb-2">Error Details:</Text>
                  <Text className="text-red-700 text-sm">
                    {this.state.error.toString()}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                className="bg-red-600 px-6 py-3 rounded-lg"
                onPress={() =>
                  this.setState({
                    hasError: false,
                    error: undefined,
                    errorInfo: undefined,
                  })
                }
              >
                <Text className="text-white font-semibold">Try Again</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}
