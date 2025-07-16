import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const gradientOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate elements in sequence with longer duration
    gradientOpacity.value = withTiming(1, { duration: 800 });
    
    logoScale.value = withDelay(
      500,
      withSequence(
        withTiming(1.3, { duration: 800 }),
        withTiming(1, { duration: 300 })
      )
    );
    
    logoOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    textOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    subtitleOpacity.value = withDelay(1800, withTiming(1, { duration: 600 }));

    // Navigate to login after longer animation - increased from 2500ms to 4000ms
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleOpacity.value,
    };
  });

  const gradientAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: gradientOpacity.value,
    };
  });

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Animated.View style={[{ flex: 1 }, gradientAnimatedStyle]}>
        <LinearGradient
          colors={['#1F3A93', '#3b82f6', '#7FD8B4']}
          className="flex-1 justify-center items-center"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="items-center">
            <Animated.View style={logoAnimatedStyle}>
              <View className="w-32 h-32 bg-white rounded-3xl justify-center items-center mb-8 shadow-2xl">
                <Image
                  source={require('@/assets/images/skllable.png')}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
            
            <Animated.View style={textAnimatedStyle}>
              <Text className="text-5xl font-bold text-white mb-3">Skllable</Text>
            </Animated.View>

            <Animated.View style={subtitleAnimatedStyle}>
              <Text className="text-white/90 text-lg text-center px-8 mb-2">
                Master Your Soft Skills Through Books
              </Text>
              <Text className="text-white/70 text-base text-center px-8">
                Transform knowledge into confidence
              </Text>
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}