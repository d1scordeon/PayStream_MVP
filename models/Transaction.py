from . import db


class Transaction(db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)
    receiver = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    # Define the foreign key relationship with the User model
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, receiver, amount, description, user_id):
        self.receiver = receiver
        self.amount = amount
        self.description = description
        self.user_id = user_id

    def register_transaction(self):
        pass

    def notify(self):
        pass

    def __repr__(self):
        return f'<User {self.id} {self.receiver} {self.amount} {self.description}>'

    @classmethod
    def json_loads(cls, data):
        return cls(**data)

    @staticmethod
    def get_transactions(user_id):
        return Transaction.query.filter_by(user_id=user_id).all()

    def to_json_login(self):
        return {'id': self.id, 'user_id': self.user_id, 'receiver': self.receiver, 'amount': self.amount,
                'created_at': self.created_at}

    def to_json(self):
        return {'created_at': self.created_at, 'receiver': self.receiver, 'amount': self.amount,
                'description': self.description}
