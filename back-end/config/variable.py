from dotenv import load_dotenv
import os
from urllib.parse import quote

load_dotenv()

config_dict = {
    'HOST': os.getenv("MYSQL_DATABASE_HOST"),
    'PORT': os.getenv("MYSQL_DATABASE_PORT"),
    'DATABASE_NAME': os.getenv("MYSQL_DATABASE_DATABASE_NAME"),
    'DATABASE_USER': os.getenv("MYSQL_DATABASE_USER"),
    'DATABASE_PASSWORD': quote(os.getenv("MYSQL_DATABASE_PASSWORD")),
}

config_jwt = {
    'SECRET_KEY': os.getenv("JWT_SECRET_KEY"),
    'ALGORITHM': os.getenv("JWT_ALGORITHM"),
    'ACCESS_TOKEN_EXPIRE_MINUTES': int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES")),
}

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{HOST}:{PORT}/{DATABASE_NAME}'.format(**config_dict)