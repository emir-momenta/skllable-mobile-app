import React from 'react';
import { View, Text } from 'react-native';

export function LearningHeader() {
  return (
    <View className="bg-white px-6 pt-4 pb-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">My Learning</Text>
      <Text className="text-gray-600">Continue building your soft skills</Text>
    </View>
  );
}