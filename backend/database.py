import os

import backend.config.environment as env
from backend.config.errors import (ER_FRIEND_NOT_FOUND, ER_NOT_FRIEND_OF_USER,
                                   ER_USER_NOT_FOUND)


class User:
    id: str
    username: str
    password_hash: str
    picture: str = None

    def __init__(self, user_id: str):
        self.id = user_id

    @staticmethod
    def from_username_password(username: str, password_hash: str):
        user_id = username; # Use username as user_id
        self = User(user_id)
        self.username = username
        self.password_hash = password_hash
        return self
    
    def to_response(self) -> dict:
        return {
            'id': self.id,
            'username': self.username,
            'picture': self.picture,
        }

class Friend:
    id: str
    friend_of: str
    name: str

    def __init__(self, friend_id: str, friend_of: str, name: str):
        self.id = friend_id
        self.friend_of = friend_of
        self.name = name

    def to_response(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
        }

def make_database():
    return {
        'users': [],
        'friends': [
            # Test data (TODO: REMOVE!!)
            Friend(friend_id='friend-1', friend_of='Harry', name='John Doe'),
            Friend(friend_id='friend-2', friend_of='Harry', name='Jane Doe'),
            Friend(friend_id='friend-3', friend_of='Harry', name='John Smith'),
            Friend(friend_id='friend-4', friend_of='Harry', name='Jane Smith'),
        ],
    }

DATABASE = {
    'chance_dev': make_database(),
    'chance_prod': make_database(),
}

def _get_current_database():
    return DATABASE[env.DB_NAME]

current_database = _get_current_database()

def _get_from_table_by_property(table_name: str, property: str, value):
    table = current_database[table_name]
    return [row for row in table if getattr(row, property) == value]

def _get_from_table_by_properties(table_name: str, properties: dict):
    table = current_database[table_name]
    return [row for row in table if all([getattr(row, property) == value for property, value in properties.items()])]

def get_user_by_username_password_hash(username: str, password_hash: str) -> User:
    users_table = current_database['users']
    users_rows = [row for row in users_table if row.username == username and row.password_hash == password_hash]
    if (len(users_rows) == 0):
        raise Exception(ER_USER_NOT_FOUND)
    return users_rows[0]

def get_user(user_id: str) -> User:
    users_rows = _get_from_table_by_property('users', 'id', user_id)
    if (len(users_rows) == 0):
        raise Exception(ER_USER_NOT_FOUND)
    return users_rows[0]

def user_exists(username: str) -> bool:
    users_rows = _get_from_table_by_property('users', 'username', username)
    return len(users_rows) != 0

def put_user(user: User) -> None:
    current_database['users'].append(user)
    print(current_database)

def get_friends(user_id: str) -> list[Friend]:
    friends_rows = _get_from_table_by_property('friends', 'friend_of', user_id)
    return friends_rows

def get_friend(user_id: str, friend_id: str) -> Friend:
    friends_row = _get_from_table_by_properties('friends', {'friend_of': user_id, 'id': friend_id})
    if (len(friends_row) == 0):
        raise Exception(ER_FRIEND_NOT_FOUND)
    return friends_row[0]

def put_friend(user_id: str, friend: Friend) -> None:
    if (user_id != friend.friend_of):
        raise Exception(ER_NOT_FRIEND_OF_USER)
    current_database['friends'].append(friend)