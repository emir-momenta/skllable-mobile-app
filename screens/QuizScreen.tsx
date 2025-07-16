import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, Award, Clock, Target } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  icon: string;
  requirement: string;
}

const quizData: { [key: string]: Question[] } = {
  'public-speaking': [
    {
      id: '1',
      question: 'What is the most effective way to overcome stage fright before a presentation?',
      options: [
        'Avoid eye contact with the audience',
        'Practice deep breathing and visualization',
        'Speak as quickly as possible to finish sooner',
        'Focus on your nervousness'
      ],
      correctAnswer: 1,
      explanation: 'Deep breathing and visualization help calm nerves and build confidence before speaking.'
    },
    {
      id: '2',
      question: 'Which body language technique is most important for engaging your audience?',
      options: [
        'Keeping your hands in your pockets',
        'Looking at your notes constantly',
        'Making eye contact and using open gestures',
        'Standing rigidly in one position'
      ],
      correctAnswer: 2,
      explanation: 'Eye contact and open gestures create connection and trust with your audience.'
    },
    {
      id: '3',
      question: 'What is the best way to structure a compelling presentation?',
      options: [
        'Start with detailed statistics',
        'Use the "Tell them what you\'ll tell them" approach',
        'Begin with an apology for being nervous',
        'Jump straight into complex details'
      ],
      correctAnswer: 1,
      explanation: 'A clear structure with preview, main content, and summary helps audiences follow your message.'
    },
    {
      id: '4',
      question: 'How should you handle mistakes during a presentation?',
      options: [
        'Stop and apologize profusely',
        'Pretend it didn\'t happen and get flustered',
        'Acknowledge briefly and continue confidently',
        'Start the entire presentation over'
      ],
      correctAnswer: 2,
      explanation: 'Brief acknowledgment shows authenticity while maintaining confidence and momentum.'
    },
    {
      id: '5',
      question: 'What is the most effective way to end a presentation?',
      options: [
        'Say "That\'s all I have" and sit down',
        'Summarize key points and include a call to action',
        'Apologize for taking up their time',
        'Rush off stage immediately'
      ],
      correctAnswer: 1,
      explanation: 'A strong conclusion reinforces your message and motivates the audience to act.'
    }
  ]
};

const badges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Completed your first skill quiz',
    type: 'bronze',
    icon: '🥉',
    requirement: 'Complete 1 quiz'
  },
  {
    id: 'quiz-streak-3',
    name: 'Consistent Learner',
    description: 'Completed 3 quizzes in a row',
    type: 'silver',
    icon: '🥈',
    requirement: 'Complete 3 quizzes'
  },
  {
    id: 'perfect-score',
    name: 'Perfectionist',
    description: 'Scored 100% on a quiz',
    type: 'gold',
    icon: '🥇',
    requirement: 'Score 100% on any quiz'
  },
  {
    id: 'skill-master',
    name: 'Skill Master',
    description: 'Mastered a complete skill module',
    type: 'platinum',
    icon: '💎',
    requirement: 'Complete all quizzes in a skill'
  }
];

