# config.py 

import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'clave-secreta')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secreto')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    DEBUG = True

