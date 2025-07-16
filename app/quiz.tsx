import { useLocalSearchParams } from 'expo-router';
import QuizScreen from '@/screens/QuizScreen';

export default function Quiz() {
  const { skillId, skillName } = useLocalSearchParams();
  
  return (
    <QuizScreen 
      skillId={skillId as string} 
      skillName={skillName as string} 
    />
  );
}