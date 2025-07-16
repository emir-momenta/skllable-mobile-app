import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Flame } from 'lucide-react-native';

interface StreakCalendarProps {
  currentStreak?: number;
  data?: { [key: string]: boolean }; // date string -> has activity (true/false)
}

interface CalendarDay {
  date: string;
  dayOfWeek: number;
  month: number;
  dayOfMonth: number;
  hasActivity: boolean;
  isToday: boolean;
}

interface MonthLabel {
  month: string;
  weekIndex: number;
}

const { width: screenWidth } = Dimensions.get('window');

export function StreakCalendar({ currentStreak = 23, data = {} }: StreakCalendarProps) {
  // Calculate optimal dimensions based on screen width
  const containerPadding = 48; // 24px margin on each side
  const calendarPadding = 32; // 16px padding on each side inside container
  const dayLabelWidth = 36; // Increased from 28 to give more space for labels
  const availableWidth = screenWidth - containerPadding - calendarPadding - dayLabelWidth;
  
  // Calculate optimal number of weeks to show (approximately 5 months)
  const weeksToShow = Math.floor(availableWidth / 14); // 12px day + 2px spacing
  const daysToShow = weeksToShow * 7;
  
  // Generate calendar data
  const generateCalendarData = () => {
    const today = new Date();
    const days = [];
    
    // Start from calculated days ago
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const month = date.getMonth();
      const dayOfMonth = date.getDate();
      
      // Generate sample data with higher activity in recent weeks
      let hasActivity = false;
      if (data[dateString] !== undefined) {
        hasActivity = data[dateString];
      } else {
        // Sample data generation - more activity in recent weeks
        const weeksAgo = Math.floor(i / 7);
        const randomFactor = Math.random();
        
        if (weeksAgo < 4) {
          // High activity in last 4 weeks (85% chance)
          hasActivity = randomFactor > 0.15;
        } else if (weeksAgo < 8) {
          // Medium activity 4-8 weeks ago (65% chance)
          hasActivity = randomFactor > 0.35;
        } else {
          // Lower activity beyond 8 weeks (45% chance)
          hasActivity = randomFactor > 0.55;
        }
      }
      
      days.push({
        date: dateString,
        dayOfWeek,
        month,
        dayOfMonth,
        hasActivity,
        isToday: i === 0
      });
    }
    
    return days;
  };

  const calendarData = generateCalendarData();
  
  // Group days by weeks, starting from Monday
  const weeks: (CalendarDay | null)[][] = [];
  let currentWeek: (CalendarDay | null)[] = [];
  
  calendarData.forEach((day, index) => {
    // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
    const adjustedDayOfWeek = day.dayOfWeek === 0 ? 6 : day.dayOfWeek - 1;
    
    // If this is the first day and it's not Monday, pad the beginning
    if (index === 0 && adjustedDayOfWeek > 0) {
      for (let i = 0; i < adjustedDayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(day);
    
    // If we've completed a week (7 days) or this is the last day
    if (currentWeek.length === 7 || index === calendarData.length - 1) {
      // Pad the end if necessary
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  // Get month labels - show only when month changes and align with grid
  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: MonthLabel[] = [];
    let currentMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find((day: CalendarDay | null) => day !== null);
      if (firstValidDay && firstValidDay.month !== currentMonth) {
        currentMonth = firstValidDay.month;
        labels.push({
          month: months[currentMonth],
          weekIndex
        });
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <View style={styles.container}>
      {/* Header with streak info */}
      <View style={styles.header}>
        <View style={styles.streakInfo}>
          <View style={styles.streakBadge}>
            <Flame size={16} color="#f97316" />
            <Text style={styles.streakNumber}>{currentStreak}</Text>
          </View>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <Text style={styles.title}>Daily Practice Activity</Text>
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarContainer}>
        {/* Month labels */}
        <View style={styles.monthLabels}>
          {monthLabels.map((label, index) => (
            <Text 
              key={index} 
              style={[
                styles.monthLabel, 
                { left: label.weekIndex * 14 + dayLabelWidth }
              ]}
            >
              {label.month}
            </Text>
          ))}
        </View>

        {/* Day labels and grid */}
        <View style={styles.gridContainer}>
          {/* Day labels */}
          <View style={[styles.dayLabels, { width: dayLabelWidth }]}>
            <Text style={styles.dayLabel}>Mon</Text>
            <View style={styles.dayLabelSpacer} />
            <Text style={styles.dayLabel}>Wed</Text>
            <View style={styles.dayLabelSpacer} />
            <Text style={styles.dayLabel}>Fri</Text>
            <View style={styles.dayLabelSpacer} />
            <View style={styles.dayLabelSpacer} />
          </View>

          {/* Calendar grid */}
          <View style={styles.grid}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((day: CalendarDay | null, dayIndex: number) => (
                  <View
                    key={`${weekIndex}-${dayIndex}`}
                    style={[
                      styles.day,
                      {
                        backgroundColor: day === null 
                          ? 'transparent' 
                          : day.hasActivity 
                            ? '#22c55e' // green-500 - single green color for all activity
                            : '#f3f4f6', // gray-100 for no activity
                        borderColor: day?.isToday ? '#3b82f6' : 'transparent',
                        borderWidth: day?.isToday ? 2 : 0,
                      }
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakInfo: {
    alignItems: 'flex-start',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ea580c',
    marginLeft: 4,
  },
  streakLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  calendarContainer: {
    flex: 1,
  },
  monthLabels: {
    height: 20,
    position: 'relative',
    marginBottom: 8,
  },
  monthLabel: {
    position: 'absolute',
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  dayLabels: {
    justifyContent: 'flex-start',
    paddingTop: 2,
    paddingRight: 8, // Add padding to separate from grid
  },
  dayLabel: {
    fontSize: 11,
    color: '#6b7280',
    height: 14,
    textAlign: 'left', // Changed from 'right' to 'left' for better readability
    fontWeight: '500',
    width: '100%', // Ensure full width is used
  },
  dayLabelSpacer: {
    height: 14,
    marginBottom: 2,
  },
  grid: {
    flexDirection: 'row',
    flex: 1,
  },
  week: {
    marginRight: 2,
  },
  day: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginBottom: 2,
  },
});
