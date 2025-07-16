import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200';
      case 'outline':
        return 'bg-transparent border border-gray-300';
      default:
        return 'bg-primary-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2';
      case 'lg':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-900';
      case 'outline':
        return 'text-gray-700';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg flex-row justify-center items-center ${getVariantStyles()} ${getSizeStyles()} ${
        disabled || loading ? 'opacity-50' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : '#374151'} 
          className="mr-2"
        />
      )}
      <Text className={`font-semibold text-center ${getTextColor()}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}