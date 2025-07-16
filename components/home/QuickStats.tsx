import React from 'react';
import { View, Text } from 'react-native';
import { Clock, Target } from 'lucide-react-native';

export function QuickStats() {
  return (
    <View className="flex-row mx-6 mt-6 space-x-4">
      <View className="flex-1 bg-white rounded-xl p-4">
        <View className="flex-row items-center mb-2">
          <Clock size={20} color="#3b82f6" />
          <Text className="text-gray-600 ml-2 text-sm">This Week</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900">4.2h</Text>
      </View>
      <View className="flex-1 bg-white rounded-xl p-4">
        <View className="flex-row items-center mb-2">
          <Target size={20} color="#10b981" />
          <Text className="text-gray-600 ml-2 text-sm">Skills Mastered</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900">12</Text>
      </View>
    </View>
  );
}