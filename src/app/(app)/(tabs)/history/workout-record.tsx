import { client } from "@/lib/sanity/client";
import { GetWorkoutRecordQueryResult } from "@/lib/sanity/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defineQuery } from "groq";
import { formatDuration } from "lib/utils";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const getWorkoutRecordQuery = defineQuery(
  `*[_type == "workout" && _id == $workoutId][0] {
    _id,
    _type,
    _createdAt,
    date,
    duration,
    exercises[] {
      exercise-> {
        _id,
        name,
        description
      },
      sets[] {
        reps,
        weight,
        weightUnit,
        _type,
        _key
      },
      _type,
      _key
    }
  }`
);

const WorkoutRecordPage = () => {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<GetWorkoutRecordQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!workoutId) return;

      try {
        const result = await client.fetch(getWorkoutRecordQuery, { workoutId });
        setWorkout(result);
      } catch (error) {
        console.error("Error fetching workout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatWorkoutDuration = (seconds?: number) => {
    if (!seconds) return "Duration not recorded";
    return formatDuration(seconds);
  };

  const getTotalSets = () => {
    return (
      workout?.exercises.reduce((total, exercise) => {
        return total + (exercise.sets?.length || 0);
      }, 0) || 0
    );
  };

  const getTotalVolume = () => {
    if (!workout?.exercises) return { volume: 0, unit: "lbs" };

    return workout.exercises.reduce(
      (acc, exercise) => {
        if (exercise.sets) {
          exercise.sets.forEach((set) => {
            if (set.weight && set.reps) {
              acc.volume += set.weight * set.reps;
              acc.unit = set.weightUnit || "lbs";
            }
          });
        }
        return acc;
      },
      { volume: 0, unit: "lbs" }
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={"#3B82F6"} />
          <Text className="text-gray-600 mt-4">Loading workout...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!workout) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="items-center justify-center flex-1">
          <Ionicons name="alert-circle-outline" size={64} color={"#EF4444"} />

          <Text className="text-xl font-semibold text-gray-900 mt-4">
            Workout Not Found
          </Text>

          <Text className="text-gray-600 text-center mt-2">
            This workout record could not be found.
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { unit, volume } = getTotalVolume();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Workout summary */}
        <View className="bg-white p-6 border-b border-gray-300">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Workout Summary</Text>
            <TouchableOpacity
              disabled={deleting}
              // onPress={handleDeleteWorkout}
              className="bg-red-600 rounded-lg px-4 py-2 flex-row items-center"
            >
              {deleting ? (
                <ActivityIndicator size={"small"} color={"#ffffff"} />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={16} color={"#ffffff"} />
                  <Text className="text-white font-medium ml-2">Delete</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="calendar-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatDate(workout.date)} at {formatTime(workout.date)}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="time-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatWorkoutDuration(workout.duration)}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="fitness-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {workout.exercises?.length || 0} exercises
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="bar-chart-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {getTotalSets()} total sets
            </Text>
          </View>

          {volume > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="barbell-outline" size={20} color={"#6B7280"} />
              <Text className="text-gray-700 ml-3 font-medium">
                {volume.toLocaleString()} {unit} total volume
              </Text>
            </View>
          )}
        </View>

        {/* Exercises List */}
        <View className="space-y-4 p-6 gap-4">
          {workout.exercises?.map((exerciseData, index) => {
            return (
              <View
                key={exerciseData._key}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                {/* Exercise Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900">
                      {exerciseData.exercise?.name || "Unknown Exercise"}
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                      {exerciseData?.sets?.length || 0} sets completed
                    </Text>
                  </View>

                  <View className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center">
                    <Text className="text-blue-600 font-bold">{index + 1}</Text>
                  </View>
                </View>

                {/* Sets */}
                <View className="space-y-2">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Sets:</Text>

                  {exerciseData.sets?.map((set, setIndex) => (
                    <View
                      className="bg-gray-50 rounded-lg p-3 flex-row items-center justify-between"
                      key={set._key}
                    >
                      <View className="flex-row items-center">
                        <View className="w-6 h-6 rounded-full mr-3 bg-gray-200 items-center justify-center">
                          <Text className="text-gray-700 font-medium text-xs ">
                            {setIndex + 1}
                          </Text>
                        </View>

                        <Text className="text-gray-900 font-medium">{set.reps} reps</Text>
                      </View>

                      {set.weight && (
                        <View className="flex-row items-center">
                          <Ionicons name="barbell-outline" size={16} color={"#6B7280"} />

                          <Text className="text-gray-700 ml-2 font-medium">
                            {set.weight} {set.weightUnit || "lbs"}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>

                {/* Exercise Volume Summary */}
                {exerciseData.sets && exerciseData.sets.length > 0 && (
                  <View className="mt-4 pt-4 border-t border-gray-100">
                    <View className="flex-row items-center justify-between">
                      <Text>Exercise Volume:</Text>
                      <Text>
                        {exerciseData.sets
                          .reduce((total, set) => {
                            return total + (set.weight || 0) * (set.reps || 0);
                          }, 0)
                          .toLocaleString()}{" "}
                        {exerciseData.sets[0]?.weightUnit || "lbs"}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutRecordPage;
