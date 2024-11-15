export enum NotificationTypeEnum {
    MENTION = 'mention',
    COMMUNITY_INVITE = 'community_invite',
    FRIEND_REQUEST = 'friend_request',
    REQUEST_ACCEPTED = 'request_accepted',
    REQUEST_DECLINED = 'request_declined'
}
export interface User {
    id: string,
    display: string
}
export interface Community {
    id: string,
    display: string
}
export interface Channel {
    id: string,
    display: string,
    // one community can have many channels
    communityId: string,
}
export enum NotificationDataKeysEnum {
    USER = 'user',
    COMMUNITY = 'community',
    CHANNEL = 'channel'
}
export interface NotificationData {
    [NotificationDataKeysEnum.USER]: User
    [NotificationDataKeysEnum.COMMUNITY]?: Community
    [NotificationDataKeysEnum.CHANNEL]?: Channel
}
export type MessageComponentType = 'data_token' | 'text'
export interface MessageComponent {
    type: MessageComponentType
    key?: NotificationDataKeysEnum
    text?: string
}
export interface DataTokenMessageComponent extends MessageComponent{
    key: NotificationDataKeysEnum
}
export interface TextMessageComponent extends MessageComponent {
    text: string
}
export type MessageType = Array<DataTokenMessageComponent | TextMessageComponent>
export interface ChatAppNotification {
    id: string,
    type: NotificationTypeEnum
    read: boolean
    timestamp: number
    data: NotificationData
    message?: MessageType
}
export interface CommunityChatAppNotification extends ChatAppNotification {
    data: {
        user: User,
        community: Community
    }
}
export interface ChannelChatAppNotification extends CommunityChatAppNotification {
    data: {
        user: User,
        community: Community,
        channel: Channel
    }
}
// functions for type checking
export const isCommunityChatAppNotification  = (notif: ChatAppNotification): notif is CommunityChatAppNotification => {
    return notif.data.community !== undefined && notif.data.community.id !== undefined
}
export const isChannelChatAppNotification = (notif: ChatAppNotification): notif is ChannelChatAppNotification => {
    return notif.data.channel !== undefined && notif.data.channel.id !== undefined
}