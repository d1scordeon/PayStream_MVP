import bcrypt, json
from . import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    cardnumber = db.Column(db.String(16), nullable=False)
    expdate = db.Column(db.String(5), nullable=False)
    cvv = db.Column(db.String(3), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    # # Define the relationship with the transactions model
    # transactions = db.relationship('transactions', backref='user', lazy=True)

    def __init__(self, username, email, password, cardnumber, expdate, cvv,):
        self.username = username
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.cardnumber = cardnumber
        self.expdate = expdate
        self.cvv = cvv

    def register_transaction(self):
        pass

    def notify(self):
        pass

    def __repr__(self):
        return f'<User {self.id} {self.username} {self.cardnumber}>'

    @classmethod
    def json_loads(cls, data):
        flat_data = cls.flatten_nested(data, prefix='bankcard')
        print(f'flattener ${flat_data}')
        return cls(**flat_data)

    @staticmethod
    def flatten_nested(data, prefix=''):
        # Helper function to recursively flatten nested dictionaries
        flat_data = {}
        for key, value in data.items():
            new_key = f'{key}' if prefix else key
            if isinstance(value, dict):
                flat_data.update(User.flatten_nested(value, prefix=new_key))
            else:
                flat_data[new_key] = value
        return flat_data

    @staticmethod
    def get_user(username):
        return User.query.filter_by(username=username).first()

    @classmethod
    def authenticate(cls, username, password):
        user = cls.query.filter_by(username=username).first()

        if user and user.check_password(password):
            return user

        return None

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password)

    def to_json_login(self):
        return {'id': self.id, 'username': self.username}

    def to_json(self):
        return {'username': self.username, 'email': self.email,
                'cardnumber': self.cardnumber, 'expdate': self.expdate, 'cvv': self.cvv,
                }
