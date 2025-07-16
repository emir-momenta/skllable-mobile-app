import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ 
  label, 
  error, 
  leftIcon, 
  rightIcon, 
  className = '',
  ...props 
}: InputProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}
      <View className={`flex-row items-center bg-white border rounded-lg px-3 py-3 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}>
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-gray-900 text-sm"
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}