import backend.auth_api.auth_utils as auth_utils
import backend.database as db
from backend.auth_api.tokens import get_token, make_token
from backend.errors import ER_USER_ALREADY_EXISTS, ER_USER_NOT_FOUND


def register(username: str, password: str):
    if (db.user_exists(username)):
        raise Exception(ER_USER_ALREADY_EXISTS)
    
    password_hash = auth_utils.make_hash(username, password)
    user = db.User.from_username_password(username, password_hash)
    db.put_user(user)


def sign_in(username: str, password: str):
    if (not db.user_exists(username)):
        raise Exception(ER_USER_NOT_FOUND)
    
    password_hash = auth_utils.make_hash(username, password)
    user = db.get_user_by_username_password_hash(username, password_hash)

    if (get_token(user.id)):
        # return HTTPException(status_code=400, detail="User is already signed in")
        session_token = get_token(user.id)
    else:
        session_token = make_token(user.id, username, password)

    user_response = user.to_response()
    user_response['token'] = session_token

    return user_response