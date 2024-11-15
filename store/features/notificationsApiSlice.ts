import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockData } from '../../data/mockInitialData'
import { notificationObservable } from '../../data/notificationObservable'
import { ChatAppNotification } from '../../data/NotificationTypes'

const mockLoading = () => new Promise((resolve) => setTimeout(resolve, 1000))
const notificationsAdapter = createEntityAdapter({
  sortComparer: (a: ChatAppNotification, b: ChatAppNotification) => b.timestamp - a.timestamp
})
export const notificationsApi = createApi({
    reducerPath: 'notifications',
    baseQuery: fetchBaseQuery({}),
    endpoints: (build) => ({
        getNotifications: build.query<EntityState<ChatAppNotification, string>, void>({
            async queryFn(){
                await mockLoading()
                return {data: notificationsAdapter.addMany(notificationsAdapter.getInitialState(), mockData)}
            },
            async onCacheEntryAdded(arg, {cacheDataLoaded, updateCachedData, cacheEntryRemoved}) {
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded
          
                    // when data is received from the subscription,
                    // update our query result with the received message
                    const sub = notificationObservable.subscribe((notif) => {
                      updateCachedData((draft) => {
                        notificationsAdapter.upsertOne(draft, notif)
                      })
                    })
          
                } catch {
                // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
            },
        }),
        updateNotificationStatus: build.mutation<any, ChatAppNotification>({
            queryFn(arg, api, extraOptions, baseQuery) {
                // this is just mocking a call to the backend to update the data
                // in a real application we would make a call to update the notification data
                return new Promise((resolve) => setTimeout(() => resolve({data:[]}), 1000))
            },
            async onQueryStarted(notification, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    notificationsApi.util.updateQueryData('getNotifications', undefined, (draft) => {
                      notificationsAdapter.upsertOne(draft, notification)
                    })
                  )
                  try {
                    await queryFulfilled
                  } catch {
                    patchResult.undo()
                  }
            }
        })
    })
})

export const { useGetNotificationsQuery, useUpdateNotificationStatusMutation } = notificationsApi