export default function QuizScreen({ skillId = 'public-speaking', skillName = 'Confident Public Speaking' }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = quizData[skillId] || quizData['public-speaking'];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Animation values
  const progressAnimation = useSharedValue(0);
  const badgeScale = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, showExplanation]);

  // Progress animation
  useEffect(() => {
    progressAnimation.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setShowExplanation(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowExplanation(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setIsQuizComplete(true);
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    // Check for earned badges
    const newBadges: Badge[] = [];
    
    // First quiz badge
    newBadges.push(badges.find(b => b.id === 'first-quiz')!);
    
    // Perfect score badge
    if (percentage === 100) {
      newBadges.push(badges.find(b => b.id === 'perfect-score')!);
    }
    
    // Skill master badge (assuming this completes the skill)
    if (percentage >= 80) {
      newBadges.push(badges.find(b => b.id === 'skill-master')!);
    }
    
    setEarnedBadges(newBadges);
    
    // Animate badges
    newBadges.forEach((_, index) => {
      badgeScale.value = withDelay(
        index * 300,
        withSequence(
          withTiming(1.2, { duration: 300 }),
          withTiming(1, { duration: 200 })
        )
      );
      badgeOpacity.value = withDelay(index * 300, withTiming(1, { duration: 300 }));
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 70) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! You\'ve mastered this skill!';
    if (percentage >= 70) return 'Good job! Keep practicing to improve.';
    return 'Keep learning! Practice makes perfect.';
  };

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnimation.value}%`,
    };
  });

  const badgeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgeScale.value }],
      opacity: badgeOpacity.value,
    };
  });

  if (isQuizComplete) {
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar style="dark" />
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center items-center px-6 py-8">
            {/* Completion Animation */}
            <View className="items-center mb-8">
              <View className="w-24 h-24 bg-primary-100 rounded-full justify-center items-center mb-4">
                <Award size={40} color="#3b82f6" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</Text>
              <Text className="text-gray-600 text-center">{skillName}</Text>
            </View>

            {/* Score Display */}
            <View className="bg-white rounded-2xl p-6 mb-6 w-full">
              <View className="items-center mb-4">
                <Text className="text-6xl font-bold mb-2" style={{ color: getScoreColor(percentage) }}>
                  {Math.round(percentage)}%
                </Text>
                <Text className="text-gray-600 text-center">
                  {finalScore} out of {questions.length} correct
                </Text>
                <Text className="text-gray-800 font-medium text-center mt-2">
                  {getScoreMessage(percentage)}
                </Text>
              </View>
            </View>

            {/* Earned Badges */}
            {earnedBadges.length > 0 && (
              <View className="bg-white rounded-2xl p-6 mb-6 w-full">
                <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Badges Earned! 🎉
                </Text>
                <View className="space-y-3">
                  {earnedBadges.map((badge, index) => (
                    <Animated.View key={badge.id} style={badgeAnimatedStyle}>
                      <LinearGradient
                        colors={
                          badge.type === 'platinum' ? ['#e5e7eb', '#f3f4f6'] :
                          badge.type === 'gold' ? ['#fbbf24', '#f59e0b'] :
                          badge.type === 'silver' ? ['#d1d5db', '#9ca3af'] :
                          ['#cd7c2f', '#a16207']
                        }
                        className="rounded-xl p-4"
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View className="flex-row items-center">
                          <Text className="text-3xl mr-3">{badge.icon}</Text>
                          <View className="flex-1">
                            <Text className="font-bold text-gray-900">{badge.name}</Text>
                            <Text className="text-gray-700 text-sm">{badge.description}</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </Animated.View>
                  ))}
                </View>
              </View>
            )}

            {/* Actions */}
            <View className="w-full space-y-3">
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/learning')}
                className="bg-primary-600 rounded-xl py-4 px-6"
              >
                <Text className="text-white font-semibold text-center text-lg">
                  Continue Learning
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-gray-200 rounded-xl py-4 px-6"
              >
                <Text className="text-gray-700 font-semibold text-center">
                  Back to Course
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 flex-1 text-center mx-4">
            {skillName} Quiz
          </Text>
          <View className="flex-row items-center">
            <Clock size={16} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-1">{timeLeft}s</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="bg-gray-200 rounded-full h-2 mb-2">
          <Animated.View 
            className="bg-primary-600 rounded-full h-2"
            style={progressAnimatedStyle}
          />
        </View>
        <Text className="text-gray-600 text-sm text-center">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Question */}
        <View className="bg-white rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4 leading-7">
            {currentQuestion.question}
          </Text>
          
          {/* Answer Options */}
          <View className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = 'bg-gray-50 border-gray-200';
              let textStyle = 'text-gray-900';
              let iconColor = '#9CA3AF';
              let showIcon = false;
              
              if (showExplanation) {
                if (index === currentQuestion.correctAnswer) {
                  buttonStyle = 'bg-green-50 border-green-500';
                  textStyle = 'text-green-900';
                  iconColor = '#10b981';
                  showIcon = true;
                } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                  buttonStyle = 'bg-red-50 border-red-500';
                  textStyle = 'text-red-900';
                  iconColor = '#ef4444';
                  showIcon = true;
                }
              } else if (selectedAnswer === index) {
                buttonStyle = 'bg-primary-50 border-primary-500';
                textStyle = 'text-primary-900';
              }
              
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-xl border-2 ${buttonStyle}`}
                  disabled={showExplanation}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className={`flex-1 font-medium ${textStyle}`}>
                      {option}
                    </Text>
                    {showIcon && (
                      <View className="ml-3">
                        {index === currentQuestion.correctAnswer ? (
                          <CheckCircle size={20} color={iconColor} />
                        ) : (
                          <XCircle size={20} color={iconColor} />
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <Text className="text-blue-900 font-semibold mb-2">Explanation</Text>
            <Text className="text-blue-800 leading-6">
              {currentQuestion.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action */}
      {showExplanation && (
        <View className="bg-white px-6 py-4 border-t border-gray-100">
          <TouchableOpacity
            onPress={handleNextQuestion}
            className="bg-primary-600 rounded-xl py-4"
          >
            <Text className="text-white font-semibold text-center text-lg">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}