import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const color = useThemeColor({}, 'tint')
  return (
    <View style={[{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left + 20,
      paddingRight: insets.right + 20, 
    }, styles.container]}>
      <View style={styles.contentContainer}>
        <ThemedText type="splash">Chat App</ThemedText>
        <Ionicons size={150} name='chatbubbles-outline' style={{paddingTop: 40}} color={color}/>
      </View>
      <ThemedText style={styles.message}>{`This is just a placeholder view.\n\nGo to the notifications tab to see the functionality!`}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center'
  },
  message: {
    paddingTop: 40, 
    textAlign: 'center'
  }
});
