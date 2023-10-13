from os.path import abspath

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from backend.routes import router

app = FastAPI()

@app.get('/')
def redirect():
    response = RedirectResponse(url='/app')
    return response

app.mount('/app', StaticFiles(directory=abspath('./frontend/build')), name='static')
app.mount('/static', StaticFiles(directory=abspath('./frontend/build/static')), name='static')

@app.get('/ping')
def health_check():
    return {'200': 'pong'}

app.include_router(router)
