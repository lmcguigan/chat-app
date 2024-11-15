import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { notificationsApi } from './features/notificationsApiSlice'

export const store = configureStore({
  reducer: {
    [notificationsApi.reducerPath]: notificationsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationsApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch