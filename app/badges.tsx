import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  icon: string;
  requirement: string;
  earned: boolean;
  earnedDate?: string;
}

const allBadges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Completed your first skill quiz',
    type: 'bronze',
    icon: '🥉',
    requirement: 'Complete 1 quiz',
    earned: true,
    earnedDate: '2 weeks ago'
  },
  {
    id: 'quiz-streak-3',
    name: 'Consistent Learner',
    description: 'Completed 3 quizzes in a row',
    type: 'silver',
    icon: '🥈',
    requirement: 'Complete 3 quizzes',
    earned: false
  },
  {
    id: 'perfect-score',
    name: 'Perfectionist',
    description: 'Scored 100% on a quiz',
    type: 'gold',
    icon: '🥇',
    requirement: 'Score 100% on any quiz',
    earned: true,
    earnedDate: '1 week ago'
  },
  {
    id: 'skill-master',
    name: 'Skill Master',
    description: 'Mastered a complete skill module',
    type: 'platinum',
    icon: '💎',
    requirement: 'Complete all quizzes in a skill',
    earned: true,
    earnedDate: '3 days ago'
  },
  {
    id: 'week-streak',
    name: 'Weekly Warrior',
    description: 'Practiced for 7 days straight',
    type: 'silver',
    icon: '🔥',
    requirement: 'Practice 7 days in a row',
    earned: false
  },
  {
    id: 'month-streak',
    name: 'Monthly Master',
    description: 'Practiced for 30 days straight',
    type: 'gold',
    icon: '⚡',
    requirement: 'Practice 30 days in a row',
    earned: false
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Completed a quiz in under 2 minutes',
    type: 'bronze',
    icon: '💨',
    requirement: 'Complete quiz under 2 minutes',
    earned: false
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 10 different skill quizzes',
    type: 'platinum',
    icon: '🧠',
    requirement: 'Complete 10 different skills',
    earned: false
  }
];

export default function BadgesScreen() {
  const earnedBadges = allBadges.filter(badge => badge.earned);
  const lockedBadges = allBadges.filter(badge => !badge.earned);

  const getBadgeGradient = (type: string, earned: boolean) => {
    if (!earned) {
      return ['#e5e7eb', '#d1d5db']; // Gray gradient for locked badges
    }
    
    switch (type) {
      case 'platinum':
        return ['#8b5cf6', '#7c3aed'];
      case 'gold':
        return ['#fbbf24', '#f59e0b'];
      case 'silver':
        return ['#d1d5db', '#9ca3af'];
      case 'bronze':
        return ['#cd7c2f', '#a16207'];
      default:
        return ['#e5e7eb', '#d1d5db'];
    }
  };

  const renderBadge = (badge: Badge) => {
    const gradientColors = getBadgeGradient(badge.type, badge.earned);
    
    return (
      <View key={badge.id} className="w-[48%] mb-6">
        <View className="bg-white rounded-2xl p-4 items-center shadow-sm">
          <LinearGradient
            colors={gradientColors}
            className="w-20 h-20 rounded-full justify-center items-center mb-3"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text className={`text-3xl ${!badge.earned ? 'opacity-40' : ''}`}>
              {badge.icon}
            </Text>
          </LinearGradient>
          
          <Text className={`font-bold text-center mb-1 ${
            badge.earned ? 'text-gray-900' : 'text-gray-400'
          }`}>
            {badge.name}
          </Text>
          
          <Text className={`text-xs text-center mb-2 ${
            badge.earned ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {badge.description}
          </Text>
          
          {badge.earned ? (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-700 text-xs font-medium">
                Earned {badge.earnedDate}
              </Text>
            </View>
          ) : (
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-gray-500 text-xs">
                {badge.requirement}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900 flex-1">All Badges</Text>
        </View>
        
        {/* Stats */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">{earnedBadges.length}</Text>
            <Text className="text-gray-600 text-sm">Badges Earned</Text>
          </View>
          <View>
            <Text className="text-2xl font-bold text-gray-900">{lockedBadges.length}</Text>
            <Text className="text-gray-600 text-sm">Still Locked</Text>
          </View>
          <View>
            <Text className="text-2xl font-bold text-primary-600">
              {Math.round((earnedBadges.length / allBadges.length) * 100)}%
            </Text>
            <Text className="text-gray-600 text-sm">Complete</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Earned Badges ({earnedBadges.length})
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {earnedBadges.map(renderBadge)}
            </View>
          </View>
        )}

        {/* Locked Badges Section */}
        {lockedBadges.length > 0 && (
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Locked Badges ({lockedBadges.length})
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {lockedBadges.map(renderBadge)}
            </View>
          </View>
        )}

        {/* Motivational Message */}
        <View className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-6 mb-6">
          <Text className="text-primary-900 font-semibold mb-2">Keep Learning!</Text>
          <Text className="text-primary-800 text-sm">
            Complete more quizzes and maintain your practice streak to unlock more badges and showcase your skills mastery.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}