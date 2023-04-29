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

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{HOST}:{PORT}/{DATABASE_NAME}'.format(**config_dict)