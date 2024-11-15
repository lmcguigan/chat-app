
import { formatDistanceStrict } from 'date-fns';
import React, { FunctionComponent } from 'react';
import { ThemedText } from './ThemedText';

export type NotificationTimestampProps = {
  timestamp: number
};

const NotificationTimestampMsg: FunctionComponent<NotificationTimestampProps> = (props: NotificationTimestampProps) => {
    const { timestamp } = props
    const msg = formatDistanceStrict(new Date(timestamp), Date.now())
    return (
        <ThemedText>{msg} ago</ThemedText>
    );
}

export default NotificationTimestampMsg