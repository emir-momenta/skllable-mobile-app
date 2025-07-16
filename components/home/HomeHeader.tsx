import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';

export function HomeHeader() {
  return (
    <View className="flex-row justify-between items-center px-6 py-4 bg-white">
      <View>
        <Text className="text-2xl font-bold text-gray-900">Good morning!</Text>
        <Text className="text-gray-600">Ready to level up your skills?</Text>
      </View>
      <TouchableOpacity className="p-2">
        <Bell size={24} color="#374151" />
      </TouchableOpacity>
    </View>
  );
}