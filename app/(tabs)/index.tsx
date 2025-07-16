import React from 'react';
import { ScrollView, View } from 'react-native'; // <-- View added here
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HomeHeader } from '@/components/home/HomeHeader';
import { ContinueLearningCard } from '@/components/home/ContinueLearningCard';
import { QuickStats } from '@/components/home/QuickStats';
import { FeaturedSkills } from '@/components/home/FeaturedSkills';
import { StreakCalendar } from '@/components/ui/StreakCalendar';
import { SkillCategories } from '@/components/home/SkillCategories';

export default function HomeTab() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        <HomeHeader />
        <ContinueLearningCard />
        <QuickStats />
        <FeaturedSkills />
        <StreakCalendar currentStreak={23} />
        <SkillCategories />
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
