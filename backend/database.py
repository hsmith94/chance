import os

import backend.environment as env
from backend.errors import ER_FRIEND_NOT_FOUND, ER_USER_NOT_FOUND


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
    name: str

    def __init__(self, friend_id: str):
        self.id = friend_id

def make_database():
    return {
        'users': [],
        'friends': [],
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

def get_friend(friend_id: str) -> Friend:
    friends_row = _get_from_table_by_property('friends', 'id', friend_id)
    if (len(friends_row) == 0):
        raise Exception(ER_FRIEND_NOT_FOUND)
    return friends_row[0]

def put_friend(friend: Friend) -> None:
    current_database['friends'].append(friend)