import { concatMap, delay, interval, map, of } from "rxjs";
import { mockData } from "./mockInitialData";
import { NotificationDataManager } from "./NotificationDataManager";

// passing in the mock data to the constructor in order to simulate 
// having a list of communities that the user belongs to
// via the "knownCommunities" property on the object
// doing this in order to simulate more of a real-life situation where you 
// are going to be mentioned in communities you are already a part of
const manager = new NotificationDataManager(mockData)

export const notificationObservable = interval(10000)
.pipe(
    // random delay to simulate real-world circumstances
    concatMap(i => of(i).pipe(delay(1000 + (Math.random() * 5000)))),
    map(e => manager.buildNewNotification())
)