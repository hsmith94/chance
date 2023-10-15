
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

import backend.auth_api.auth_service as auth_service
from backend.config.constants import AUTH_API_BASE_URL
from backend.config.errors import ER_USER_ALREADY_EXISTS, ER_USER_NOT_FOUND

auth_router = APIRouter(prefix=f"{AUTH_API_BASE_URL}")

@auth_router.post('/register/{username}/{password}')
def register(username: str, password: str):
    try:
        auth_service.register(username, password)
        return JSONResponse(status_code=status.HTTP_201_CREATED)
    except Exception as e:
        if (str(e) == ER_USER_ALREADY_EXISTS):
            return HTTPException(status_code=400, detail="User with this username already exists")
        else:
            raise e
    

@auth_router.post('/sign-in/{username}/{password}')
def sign_in(username: str, password: str):
    try:
        result = auth_service.sign_in(username, password)
        return JSONResponse(status_code=status.HTTP_200_OK, content=result)
    except Exception as e:
        if (str(e) == ER_USER_NOT_FOUND):
            return HTTPException(status_code=400, detail="User with this username/password combination does not exist")
        else:
            raise e
