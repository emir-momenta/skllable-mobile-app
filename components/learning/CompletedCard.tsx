import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle } from 'lucide-react-native';

interface CompletedCardProps {
  title: string;
  completedDate: string;
  duration: string;
  color: string;
  iconColor: string;
}

export function CompletedCard({ 
  title, 
  completedDate, 
  duration, 
  color, 
  iconColor 
}: CompletedCardProps) {
  return (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center">
        <View className={`w-12 h-12 ${color} rounded-lg justify-center items-center mr-3`}>
          <CheckCircle size={20} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900">{title}</Text>
          <Text className="text-gray-600 text-sm">Completed {completedDate}</Text>
        </View>
        <View className="items-end">
          <Text className="text-green-600 font-semibold text-sm">100%</Text>
          <Text className="text-gray-500 text-xs">{duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}