import React from 'react';
import { View, Text } from 'react-native';

const skillsData = [
  { skill: 'Voice Projection', progress: 85, color: 'bg-green-500' },
  { skill: 'Body Language', progress: 70, color: 'bg-blue-500' },
  { skill: 'Storytelling', progress: 60, color: 'bg-yellow-500' },
  { skill: 'Audience Engagement', progress: 45, color: 'bg-orange-500' }
];

export function SkillMilestones() {
  return (
    <View className="px-6 mt-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Skill Milestones</Text>
      
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-semibold text-gray-900">Public Speaking Level</Text>
          <Text className="text-primary-600 font-bold">Intermediate</Text>
        </View>
        <View className="space-y-3">
          {skillsData.map((item, index) => (
            <View key={index}>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-700 text-sm">{item.skill}</Text>
                <Text className="text-gray-600 text-sm">{item.progress}%</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2">
                <View 
                  className={`${item.color} rounded-full h-2`} 
                  style={{ width: `${item.progress}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}