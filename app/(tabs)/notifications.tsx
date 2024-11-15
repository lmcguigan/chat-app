import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import NotificationItem from '@/components/NotificationItem';
import { ThemedText } from '@/components/ThemedText';
import { useGetNotificationsQuery } from '@/store/features/notificationsApiSlice';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const {data, isLoading} = useGetNotificationsQuery();
  const flatListData = useMemo(() => {
    if(data){
      return data.ids.map((id) => data.entities[id])
    } else {
      return []
    }
  }, [data])
  const insets = useSafeAreaInsets();
  return (
    <View style={[{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }, styles.container]}>
      <ThemedText type='title' style={styles.title}>Notifications</ThemedText>
      {!isLoading && data && 
        <FlatList 
          data={flatListData}
          renderItem={({item}) => <NotificationItem notification={item}/>}
        />}
      {isLoading && 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText style={{paddingBottom: 30}}>Loading...</ThemedText>
        <ActivityIndicator size="large" />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center', 
    paddingTop: 10, 
    paddingBottom: 20
  }
});
