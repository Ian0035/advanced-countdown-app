import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ label, onPress, disabled }: ButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.wrapper,
      disabled && styles.disabled,
      pressed && !disabled && styles.pressed,
    ]}
    disabled={disabled}
  >
    <LinearGradient
      colors={['#FF2D8D', '#FF7A5C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  button: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
