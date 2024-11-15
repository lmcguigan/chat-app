
import { MessageType, NotificationData, NotificationDataKeysEnum, NotificationTypeEnum } from '@/data/NotificationTypes';
import React, { FunctionComponent, ReactNode } from 'react';
import { ThemedText } from './ThemedText';

interface NotificationTextProps {
    data: NotificationData,
    type: NotificationTypeEnum,
    message?: MessageType
}
const NotificationText: FunctionComponent<NotificationTextProps> = (props: NotificationTextProps) => {
    const {data, type, message} = props
    const renderUserName = (name: string) => {
        return <ThemedText style={{backgroundColor: 'rgba(131, 126, 135, 0.5)', fontWeight: 'bold', alignSelf: 'baseline'}}>@{name}</ThemedText>
    }
    const renderCommunityName = (name: string) => {
        return(<ThemedText style={{backgroundColor: 'rgba(50, 168, 82, 0.3)', fontWeight: 'bold', alignSelf: 'baseline'}}>{name}</ThemedText>)
    }
    const renderChannelName = (channel: string, community: string) => {
        return <ThemedText><ThemedText style={{backgroundColor: 'rgba(209, 156, 33, 0.3)', fontWeight: 'bold', alignSelf: 'baseline'}}>#{channel}</ThemedText> . {renderCommunityName(community)}</ThemedText>
    }
    const renderFriendRequestMsg = () => {
        return(
            <ThemedText>
                {renderUserName(data.user.display)} sent you a friend request
            </ThemedText>
        )
    }
    const renderCommunityInviteMsg = () => {
        return(
            <ThemedText>
                {renderUserName(data.user.display)} invited you to {renderCommunityName(data.community?.display!)}
            </ThemedText>
        )
    }
    const renderRequestDeclinedMsg = () => {
        return(
            <ThemedText>
                {renderUserName(data.user.display)} <ThemedText style={{fontWeight: 'bold', color: 'red'}}>declined</ThemedText> your friend request
            </ThemedText>
        )
    }
    const renderRequestAcceptedMsg = () => {
        return(
            <ThemedText>
                {renderUserName(data.user.display)} <ThemedText style={{fontWeight: 'bold', color: 'green'}}>accepted</ThemedText> your friend request
            </ThemedText>
        )
    }
    const renderMentionMsg = () => {
        return(
            <ThemedText>
                {renderUserName(data.user.display)} mentioned you in {renderChannelName(data.channel?.display!, data.community?.display!)}
            </ThemedText>
        )
    }
    const notificationTypeFunctionMap = {
        [NotificationTypeEnum.COMMUNITY_INVITE]: renderCommunityInviteMsg,
        [NotificationTypeEnum.FRIEND_REQUEST]: renderFriendRequestMsg,
        [NotificationTypeEnum.MENTION]: renderMentionMsg,
        [NotificationTypeEnum.REQUEST_ACCEPTED]: renderRequestAcceptedMsg,
        [NotificationTypeEnum.REQUEST_DECLINED]: renderRequestDeclinedMsg,
    }
    const renderText = (text: string) => {
        enum StyledWords {
            ACCEPTED = 'accepted',
            REJECTED = 'rejected'
        }
        const splitKeep = (s: string, sep: StyledWords) => {
            const regex = new RegExp(`(${sep})`)
            return s.split(regex).filter(Boolean); 
        } 
        // this part would need to be ammended to fully account for special styled words
        const array = text.includes(StyledWords.ACCEPTED) ? splitKeep(text, StyledWords.ACCEPTED) : splitKeep(text, StyledWords.REJECTED)
        return <ThemedText>{array.map((e) => {
            if(e === StyledWords.ACCEPTED){
                return <ThemedText style={{fontWeight: 'bold', color: 'green'}}>{e}</ThemedText>
            } else if (e === StyledWords.REJECTED){
                return <ThemedText style={{fontWeight: 'bold', color: 'red'}}>{e}</ThemedText>
            } else {
                return <ThemedText>{e}</ThemedText>
            }
        })}</ThemedText>
    }
    const mapMessage = (message: MessageType): ReactNode => {
        // this concept of mapping a message is just to illustrate how the backend could be augmented to include this field
        // and then properly render the text without having to modify the FE code to render that specific type
        // this way you could feasibly add new types on the BE without having to push a FE code change
        // my random generator does not include dynamic message creation though
        return message.map((component) => {
            if(component.text){
                return renderText(" " + component.text + " ")
            } else if(component.key !== undefined) {
                const subData = data[component.key]
                const arg = subData ? subData.display : ''
                switch (component.key) {
                    case NotificationDataKeysEnum.USER:
                        return renderUserName(arg)
                    case NotificationDataKeysEnum.CHANNEL:
                        return renderChannelName(arg, data[NotificationDataKeysEnum.COMMUNITY]?.display!)
                    case NotificationDataKeysEnum.COMMUNITY:
                        return renderCommunityName(arg)
                    default:
                        return <ThemedText></ThemedText>
                }
            }
            return null
        })
    }
    const getTextComponent = () => {
        if(message){
            return <ThemedText>{mapMessage(message)}</ThemedText>
        } else if(notificationTypeFunctionMap[type]){
            return notificationTypeFunctionMap[type]()
        } else {
            <ThemedText>New notification</ThemedText>
        }
    }
    return <>
        {getTextComponent()}
    </>
}

export default NotificationText