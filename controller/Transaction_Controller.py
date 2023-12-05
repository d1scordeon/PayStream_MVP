import json

from flask import render_template, jsonify
from .Transaction_Interface import TransactionInterface
from models import db, User, Transaction
# Import your Flask app instance


class TransactionController(TransactionInterface):

    def register_user(self, request, app):
        if request.method == 'POST':
            # Check if user exists and save to the database
            request_parsed = request.json
            print(request_parsed)
            user = User.json_loads(request_parsed)
            user_to_send = user.to_json()
            with app.app_context():
                print(user)
                print(user.to_json())
                db.session.add(user)
                db.session.commit()
            return jsonify(html=render_template('userpage/userpage.html'), user=user_to_send, theme='userpage')
        return jsonify(html=render_template('register/register.html'), theme='register')

    def login_user(self, request):
        if request.method == 'POST':
            # Check if the user credentials are valid (you might want to authenticate against a database)
            request_parsed = request.json
            print(request_parsed)

            user = User.authenticate(username=request_parsed.get('username'), password=request_parsed.get('password'))

            if user:
                print(user)
                print(user.to_json_login())
                return jsonify(html=render_template('userpage/userpage.html'), user=user.to_json(), theme='userpage')
            else:
                return jsonify(error='Invalid credentials')

        return jsonify(html=render_template('login/login.html'), theme='login')

    def create_transaction(self, request, app):
        request_parsed = request.json
        print(request_parsed)
        username = request_parsed['sender']
        user = User.get_user(username)
        del request_parsed['sender']
        request_parsed['user_id'] = user.id
        transaction = Transaction.json_loads(request_parsed)
        with app.app_context():
            print(transaction)
            db.session.add(transaction)
            db.session.commit()

        return jsonify(transactions=self.get_serialized_transactions(self, user.id),)

    def get_all_transactions(self, request):
        print(request.json)
        username = request.json['username']
        user = User.get_user(username)
        return jsonify(transactions=self.get_serialized_transactions(self, user.id),)

    @staticmethod
    def get_serialized_transactions(self, user_id):
        transactions = Transaction.get_transactions(user_id)
        print(transactions)
        # Serialize the list of transactions to JSON
        return json.dumps([transaction.to_json() for transaction in transactions], default=str)