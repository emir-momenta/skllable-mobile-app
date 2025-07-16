import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import { router } from 'expo-router';

interface InProgressCardProps {
  title: string;
  module: string;
  progress: number;
  timeRemaining: string;
  icon: React.ReactNode;
  skillId: string;
}

export function InProgressCard({ 
  title, 
  module, 
  progress, 
  timeRemaining, 
  icon, 
  skillId 
}: InProgressCardProps) {
  const handleStartQuiz = () => {
    router.push({
      pathname: '/quiz',
      params: { skillId, skillName: title }
    });
  };

  return (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 rounded-lg justify-center items-center mr-3">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900">{title}</Text>
          <Text className="text-gray-600 text-sm">{module}</Text>
        </View>
        <TouchableOpacity className="p-2" onPress={handleStartQuiz}>
          <Play size={20} color="#3b82f6" fill="#3b82f6" />
        </TouchableOpacity>
      </View>
      <View className="bg-gray-200 rounded-full h-2 mb-2">
        <View 
          className="bg-blue-500 rounded-full h-2" 
          style={{ width: `${progress}%` }}
        />
      </View>
      <Text className="text-gray-600 text-sm">{progress}% complete • {timeRemaining}</Text>
    </TouchableOpacity>
  );
}