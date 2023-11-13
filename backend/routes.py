from fastapi import APIRouter

import backend.database as db
from backend.config.constants import API_BASE_URL

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
