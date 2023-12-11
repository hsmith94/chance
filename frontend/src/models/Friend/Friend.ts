import _ from 'lodash';

export type FriendId = string;

export interface Friend {
    id: FriendId;
    name: string;
    description?: string;
    picture?: string;
}

export type FriendMetadata = Omit<Friend, 'id'>;

export function isFriend(x: any): x is Friend {
    if (_.isNil(x)) return false;
    if (!_.isPlainObject(x)) return false;
    if (!_.isString(x.id)) return false;
    if (!_.isString(x.name)) return false;
    if (!_.isNil(x.description) && !_.isString(x.description)) return false;
    if (!_.isNil(x.picture) && !_.isString(x.picture)) return false;
    return true;
}
