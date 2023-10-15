from datetime import datetime

from cachetools import TTLCache

import backend.auth_api.auth_utils as auth_utils

TOKEN_TTL = 24 * 60 * 60 # 24 hours
MAX_USER_SESSIONS = 100
token_cache = TTLCache(maxsize=MAX_USER_SESSIONS, ttl=TOKEN_TTL)


def make_token(user_id: str, username: str, password: str) -> str:
    token = auth_utils.make_hash(str(datetime.now()), f'{username}:{password}')
    token_cache[user_id] = token
    return token

def get_token(user_id: str) -> str:
    return token_cache.get(user_id)