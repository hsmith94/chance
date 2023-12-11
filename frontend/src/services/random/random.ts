import { Friend } from '../../models/Friend/Friend';
import { FIRST_NAMES, LAST_NAMES } from './names';

namespace Utils {
    export function pickRandom<T = any>(arr: T[]): T {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}

export function generateRandomName(): string {
    const firstName = Utils.pickRandom(FIRST_NAMES);
    const lastName = Utils.pickRandom(LAST_NAMES);
    return `${firstName} ${lastName}`;
}

export function pickRandomFriend(friendsList: Friend[]): Friend {
    if (!friendsList) {
        throw Error('Friends list is undefined');
    }
    return Utils.pickRandom(friendsList);
}
