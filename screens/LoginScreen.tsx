import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { FormStyles } from '@/components/ui/FormStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const updateField = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center py-8">
            {/* Header */}
            <View className="items-center mb-12">
              {/* Logo Container with Gradient Background */}
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#1F3A93', '#7FD8B4']}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image
                    source={require('@/assets/images/skllable.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
              <Text className="text-gray-600 text-center px-4">
                Continue building your soft skills and unlock your potential
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={[styles.inputContainer, { 
                height: FormStyles.INPUT_HEIGHT, 
                marginBottom: FormStyles.VERTICAL_GAP, 
                paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                borderRadius: FormStyles.BORDER_RADIUS 
              }]}>
                <Mail size={24} color="#9CA3AF" />
                <TextInput
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  accessibilityLabel="Email address"
                  style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              {/* Password Input */}
              <View style={[styles.inputContainer, { 
                height: FormStyles.INPUT_HEIGHT, 
                marginBottom: FormStyles.VERTICAL_GAP, 
                paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                borderRadius: FormStyles.BORDER_RADIUS 
              }]}>
                <Lock size={24} color="#9CA3AF" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  accessibilityLabel="Password"
                  style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={24} color="#9CA3AF" />
                  ) : (
                    <Eye size={24} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              {/* Forgot Password */}
              <TouchableOpacity style={[styles.forgotPassword, { marginBottom: FormStyles.VERTICAL_GAP }]}>
                <Text className="text-primary-600 font-medium">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <Button 
                onPress={handleLogin} 
                loading={isLoading}
                style={[styles.button, { 
                  height: FormStyles.INPUT_HEIGHT, 
                  marginTop: FormStyles.VERTICAL_GAP
                }]}
              >
                Sign In
              </Button>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/registration')}>
                <Text className="text-primary-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: FormStyles.HORIZONTAL_PADDING,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: '#111827',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: FormStyles.VERTICAL_GAP,
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});