import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Star, Target, TrendingUp, Plus, CircleCheck as CheckCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function DiscoverTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedSkills, setAddedSkills] = useState<number[]>([1]); // Track added skills by index

  const categories = ['All', 'Public Speaking', 'Sales', 'Leadership', 'Confidence', 'Negotiation', 'Networking'];

  const skills = [
    {
      title: 'Confident Public Speaking',
      description: 'Transform your fear into powerful presentations through daily practice',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      practiceCount: '12.5k',
      category: 'Public Speaking'
    },
    {
      title: 'Sales Psychology & Persuasion',
      description: 'Master the art of influence through understanding buyer behavior',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      practiceCount: '9.2k',
      category: 'Sales'
    },
    {
      title: 'Executive Leadership Presence',
      description: 'Command respect and inspire your team with authentic leadership',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      practiceCount: '7.8k',
      category: 'Leadership'
    },
    {
      title: 'Unshakeable Confidence Building',
      description: 'Develop rock-solid self-confidence through proven daily exercises',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      practiceCount: '15.3k',
      category: 'Confidence'
    },
    {
      title: 'Master Negotiation Tactics',
      description: 'Win-win strategies for any negotiation scenario',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      practiceCount: '6.4k',
      category: 'Negotiation'
    },
    {
      title: 'Strategic Networking Skills',
      description: 'Build meaningful professional relationships that advance your career',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      practiceCount: '8.1k',
      category: 'Networking'
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSkill = (index: number) => {
    setAddedSkills(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-4 pb-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Discover Skills</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search soft skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity className="p-1">
            <Filter size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mb-6">
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedCategory === category
                  ? 'bg-primary-600'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category ? 'text-white' : 'text-gray-700'
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Banner */}
        <View className="mx-6 mb-6">
          <LinearGradient
            colors={['#fb923c', '#ec4899']}
            className="rounded-xl p-4"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row items-center mb-2">
              <TrendingUp size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Trending Now</Text>
            </View>
            <Text className="text-white text-sm">
              Public Speaking skills are in high demand - Start your daily practice today!
            </Text>
          </LinearGradient>
        </View>

        {/* Skills List */}
        <View className="px-6 space-y-4">
          {filteredSkills.map((skill, index) => {
            const originalIndex = skills.findIndex(s => s.title === skill.title);
            const isAdded = addedSkills.includes(originalIndex);
            
            return (
              <TouchableOpacity key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <View className="flex-row">
                  <Image
                    source={{ uri: skill.image }}
                    className="w-24 h-24"
                  />
                  <View className="flex-1 p-4">
                    <View className="flex-row items-start justify-between mb-2">
                      <Text className="font-semibold text-gray-900 flex-1 mr-2">
                        {skill.title}
                      </Text>
                      <TouchableOpacity 
                        onPress={() => toggleSkill(originalIndex)}
                        className={`px-3 py-1 rounded-full flex-row items-center ${
                          isAdded ? 'bg-green-100' : 'bg-primary-100'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle size={14} color="#10b981" />
                            <Text className="text-green-700 text-xs font-medium ml-1">Added</Text>
                          </>
                        ) : (
                          <>
                            <Plus size={14} color="#3b82f6" />
                            <Text className="text-primary-700 text-xs font-medium ml-1">Add</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text className="text-gray-600 text-sm mb-3">
                      {skill.description}
                    </Text>
                    <View className="flex-row items-center space-x-4">
                      <View className="flex-row items-center">
                        <Star size={14} color="#f59e0b" fill="#f59e0b" />
                        <Text className="text-gray-600 text-sm ml-1">{skill.rating}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Target size={14} color="#9CA3AF" />
                        <Text className="text-gray-600 text-sm ml-1">{skill.practiceCount} practicing</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* No Results Message */}
        {filteredSkills.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-gray-500 text-lg mb-2">No skills found</Text>
            <Text className="text-gray-400 text-center">
              Try searching with different keywords or select a different category
            </Text>
          </View>
        )}

        {/* Practice Reminder */}
        <View className="mx-6 mt-6 mb-6">
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <View className="flex-row items-center mb-2">
              <Target size={20} color="#3b82f6" />
              <Text className="text-blue-900 font-semibold ml-2">Daily Practice Reminder</Text>
            </View>
            <Text className="text-blue-800 text-sm">
              Complete daily quizzes for your added skills to track your improvement and build consistency.
            </Text>
          </View>
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}