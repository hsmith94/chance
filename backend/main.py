from os.path import abspath

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from backend.auth_routes import auth_router
from backend.routes import router

app = FastAPI()

@app.get('/')
def redirect():
    response = RedirectResponse(url='/app')
    return response

app.mount('/app', StaticFiles(directory=abspath('./frontend/dist')), name='static')
app.mount('/assets', StaticFiles(directory=abspath('./frontend/dist/assets')), name='static')
app.mount('/bundles', StaticFiles(directory=abspath('./frontend/dist/bundles')), name='static')

@app.get('/ping')
def health_check():
    return {'200': 'pong'}

app.include_router(router)
app.include_router(auth_router)
