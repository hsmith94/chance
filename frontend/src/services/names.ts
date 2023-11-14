const FIRST_NAMES = ['John', 'Jane', 'Bob', 'Alice'];
const LAST_NAMES = ['Doe', 'Smith', 'Johnson', 'Brown'];

namespace Utils {
    export function getRandomElement(arr: string[]): string {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}

export function generateRandomName(): string {
    const firstName = Utils.getRandomElement(FIRST_NAMES);
    const lastName = Utils.getRandomElement(LAST_NAMES);
    return `${firstName} ${lastName}`;
}
