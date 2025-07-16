import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check, Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2 - 8; // Account for padding and gap

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

const skills: Skill[] = [
  {
    id: 'public-speaking',
    name: 'Public Speaking',
    description: 'Overcome fear and speak confidently',
    icon: '🎤',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'sales-skills',
    name: 'Sales Skills',
    description: 'Master persuasion and closing deals',
    icon: '💼',
    color: 'text-green-700',
    bgColor: 'bg-green-50'
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Inspire and guide your team',
    icon: '👑',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'confidence',
    name: 'Confidence Building',
    description: 'Develop unshakeable self-belief',
    icon: '💪',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'Win-win outcomes in any situation',
    icon: '🤝',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'Build meaningful professional relationships',
    icon: '🌐',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50'
  },
  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence',
    description: 'Understand and manage emotions',
    icon: '🧠',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'presentation-skills',
    name: 'Presentation Skills',
    description: 'Create compelling presentations',
    icon: '📊',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50'
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Express ideas clearly and effectively',
    icon: '💬',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'time-management',
    name: 'Time Management',
    description: 'Maximize productivity and efficiency',
    icon: '⏰',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50'
  },
  {
    id: 'conflict-resolution',
    name: 'Conflict Resolution',
    description: 'Navigate and resolve disputes',
    icon: '⚖️',
    color: 'text-red-700',
    bgColor: 'bg-red-50'
  },
  {
    id: 'team-building',
    name: 'Team Building',
    description: 'Foster collaboration and unity',
    icon: '👥',
    color: 'text-violet-700',
    bgColor: 'bg-violet-50'
  }
];

export default function SkillSelectionScreen() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter skills based on search query
  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) {
      return skills;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return skills.filter(skill => 
      skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleContinue = async () => {
    if (selectedSkills.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call to save selected skills
    setTimeout(() => {
      setIsLoading(false);
      router.push('/tier-selection');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-6 pb-8">
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-primary-100 rounded-2xl justify-center items-center mb-4">
            <Text className="text-2xl">🎯</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Choose Your Skills</Text>
          <Text className="text-gray-600 text-center">
            Select the soft skills you want to develop. You can always add more later.
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-6">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Progress Indicator */}
        <View className="flex-row items-center justify-center space-x-2">
          <View className="w-8 h-2 bg-primary-600 rounded-full" />
          <View className="w-8 h-2 bg-gray-200 rounded-full" />
          <View className="w-8 h-2 bg-gray-200 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Skills Grid */}
        <View className="flex-row flex-wrap justify-between mt-6">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill.id);
            return (
              <TouchableOpacity
                key={skill.id}
                onPress={() => toggleSkill(skill.id)}
                className={`mb-4 rounded-2xl p-4 border-2 ${
                  isSelected 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}
                style={{ width: cardWidth }}
              >
                <View className="items-center">
                  {/* Selection Indicator */}
                  <View className="absolute -top-2 -right-2 z-10">
                    {isSelected && (
                      <View className="w-6 h-6 bg-primary-600 rounded-full justify-center items-center">
                        <Check size={14} color="white" />
                      </View>
                    )}
                  </View>

                  {/* Icon */}
                  <View className={`w-16 h-16 ${skill.bgColor} rounded-2xl justify-center items-center mb-3`}>
                    <Text className="text-3xl">{skill.icon}</Text>
                  </View>

                  {/* Content */}
                  <Text className={`font-bold text-center mb-2 ${
                    isSelected ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    {skill.name}
                  </Text>
                  <Text className={`text-xs text-center leading-4 ${
                    isSelected ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {skill.description}
                  </Text>
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
              Try searching with different keywords
            </Text>
          </View>
        )}

        {/* Selection Counter */}
        <View className="bg-white rounded-xl p-4 mt-4 mb-6">
          <Text className="text-center text-gray-600">
            {selectedSkills.length === 0 
              ? 'Select at least one skill to continue'
              : selectedSkills.length === 1
              ? '1 skill selected'
              : `${selectedSkills.length} skills selected`
            }
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <Button 
          onPress={handleContinue}
          loading={isLoading}
          disabled={selectedSkills.length === 0}
          className="mb-2"
        >
          <View className="flex-row items-center">
            <Text className="text-white font-semibold mr-2">Continue</Text>
            <ArrowRight size={20} color="white" />
          </View>
        </Button>
        
        <TouchableOpacity 
          onPress={() => router.back()}
          className="py-3"
        >
          <Text className="text-gray-600 text-center font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}