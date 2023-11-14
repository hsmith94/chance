from fastapi import APIRouter

import backend.database as db
from backend.config.constants import API_BASE_URL
from backend.database import Friend

router = APIRouter(prefix=f'{API_BASE_URL}')

@router.get('/friends')
def get_friends():
    user_id = 'Harry' # While testing (TODO: REMOVE!!!!)
    friends = db.get_friends(user_id)
    return {
        'friends': [friend.to_response() for friend in friends]
    }

@router.get('/friends/{friend_id}')
def get_friend(friend_id: str):
    user_id = 'Harry' # While testing (TODO: REMOVE!!!!)
    friend = db.get_friend(user_id, friend_id)
    return {
        'friend': friend.to_response()
    }

@router.post('/friends')
def create_friend(friend: dict):
    user_id = 'Harry' # While testing (TODO: REMOVE!!!!)
    todays_date = '2021-01-01' # While testing (TODO: REMOVE!!!!)
    friend_id = Friend.make_id()
    friend = Friend(
        friend_id=friend_id, 
        friend_of=user_id, 

        name=friend['name'],
        description=friend.get('description', None),
        picture=friend.get('picture', None),

        create_date=todays_date, 
        update_date=todays_date
    )
    db.put_friend(user_id, friend)
    return {
        'friendId': friend_id
    }
