from flask_sqlalchemy import SQLAlchemy

# Create a single instance of SQLAlchemy
db = SQLAlchemy()

from .User import User
from .Transaction import Transaction