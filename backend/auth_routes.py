import hashlib

from fastapi import APIRouter, HTTPException

import backend.database as db
from backend.config import AUTH_API_BASE_URL
from backend.database import User

auth_router = APIRouter(prefix=f"{AUTH_API_BASE_URL}")

def utf8(str_to_encode: str) -> str:
    return str(str_to_encode).encode('utf-8')

def make_hash(username: str, password: str) -> str:
    salt = username; # Use username as salt
    str_to_hash = f'{salt}:{password}'
    md5_obj = hashlib.md5(utf8(str_to_hash))
    return md5_obj.hexdigest()

@auth_router.post('/register/{username}/{password}')
def register(username: str, password: str):
    if (db.user_exists(username)):
        return HTTPException(status_code=400, detail="User with this username already exists")
    
    password_hash = make_hash(username, password)
    user = User.from_username_password(username, password_hash)
    db.put_user(user)
    

@auth_router.post('/sign-in/{username}/{password}')
def sign_in(username: str, password: str):
    if (not db.user_exists(username)):
        return HTTPException(status_code=400, detail="User with this username does not exist")
    
    password_hash = make_hash(username, password)
    user = db.get_user_by_username_password_hash(username, password_hash)
    return user.to_response()

