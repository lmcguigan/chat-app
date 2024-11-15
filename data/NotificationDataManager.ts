import 'react-native-get-random-values';
import { adjectives, animals, colors, names, uniqueNamesGenerator } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';
import { ChatAppNotification, isChannelChatAppNotification, isCommunityChatAppNotification, NotificationData, NotificationTypeEnum } from "./NotificationTypes";

export interface StoredCommunity {
    display: string,
    id: string,
    channels: Map<string, {display: string}>
}

const defaultChannelNames = ['general', 'random', 'announcements', 'tech-help'] 

export class NotificationDataManager {
    knownCommunities: Map<string, StoredCommunity>
    constructor(data: ChatAppNotification[]){
        this.knownCommunities = new Map()
        this.mapInitialDataToKnownCommunities(data)
    }
    mapInitialDataToKnownCommunities = (data: ChatAppNotification[]) => {
        data.filter(notif => isCommunityChatAppNotification(notif))
            .forEach(notif => {
                const channelMap = new Map()
                const defaultChannels = this.getDefaultChannels()
                defaultChannels.forEach((chan) => channelMap.set(chan.id, {display: chan.display}))
                const {community} = notif.data
                this.knownCommunities.set(community.id, {display: community.display, id: community.id, channels: channelMap})
        })
        data.filter(notif => isChannelChatAppNotification(notif))
            .forEach(notif => {
                const community = this.knownCommunities.get(notif.data.community.id)
                if(community){
                    community.channels.set(notif.data.channel.id, {display: notif.data.channel.display})
                }
            })

    }
    getDefaultChannels = () => {
        return defaultChannelNames.map((name) => ({id: uuidv4(), display: name}))
    }
    buildCommunityName = () => {
        return uniqueNamesGenerator({dictionaries: [adjectives, colors, animals], separator: ' ', style: 'capital' })
    }
    buildUserData = () => {
        return {
            user: {
                display: uniqueNamesGenerator({dictionaries: [names], style: 'capital'}),
                id: uuidv4()
            }
        }
    }
    getRandomIndex = (array: any[]) => Math.floor(Math.random() * array.length)
    buildData = (type: NotificationTypeEnum): NotificationData => {
        // all notifications have an originating user associated with it
        const dataObj: NotificationData  = this.buildUserData()
        // community invite and mention are the only types that require us to have community data in the notification
        if(type === NotificationTypeEnum.COMMUNITY_INVITE){
            const newCommunity = {
                id: uuidv4(),
                display: this.buildCommunityName(),
            }
            dataObj.community = newCommunity
            // create a map for its channels, using defaults as a base and adding an additional few
            const channels: Map<string, {display: string}> = new Map()
            // add between 1 and 5 random channels
            const randomNumberOfChannels = Math.floor(Math.random() * 5) + 1
            const randomChannels = Array(randomNumberOfChannels).map(e => ({
                display: uniqueNamesGenerator({dictionaries: [adjectives, colors]}),
                id: uuidv4()
            }))
            this.getDefaultChannels().concat(randomChannels).forEach((channel) => {
                channels.set(channel.id, {display: channel.display})
            })
            // add to list of known communities
            this.knownCommunities.set(newCommunity.id, {...newCommunity, channels})
        }
        if(type === NotificationTypeEnum.MENTION){
            // randomly choose an item from the list of known communities
            const ids = [...this.knownCommunities.keys()]
            const communityId = ids[this.getRandomIndex(ids)]
            const community = this.knownCommunities.get(communityId)
            if(community){
                dataObj.community = { display: community.display, id: community.id }
                // randomly choose a channel
                const channelIds = [...community.channels.keys()]
                const selectedChannelId = channelIds[this.getRandomIndex(channelIds)]
                const channel = community.channels.get(selectedChannelId)
                dataObj.channel = {display: channel?.display!, id: selectedChannelId, communityId}
            }
        }
        return dataObj
    }
    buildNewNotification = (): ChatAppNotification => {
        const randomizeType = () => {
            const allTypes = Object.values(NotificationTypeEnum)
            const index = this.getRandomIndex(allTypes)
            return allTypes[index]
        }
        const type = randomizeType()
        return {
            id: uuidv4(),
            timestamp: Date.now(),
            type: type,
            read: false,
            data: this.buildData(type)
        }
    }
}