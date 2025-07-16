import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Target, Award } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { LearningHeader } from '@/components/learning/LearningHeader';
import { InProgressCard } from '@/components/learning/InProgressCard';
import { CompletedCard } from '@/components/learning/CompletedCard';
import { StudyGoals } from '@/components/learning/StudyGoals';
import { SkillMilestones } from '@/components/learning/SkillMilestones';

export default function LearningTab() {
  const inProgressData = [
    {
      title: 'Confident Public Speaking',
      module: 'Module 3 of 8 • Overcoming Stage Fright',
      progress: 37,
      timeRemaining: '4h 15m remaining',
      icon: <BookOpen size={20} color="#3b82f6" />,
      skillId: 'public-speaking',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Sales Psychology Mastery',
      module: 'Module 2 of 6 • Understanding Buyer Behavior',
      progress: 33,
      timeRemaining: '5h 45m remaining',
      icon: <Target size={20} color="#10b981" />,
      skillId: 'sales-psychology',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Executive Leadership Presence',
      module: 'Module 1 of 5 • Building Your Personal Brand',
      progress: 20,
      timeRemaining: '4h 36m remaining',
      icon: <Award size={20} color="#8b5cf6" />,
      skillId: 'leadership',
      bgColor: 'bg-purple-100'
    }
  ];

  const completedData = [
    {
      title: 'Confidence Building Fundamentals',
      completedDate: '3 days ago',
      duration: '6h 30m',
      color: 'bg-orange-100',
      iconColor: '#f97316'
    },
    {
      title: 'Effective Networking Strategies',
      completedDate: '1 week ago',
      duration: '4h 15m',
      color: 'bg-indigo-100',
      iconColor: '#6366f1'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      <LearningHeader />

      <ScrollView className="flex-1">
        {/* In Progress */}
        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">In Progress</Text>
          {inProgressData.map((item, index) => (
            <InProgressCard key={index} {...item} />
          ))}
        </View>

        {/* Completed */}
        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Recently Completed</Text>
          {completedData.map((item, index) => (
            <CompletedCard key={index} {...item} />
          ))}
        </View>

        <StudyGoals />
        <SkillMilestones />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
