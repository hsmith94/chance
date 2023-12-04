import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../config/variables';
import { Friend, FriendMetadata } from '../../models/Friend/Friend';
import { ApiServiceConfig, BaseApiService } from './shared/BaseApiService';
import { Requests } from './shared/Requests';
import { extract } from './shared/extract';
import { rethrow } from './shared/rethrow';

type AR<T> = AxiosResponse<T>; // TODO: Refactor http sender to intrinsically extract data from `AxiosResponse`

type FriendsListResponse = { friends: Friend[] };
type FriendResponse = { friend: Friend };
type CreateFriendResponse = { friendId: Friend['id']; createdOn: string };
type UpdateFriendResponse = { friendId: Friend['id']; updatedOn: string };
type DeleteFriendResponse = { friendId: Friend['id']; deletedOn: string };

/** Hit URL without using browser cache. */
const noCache = () => {
    return {
        params: {
            cache: Date.now(),
        },
        headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        },
    };
};

export class ApiService extends BaseApiService {
    constructor(httpCreator: Requests.ICreator<Requests.IHttpSender>, config: ApiServiceConfig) {
        super(httpCreator, { baseUrl: `${config.baseUrl}/api/` });
    }
    async getFriendsList(): Promise<FriendsListResponse> {
        // prettier-ignore
        return this.http
            .get<AR<FriendsListResponse>>(this.makeUrl('friends'))
            .then(extract)
            .catch(rethrow);
    }
    async getFriend(friendId: Friend['id']): Promise<FriendResponse> {
        // prettier-ignore
        return this.http
            .get<AR<FriendResponse>>(this.makeUrl('friends', friendId), noCache())
            .then(extract)
            .catch(rethrow);
    }
    async createFriend(friend: FriendMetadata): Promise<CreateFriendResponse> {
        // prettier-ignore
        return this.http
            .post<AR<CreateFriendResponse>>(this.makeUrl('friends'), friend)
            .then(extract)
            .catch(rethrow);
    }
    async updateFriend(friendId: Friend['id'], friend: FriendMetadata): Promise<UpdateFriendResponse> {
        // prettier-ignore
        return this.http
            .put<AR<UpdateFriendResponse>>(this.makeUrl('friends', friendId), friend)
            .then(extract)
            .catch(rethrow);
    }
    async deleteFriend(friendId: Friend['id']): Promise<DeleteFriendResponse> {
        // prettier-ignore
        return this.http
            .delete<AR<DeleteFriendResponse>>(this.makeUrl('friends', friendId))
            .then(extract)
            .catch(rethrow);
    }
}

export const apiService = new ApiService(axios, { baseUrl: BASE_URL });
