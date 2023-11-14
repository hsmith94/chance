export type FriendId = string;

export interface Friend {
    id: FriendId;
    name: string;
}

export type CreateFriend = Omit<Partial<Friend>, 'id'>;
