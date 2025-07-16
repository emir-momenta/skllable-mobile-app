import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit3, Award, BookOpen, Users, Star, ChevronRight, Target, TrendingUp, Calendar, LogOut } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function ProfileTab() {
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            // Clear any stored user data here
            router.replace('/splash');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
          <TouchableOpacity>
            <Settings size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View className="flex-row items-center">
          <View className="w-20 h-20 bg-primary-100 rounded-full justify-center items-center mr-4">
            <Text className="text-2xl font-bold text-primary-600">AS</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-bold text-gray-900">Alex Smith</Text>
              <TouchableOpacity className="ml-2">
                <Edit3 size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600 mb-1">Aspiring Public Speaker</Text>
            <Text className="text-gray-500 text-sm">Member since March 2024</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Stats */}
        <View className="flex-row mx-6 mt-6 space-x-4">
          <View className="flex-1 bg-white rounded-xl p-4">
            <View className="items-center">
              <BookOpen size={24} color="#3b82f6" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">8</Text>
              <Text className="text-gray-600 text-sm">Skills Learning</Text>
            </View>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4">
            <View className="items-center">
              <Award size={24} color="#10b981" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">5</Text>
              <Text className="text-gray-600 text-sm">Skills Mastered</Text>
            </View>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4">
            <View className="items-center">
              <TrendingUp size={24} color="#f59e0b" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">23</Text>
              <Text className="text-gray-600 text-sm">Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Badges & Achievements</Text>
            <TouchableOpacity onPress={() => router.push('/badges')}>
              <Text className="text-primary-600 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {/* Recent Badges Preview - Show 3 most recent */}
            <View className="flex-row justify-between mb-4">
              {/* Earned Badge 1 */}
              <View className="items-center flex-1 mx-1">
                <View className="w-16 h-16 rounded-full items-center justify-center mb-2" style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                }}>
                  <Text className="text-2xl">🥇</Text>
                </View>
                <Text className="text-xs font-semibold text-gray-900 text-center">Perfectionist</Text>
              </View>

              {/* Earned Badge 2 */}
              <View className="items-center flex-1 mx-1">
                <View className="w-16 h-16 rounded-full items-center justify-center mb-2" style={{
                  background: 'linear-gradient(135deg, #cd7c2f 0%, #a16207 100%)'
                }}>
                  <Text className="text-2xl">🥉</Text>
                </View>
                <Text className="text-xs font-semibold text-gray-900 text-center">First Steps</Text>
              </View>

              {/* Earned Badge 3 */}
              <View className="items-center flex-1 mx-1">
                <View className="w-16 h-16 rounded-full items-center justify-center mb-2" style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                }}>
                  <Text className="text-2xl">💎</Text>
                </View>
                <Text className="text-xs font-semibold text-gray-900 text-center">Skill Master</Text>
              </View>

              {/* Locked Badge Preview */}
              <View className="items-center flex-1 mx-1">
                <View className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 items-center justify-center mb-2">
                  <Text className="text-2xl opacity-40">🥈</Text>
                </View>
                <Text className="text-xs font-medium text-gray-400 text-center">Locked</Text>
              </View>
            </View>
            
            <View className="pt-4 border-t border-gray-100">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 font-medium">Progress</Text>
                <Text className="text-primary-600 font-bold">3 of 8 badges earned</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2 mt-2">
                <View className="bg-primary-500 rounded-full h-2" style={{ width: '37.5%' }} />
              </View>
            </View>
          </View>
        </View>

        {/* Skill Progress */}
        <View className="px-6 mt-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">Skill Progress</Text>
          
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-lg justify-center items-center mr-3">
                  <Text className="text-blue-600 font-bold">🎤</Text>
                </View>
                <View>
                  <Text className="font-semibold text-gray-900">Public Speaking</Text>
                  <Text className="text-gray-600 text-sm">Intermediate Level</Text>
                </View>
              </View>
              <Text className="text-blue-600 font-bold">72%</Text>
            </View>
            <View className="bg-gray-200 rounded-full h-2">
              <View className="bg-blue-500 rounded-full h-2 w-3/4" />
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-lg justify-center items-center mr-3">
                  <Text className="text-green-600 font-bold">💼</Text>
                </View>
                <View>
                  <Text className="font-semibold text-gray-900">Sales Skills</Text>
                  <Text className="text-gray-600 text-sm">Beginner Level</Text>
                </View>
              </View>
              <Text className="text-green-600 font-bold">35%</Text>
            </View>
            <View className="bg-gray-200 rounded-full h-2">
              <View className="bg-green-500 rounded-full h-2 w-1/3" />
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-purple-100 rounded-lg justify-center items-center mr-3">
                  <Text className="text-purple-600 font-bold">👑</Text>
                </View>
                <View>
                  <Text className="font-semibold text-gray-900">Leadership</Text>
                  <Text className="text-gray-600 text-sm">Beginner Level</Text>
                </View>
              </View>
              <Text className="text-purple-600 font-bold">18%</Text>
            </View>
            <View className="bg-gray-200 rounded-full h-2">
              <View className="bg-purple-500 rounded-full h-2 w-1/5" />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-8">
          <View className="bg-white rounded-xl overflow-hidden shadow-sm">
            {[
              { title: 'My Certificates', icon: Award, color: '#10b981' },
              { title: 'Learning History', icon: BookOpen, color: '#3b82f6' },
              { title: 'Practice Schedule', icon: Calendar, color: '#8b5cf6' },
              { title: 'Community & Mentors', icon: Users, color: '#f59e0b' },
              { title: 'Account Settings', icon: Settings, color: '#6b7280' },
            ].map((item, index) => (
              <TouchableOpacity
                key={item.title}
                className={`flex-row items-center p-4 ${
                  index < 4 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="w-10 h-10 bg-gray-100 rounded-lg justify-center items-center mr-3">
                  <item.icon size={20} color={item.color} />
                </View>
                <Text className="flex-1 font-medium text-gray-900">{item.title}</Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Section */}
        <View className="px-6 mt-6 mb-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white rounded-xl p-4 shadow-sm border border-red-200"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-100 rounded-lg justify-center items-center mr-3">
                <LogOut size={20} color="#ef4444" />
              </View>
              <Text className="flex-1 font-medium text-red-600">Log Out</Text>
              <ChevronRight size={20} color="#ef4444" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}