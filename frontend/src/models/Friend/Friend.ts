export type FriendId = string;

export interface Friend {
    id: FriendId;
    name: string;
    description?: string;
    picture?: string;
}

export type FriendMetadata = Omit<Friend, 'id'>;
