import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Users, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const featuredSkillsData = [
  {
    title: 'Master Public Speaking',
    subtitle: 'Overcome fear and speak with confidence',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    students: '8.3k',
    rating: '4.9'
  },
  {
    title: 'Sales Psychology',
    subtitle: 'Understand buyer behavior and close deals',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    students: '5.7k',
    rating: '4.8'
  },
  {
    title: 'Executive Presence',
    subtitle: 'Command respect and lead with authority',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    students: '3.2k',
    rating: '4.9'
  }
];

export function FeaturedSkills() {
  const navigateToDiscover = () => {
    router.push('/(tabs)/discover');
  };

  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center px-6 mb-4">
        <Text className="text-xl font-bold text-gray-900">Featured Skills</Text>
        <TouchableOpacity onPress={navigateToDiscover}>
          <Text className="text-primary-600 font-semibold">See all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
        {featuredSkillsData.map((course, index) => (
          <TouchableOpacity key={index} className="bg-white rounded-xl mr-4 overflow-hidden w-64">
            <Image
              source={{ uri: course.image }}
              className="w-full h-32"
            />
            <View className="p-4">
              <Text className="font-semibold text-gray-900 mb-2">
                {course.title}
              </Text>
              <Text className="text-gray-600 text-sm mb-3">
                {course.subtitle}
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Users size={16} color="#9CA3AF" />
                  <Text className="text-gray-500 text-sm ml-1">{course.students} learners</Text>
                </View>
                <View className="flex-row items-center">
                  <Star size={16} color="#f59e0b" fill="#f59e0b" />
                  <Text className="text-gray-600 text-sm ml-1">{course.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}