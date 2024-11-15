# Chat app

This is a React Native / Expo app that allows users to view a list of notifications and mark them as read. The app uses RTK Query / Redux-Toolkit to manage the state of notifications, simulating streaming updates with a subscription to an RxJS observable that emits new randomly-generated notifications, and updating status with the `onCacheEntryAdded` lifecycle to simulate optimistic updates while awaiting data sync. 

## Running the app

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```