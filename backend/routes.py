from datetime import datetime

from fastapi import APIRouter

import backend.database as db
from backend.config.constants import API_BASE_URL
from backend.database import Friend

router = APIRouter(prefix=f'{API_BASE_URL}')

def today() -> str:
    return datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')

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
    todays_date = today()
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
    db.add_friend(user_id, friend)
    return {
        'friendId': friend_id,
        'createdOn': friend.create_date
    }

@router.put('/friends/{friend_id}')
def update_friend(friend_id: str, friend: dict):
    user_id = 'Harry' # While testing (TODO: REMOVE!!!!)

    old_friend = db.get_friend(user_id, friend_id)

    todays_date = today()
    new_friend = Friend(
        friend_id=friend_id,
        friend_of=user_id, 

        name=friend.get('name', old_friend.name),
        description=friend.get('description', old_friend.get_property('description', None)),
        picture=friend.get('picture', old_friend.get_property('picture', None)),

        create_date=old_friend.create_date, 
        update_date=todays_date
    )
    db.update_friend(user_id, friend_id, new_friend)
    return {
        'friendId': friend_id,
        'updatedOn': new_friend.update_date
    }

@router.delete('/friends/{friend_id}')
def delete_friend(friend_id: str):
    user_id = 'Harry' # While testing (TODO: REMOVE!!!!)
    db.delete_friend(user_id, friend_id)
    return {
        'friendId': friend_id,
        'deletedOn': today()
    }
