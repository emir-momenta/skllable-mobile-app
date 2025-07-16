import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check, Star, Zap, Users, BookOpen, TrendingUp, Shield } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2 - 8; // Account for padding and gap between cards

interface TierOption {
  id: 'free' | 'premium';
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const tiers: TierOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    icon: <BookOpen size={24} color="#6b7280" />,
    color: 'border-gray-300',
    bgColor: 'bg-gray-50',
    features: [
      'Access to 1 skill at a time',
      'Basic learning materials',
      'Progress tracking',
      'Daily streak counter',
      'Ad-supported experience',
      'Community access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$4.99',
    description: 'Unlock your full potential',
    icon: <Star size={24} color="#f59e0b" />,
    color: 'border-primary-500',
    bgColor: 'bg-primary-50',
    popular: true,
    features: [
      'Unlimited skills access',
      'Ad-free experience',
      'Premium book content',
      'Personalized learning paths',
      'Advanced analytics',
      'Priority community support',
      'Exclusive masterclasses',
      'Offline content download'
    ]
  }
];

export default function TierSelectionScreen() {
  const [selectedTier, setSelectedTier] = useState<'free' | 'premium'>('premium');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    
    // Simulate API call to save tier selection
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 pt-6 pb-8">
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-primary-100 rounded-2xl justify-center items-center mb-4">
            <Zap size={28} color="#3b82f6" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</Text>
          <Text className="text-gray-600 text-center">
            Select the plan that best fits your learning goals
          </Text>
        </View>

        {/* Progress Indicator */}
        <View className="flex-row items-center justify-center space-x-2">
          <View className="w-8 h-2 bg-primary-600 rounded-full" />
          <View className="w-8 h-2 bg-primary-600 rounded-full" />
          <View className="w-8 h-2 bg-primary-600 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Tier Cards - Side by Side */}
        <View className="flex-row justify-between mt-6 mb-8" style={{ gap: 16 }}>
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <TouchableOpacity
                key={tier.id}
                onPress={() => setSelectedTier(tier.id)}
                className={`relative bg-white rounded-2xl p-4 border-2 ${
                  isSelected ? tier.color : 'border-gray-200'
                }`}
                style={{ width: cardWidth }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <View className="bg-primary-600 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-semibold">Most Popular</Text>
                    </View>
                  </View>
                )}

                {/* Selection Indicator */}
                <View className="absolute top-3 right-3">
                  <View className={`w-5 h-5 rounded-full border-2 ${
                    isSelected 
                      ? 'bg-primary-600 border-primary-600' 
                      : 'border-gray-300'
                  } justify-center items-center`}>
                    {isSelected && <Check size={12} color="white" />}
                  </View>
                </View>

                {/* Header */}
                <View className="items-center mb-4 mt-2">
                  <View className={`w-12 h-12 ${tier.bgColor} rounded-xl justify-center items-center mb-3`}>
                    {tier.icon}
                  </View>
                  <Text className="text-lg font-bold text-gray-900 text-center">{tier.name}</Text>
                  <Text className="text-gray-600 text-sm text-center">{tier.description}</Text>
                </View>

                {/* Price */}
                <View className="items-center mb-4">
                  <View className="items-center">
                    <Text className="text-2xl font-bold text-gray-900">{tier.price}</Text>
                    {tier.id === 'premium' && (
                      <Text className="text-gray-600 text-sm">/month</Text>
                    )}
                  </View>
                  {tier.id === 'premium' && (
                    <Text className="text-gray-500 text-xs mt-1">Cancel anytime</Text>
                  )}
                </View>

                {/* Features */}
                <View className="space-y-2">
                  {tier.features.slice(0, 4).map((feature, index) => (
                    <View key={index} className="flex-row items-start">
                      <View className="w-4 h-4 bg-green-100 rounded-full justify-center items-center mr-2 mt-0.5">
                        <Check size={10} color="#10b981" />
                      </View>
                      <Text className="text-gray-700 text-xs flex-1 leading-4">{feature}</Text>
                    </View>
                  ))}
                  {tier.features.length > 4 && (
                    <Text className="text-primary-600 text-xs font-medium text-center mt-2">
                      +{tier.features.length - 4} more features
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Plan Details */}
        <View className="bg-white rounded-xl p-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            {tiers.find(t => t.id === selectedTier)?.name} Plan Features
          </Text>
          <View className="space-y-3">
            {tiers.find(t => t.id === selectedTier)?.features.map((feature, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-5 h-5 bg-green-100 rounded-full justify-center items-center mr-3">
                  <Check size={12} color="#10b981" />
                </View>
                <Text className="text-gray-700 flex-1">{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Trust Indicators */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-center space-x-6">
            <View className="items-center">
              <Shield size={20} color="#10b981" />
              <Text className="text-gray-600 text-xs mt-1">Secure</Text>
            </View>
            <View className="items-center">
              <Users size={20} color="#3b82f6" />
              <Text className="text-gray-600 text-xs mt-1">50k+ Users</Text>
            </View>
            <View className="items-center">
              <TrendingUp size={20} color="#f59e0b" />
              <Text className="text-gray-600 text-xs mt-1">Proven Results</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <Button 
          onPress={handleContinue}
          loading={isLoading}
          className="mb-2"
        >
          <View className="flex-row items-center">
            <Text className="text-white font-semibold mr-2">
              {selectedTier === 'premium' ? 'Start Premium Trial' : 'Start Free'}
            </Text>
            <ArrowRight size={20} color="white" />
          </View>
        </Button>
        
        {selectedTier === 'premium' && (
          <Text className="text-gray-500 text-xs text-center mt-2">
            7-day free trial, then $4.99/month. Cancel anytime.
          </Text>
        )}
        
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