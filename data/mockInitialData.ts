import { ChatAppNotification, NotificationDataKeysEnum, NotificationTypeEnum } from "./NotificationTypes";

export const mockData: ChatAppNotification[] = [
    {
        id: 'eb8cbd3c-2939-47b9-8cee-c193f76f9e05',
        type: NotificationTypeEnum.MENTION,
        timestamp: 1731558855150,
        read: false,
        data: {
            user: {
                id: '834bb0a0-8f8b-4084-add0-b1f5a7530060',
                display: 'Tanya'
            },
            community: {
                id: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319',
                display: 'DFW Aerialists',
            },
            channel: {
                id: '701bc262-bc59-4f1b-a515-0bf6ccb59de2',
                display: 'Dance Trapeze Enthusiasts',
                communityId: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319'
            }
        }, 
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'mentioned you in'},
            {type: 'data_token', key: NotificationDataKeysEnum.CHANNEL},
        ]
    },
    {
        id: 'e66a950b-846c-4f08-881a-69daf1ce7df2',
        type: NotificationTypeEnum.MENTION,
        timestamp: 1731558824243,
        read: false,
        data: {
            user: {
                id: '670ba162-9c3e-46fe-ab51-dd8faa1ece70',
                display: 'Catherine'
            },
            community: {
                id: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319',
                display: 'DFW Aerialists',
            },
            channel: {
                display: 'Lyra Fanatics',
                communityId: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319',
                id: 'c017499f-31d5-4f9f-adba-0ce8fb8b05ba'
            }
        },
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'mentioned you in'},
            {type: 'data_token', key: NotificationDataKeysEnum.CHANNEL}
        ]
    },
    {
        id: '8b2c457c-f2d3-4b56-aef0-4b0b14255a6e',
        type: NotificationTypeEnum.COMMUNITY_INVITE,
        timestamp: 1731494892987,
        read: false,
        data: {
            user: {
                id: 'd2ac5b36-0a18-43e4-8c9d-8170f0cdb6bf',
                display: 'John',
            },
            community: {
                id: 'aac628e3-6f90-4188-9109-a29f37f2d4fd',
                display: 'Dallas Circus Community'
            }
        },
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'invited you to'},
            {type: 'data_token', key: NotificationDataKeysEnum.COMMUNITY}
        ]
    },
    {
        id: 'e1a30454-64f2-463d-985d-d745062c7182',
        type: NotificationTypeEnum.FRIEND_REQUEST,
        timestamp: 1731455934936,
        read: false,
        data: {
            user: {
                id: 'cfdd3285-5224-485e-a29f-f2940d47e46c',
                display: 'Christine'
            }
        },
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'sent you a friend request'},
        ]
    },
    {
        id: '1247bdbc-8fd1-4669-97e5-c74a07e23cb8',
        type: NotificationTypeEnum.MENTION,
        timestamp: 1731364892172,
        read: false,
        data: {
            user: {
                id: '13070cb8-1ba5-41b1-b455-b55c3cc565ac',
                display: 'Jordan'
            },
            community: {
                id: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319',
                display: 'DFW Aerialists',
            },
            channel: {
                display: 'Lyra Fanatics',
                communityId: '8b20f3b1-a176-41b6-b1c6-a60cc3ddd319',
                id: 'c017499f-31d5-4f9f-adba-0ce8fb8b05ba'
            }
        },
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'mentioned you in'},
            {type: 'data_token', key: NotificationDataKeysEnum.CHANNEL},
        ]
    },
    {
        id: '6aaced35-87d8-4f91-be18-1765104d2ec3',
        type: NotificationTypeEnum.REQUEST_ACCEPTED,
        timestamp: 1731364892378,
        read: false,
        data: {
            user: {
                id: '344b0fdd-aad1-4220-9905-841df0aca8f4',
                display: 'Quentin'
            }
        },
        message: [
            {type: "data_token", key: NotificationDataKeysEnum.USER},
            {type: 'text', text: 'accepted your friend request'},
        ]
    }
]