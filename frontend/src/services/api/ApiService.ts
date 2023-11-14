import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../config/variables';
import { CreateFriend, Friend } from '../../models/Friend/Friend';
import { ApiServiceConfig, BaseApiService } from './shared/BaseApiService';
import { Requests } from './shared/Requests';
import { extract } from './shared/extract';
import { rethrow } from './shared/rethrow';

type AR<T> = AxiosResponse<T>; // TODO: Refactor http sender to intrinsically extract data from `AxiosResponse`

type FriendsListResponse = { friends: Friend[] };
type FriendResponse = { friend: Friend };
type CreateFriendResponse = { friendId: Friend['id'] };

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
            .get<AR<FriendResponse>>(this.makeUrl('friends', friendId))
            .then(extract)
            .catch(rethrow);
    }
    async createFriend(friend: CreateFriend): Promise<CreateFriendResponse> {
        // prettier-ignore
        return this.http
            .post<AR<CreateFriendResponse>>(this.makeUrl('friends'), friend)
            .then(extract)
            .catch(rethrow);
    }
}

export const apiService = new ApiService(axios, { baseUrl: BASE_URL });
