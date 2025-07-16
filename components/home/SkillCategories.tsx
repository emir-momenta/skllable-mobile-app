import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const categories = [
  { name: 'Public Speaking', icon: '🎤', color: 'bg-blue-100', textColor: 'text-blue-700' },
  { name: 'Sales & Negotiation', icon: '💼', color: 'bg-green-100', textColor: 'text-green-700' },
  { name: 'Leadership', icon: '👑', color: 'bg-purple-100', textColor: 'text-purple-700' },
  { name: 'Confidence Building', icon: '💪', color: 'bg-orange-100', textColor: 'text-orange-700' }
];

export function SkillCategories() {
  return (
    <View className="px-6 mt-8">
      <Text className="text-xl font-bold text-gray-900 mb-4">Explore by Category</Text>
      <View className="flex-row flex-wrap justify-between">
        {categories.map((category, index) => (
          <TouchableOpacity key={index} className={`${category.color} rounded-xl p-4 mb-3 w-[48%]`}>
            <Text className="text-2xl mb-2">{category.icon}</Text>
            <Text className={`font-semibold ${category.textColor}`}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}