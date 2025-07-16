import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { router } from 'expo-router';

export function ContinueLearningCard() {
  const handleTakeQuiz = () => {
    router.push({
      pathname: '/quiz',
      params: { skillId: 'public-speaking', skillName: 'Confident Public Speaking' }
    });
  };

  return (
    <View className="mx-6 mt-6">
      <LinearGradient
        colors={['#3b82f6', '#8b5cf6']}
        className="rounded-2xl p-6"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-white font-semibold text-lg mb-2">
              Continue Learning
            </Text>
            <Text className="text-white/80 mb-4">
              Confident Public Speaking
            </Text>
            <View className="bg-white/20 rounded-full h-2 mb-4">
              <View className="bg-white rounded-full h-2 w-3/5" />
            </View>
            <TouchableOpacity 
              className="bg-white rounded-lg px-4 py-2 self-start"
              onPress={handleTakeQuiz}
            >
              <Text className="text-primary-600 font-semibold">Take Quiz</Text>
            </TouchableOpacity>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-full justify-center items-center ml-4">
            <Play size={24} color="white" fill="white" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}