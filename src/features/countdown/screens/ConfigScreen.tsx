import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DateTimePickerField } from '../../../components/DateTimePicker';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { createCountdownFromDate } from '../countdownService';
import { useCountdownStore } from '../countdownStore';
import { BOTTOM_BANNER_HEIGHT } from '../../../constants/layout';

export const ConfigScreen = () => {
  const addCountdown = useCountdownStore((state) => state.addCountdown);
  const showToast = useCountdownStore((state) => state.showToast);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now;
  });
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successToken, setSuccessToken] = useState<number>();

  const handleStart = async () => {
    try {
      setLoading(true);
      const trimmedName = name.trim();
      const countdown = await createCountdownFromDate(
        selectedDate,
        trimmedName.length > 0 ? trimmedName : 'Countdown'
      );
      addCountdown(countdown);
      setSuccessToken(Date.now());
      showToast('Saved');
      setName('');
    } catch (error) {
      Alert.alert('Something went wrong', 'Unable to start a countdown.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LinearGradient
        colors={['#FF2D8D', '#FF5B7A', '#FF7A5C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <Text style={styles.title}>Configure a countdown</Text>
      </LinearGradient>
      <View style={styles.content}>
        <DateTimePickerField
          value={selectedDate}
          onChange={setSelectedDate}
          onSubmit={handleStart}
          loading={loading}
          successToken={successToken}
          name={name}
          onNameChange={setName}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16 + BOTTOM_BANNER_HEIGHT,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
