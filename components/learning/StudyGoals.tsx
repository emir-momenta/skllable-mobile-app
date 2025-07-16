import React from 'react';
import { View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';

export function StudyGoals() {
  return (
    <View className="px-6 mt-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">This Week's Goal</Text>
      
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Clock size={20} color="#f59e0b" />
            <Text className="font-semibold text-gray-900 ml-2">Practice Time</Text>
          </View>
          <Text className="text-gray-600">4.2h / 6h</Text>
        </View>
        <View className="bg-gray-200 rounded-full h-3 mb-2">
          <View className="bg-yellow-500 rounded-full h-3 w-2/3" />
        </View>
        <Text className="text-gray-600 text-sm">Great progress! You're 70% towards your weekly goal.</Text>
      </View>
    </View>
  );
}