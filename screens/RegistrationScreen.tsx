import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { FormStyles } from '@/components/ui/FormStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistrationScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else if (confirmPassword.length < 8) {
      newErrors.confirmPassword = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/skill-selection');
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
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
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 justify-center py-8">
            {/* Header */}
            <View className="items-center mb-8">
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
              <Text className="text-3xl font-bold text-gray-900 mb-2">Join Skllable</Text>
              <Text className="text-gray-600 text-center px-4">
                Start your journey to mastering essential soft skills
              </Text>
            </View>

            {/* Form */}
            <View style={[styles.formContainer, { paddingTop: 32 }]}>
              {/* First and Last Name Row */}
              <View style={[styles.nameRow, { marginBottom: FormStyles.VERTICAL_GAP }]}>
                <View style={[styles.inputContainer, { 
                  height: FormStyles.INPUT_HEIGHT, 
                  paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                  borderRadius: FormStyles.BORDER_RADIUS,
                  flex: 1,
                  marginRight: FormStyles.VERTICAL_GAP / 2
                }]}>
                  <User size={24} color="#9CA3AF" />
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor="#999"
                    value={firstName}
                    onChangeText={(value) => updateField('firstName', value)}
                    autoCapitalize="words"
                    returnKeyType="next"
                    accessibilityLabel="First name"
                    style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                  />
                </View>
                <View style={[styles.inputContainer, { 
                  height: FormStyles.INPUT_HEIGHT, 
                  paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                  borderRadius: FormStyles.BORDER_RADIUS,
                  flex: 1,
                  marginLeft: FormStyles.VERTICAL_GAP / 2
                }]}>
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor="#999"
                    value={lastName}
                    onChangeText={(value) => updateField('lastName', value)}
                    autoCapitalize="words"
                    returnKeyType="next"
                    accessibilityLabel="Last name"
                    style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                  />
                </View>
              </View>
              {(errors.firstName || errors.lastName) && (
                <View style={styles.nameErrorRow}>
                  {errors.firstName && <Text style={[styles.errorText, { flex: 1, marginRight: 8 }]}>{errors.firstName}</Text>}
                  {errors.lastName && <Text style={[styles.errorText, { flex: 1, marginLeft: 8 }]}>{errors.lastName}</Text>}
                </View>
              )}

              {/* Email */}
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
                  onChangeText={(value) => updateField('email', value)}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  accessibilityLabel="Email address"
                  style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              {/* Create Password */}
              <View style={[styles.inputContainer, { 
                height: FormStyles.INPUT_HEIGHT, 
                marginBottom: FormStyles.VERTICAL_GAP, 
                paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                borderRadius: FormStyles.BORDER_RADIUS 
              }]}>
                <Lock size={24} color="#9CA3AF" />
                <TextInput
                  placeholder="Create password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={(value) => updateField('password', value)}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
                  accessibilityLabel="Create password"
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

              {/* Confirm Password */}
              <View style={[styles.inputContainer, { 
                height: FormStyles.INPUT_HEIGHT, 
                marginBottom: FormStyles.VERTICAL_GAP, 
                paddingHorizontal: FormStyles.HORIZONTAL_PADDING, 
                borderRadius: FormStyles.BORDER_RADIUS 
              }]}>
                <Lock size={24} color="#9CA3AF" />
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  returnKeyType="done"
                  accessibilityLabel="Confirm password"
                  style={[styles.input, { fontSize: FormStyles.FONT_SIZE }]}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={24} color="#9CA3AF" />
                  ) : (
                    <Eye size={24} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              {/* Create Account Button */}
              <Button 
                onPress={handleRegister} 
                loading={isLoading}
                style={[styles.button, { 
                  height: FormStyles.INPUT_HEIGHT, 
                  marginTop: FormStyles.VERTICAL_GAP * 1.5,
                  width: '100%'
                }]}
              >
                <View className="flex-row items-center">
                  <Text className="text-white font-semibold mr-2">Create Account</Text>
                  <ArrowRight size={20} color="white" />
                </View>
              </Button>
            </View>

            {/* Terms */}
            <Text className="text-gray-500 text-sm text-center mt-6 px-4">
              By creating an account, you agree to our{' '}
              <Text className="text-primary-600 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary-600 font-medium">Privacy Policy</Text>
            </Text>

            {/* Footer */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-primary-600 font-semibold">Sign In</Text>
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
    paddingVertical: 24,
    paddingHorizontal: FormStyles.HORIZONTAL_PADDING,
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    width: '100%',
  },
  nameErrorRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: FormStyles.VERTICAL_GAP,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});