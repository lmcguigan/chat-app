import { Pressable, StyleSheet, View } from 'react-native';

import { ChatAppNotification } from '@/data/NotificationTypes';
import { useUpdateNotificationStatusMutation } from '@/store/features/notificationsApiSlice';
import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import NotificationText from './NotificationText';
import NotificationTimestampMsg from './NotificationTimestampMsg';

export type NotificationItemProps = {
  notification: ChatAppNotification
};

const NotificationItem: FunctionComponent<NotificationItemProps> = (props: NotificationItemProps) => {
  const {timestamp, type, data, read, message} = props.notification
  const [updateNotification, result] = useUpdateNotificationStatusMutation()
  const handleNotificationPress = () => {
    // call to optimistically update the state
    updateNotification({...props.notification, read: true})
  }
  return (
    <Pressable onPress={handleNotificationPress}>
      <View style={[styles.notifContainer, read ? {backgroundColor: 'rgba(131, 126, 135, 0.3)'} : {}]}>
      <View style={styles.iconContainer}>
        <Ionicons name={read ? 'mail-open' : 'mail-unread'} size={28} color="white"></Ionicons>
      </View>
      <View style={{flexDirection: 'column', flexShrink: 1}}>
          <NotificationText data={data} type={type} message={message}/>
          <NotificationTimestampMsg timestamp={timestamp}/>
      </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    notifContainer: {
      flexDirection: 'row', 
      borderBottomColor: 'grey', 
      borderBottomWidth: 1, 
      padding: 10,
      alignItems: 'center'
    },
    iconContainer: {
      height: 40, 
      width: 40, 
      borderRadius: 10, 
      backgroundColor: '#7a3cb0', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginRight: 10,
    }
});

export default NotificationItem