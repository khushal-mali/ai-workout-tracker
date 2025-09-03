import { client } from "@/lib/sanity/client";
import { GetWorkoutsQueryResult } from "@/lib/sanity/types";
import { useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate, getWorkoutsQuery } from "./history";
import { formatDuration } from "lib/utils";
import { Ionicons } from "@expo/vector-icons";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [workouts, setWorkouts] = useState<GetWorkoutsQueryResult>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWorkouts = async () => {
    if (!user?.id) return;

    try {
      const results = await client.fetch(getWorkoutsQuery, {
        userId: user.id,
      });
      setWorkouts(results);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkouts();
  };

  // Calculate Stats
  const totalWorkouts = workouts.length;
  const lastWorkout = workouts[0];
  const totalDuration = workouts.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );
  const averageDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  const getTotalSets = (workout: GetWorkoutsQueryResult[number]) => {
    return (
      workout.exercises?.reduce((total, exercise) => {
        return total + (exercise.sets?.length || 0);
      }, 0) || 0
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={"#3B82F6"} />
          <Text className="text-gray-600 mt-4">Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor={"#f9fafb"} />

      <ScrollView
        className="flex-1 pb-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <Text className="text-lg text-gray-600">Welcome back,</Text>
          <Text className="text-3xl font-bold text-gray-900">
            {user?.firstName || "Athlete"}! 💪
          </Text>
        </View>

        {/* Stats Overview */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Your Fitness Stats
            </Text>

            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-600">{totalWorkouts}</Text>
                <Text className="text-sm text-gray-600 text-center">
                  Total{"\n"}Workouts
                </Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-green-600">
                  {formatDuration(totalDuration)}
                </Text>
                <Text className="text-sm text-gray-600 text-center">Total{"\n"}Time</Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-purple-600">
                  {averageDuration > 0 ? formatDuration(averageDuration) : "0m"}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  Average{"\n"}Duration
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</Text>

          {/* Start Workout Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-2xl p-6 mb-4 shadow-sm"
            onPress={() => router.push("/workout")}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-4">
                  <Ionicons name="play" size={24} color={"white"} />
                </View>
                <View>
                  <Text className="text-white text-xl font-semibold">Start Workout</Text>
                  <Text className="text-blue-100">Begin your traning session</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={"white"} />
            </View>
          </TouchableOpacity>

          {/* Action Card */}
          <View className="flex-row gap-4 mb-4">
            <TouchableOpacity
              className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-gray-100"
              activeOpacity={0.7}
              onPress={() => router.push("/history")}
            >
              <View className="items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
                  <Ionicons name="time-outline" size={24} color={"#6B7280"} />
                </View>
                <Text className="text-gray-900 font-medium text-center">
                  Workout{"\n"}History
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-gray-100"
              activeOpacity={0.7}
              onPress={() => router.push("/exercises")}
            >
              <View className="items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
                  <Ionicons name="barbell-outline" size={24} color={"#6B7280"} />
                </View>
                <Text className="text-gray-900 font-medium text-center">
                  Browse{"\n"}Exercises
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Last Workout */}
          {lastWorkout && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Last Workout
              </Text>

              <TouchableOpacity
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                onPress={() => {
                  router.push({
                    pathname: "/history/workout-record",
                    params: { workoutId: lastWorkout._id },
                  });
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-lg font-semibold text-gray-900">
                      {formatDate(lastWorkout.date || "")}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="time-outline" size={16} color={"#6B7280"} />
                      <Text className="text-gray-600 ml-2">
                        {lastWorkout.duration
                          ? formatDuration(lastWorkout.duration)
                          : "Duration not recorded"}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-blue-100 rounded-full w-12 h-12 items-center justify-center">
                    <Ionicons name="fitness-outline" size={24} color={"#3B82F6"} />
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">
                    {lastWorkout.exercises?.length || 0} exercises •{" "}
                    {getTotalSets(lastWorkout)} sets
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={"#6B7280"} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Empty State for No Workouts */}
          {totalWorkouts === 0 && (
            <View className="px-6 mb-4">
              <View className="bg-white rounded-2xl p-8 items-center shadow-sm border border-gray-100">
                <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                  <Ionicons name="barbell-outline" size={32} color={"#3b82f6"} />
                </View>
                <Text className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to start your fitness journey?
                </Text>
                <Text className="text-gray-600 text-center mb-4">
                  Track your workouts and see your progress over time
                </Text>
                <TouchableOpacity
                  className="bg-blue-600 rounded-xl px-6 py-3"
                  activeOpacity={0.8}
                  onPress={() => router.push("/workout")}
                >
                  <Text className="text-white font-semibold">
                    Start Your First Workout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
