import backend.config.environment as env
from backend.config.constants import FRONTEND_URL__HEROKU, FRONTEND_URL__LOCAL

IS_PRODUCTION = env.ENV == 'production'

CORS_ORIGINS = [FRONTEND_URL__HEROKU] if IS_PRODUCTION else [FRONTEND_URL__LOCAL]
