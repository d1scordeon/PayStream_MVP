import os

from flask import Flask, render_template, request
from models import db
from controller.Transaction_Controller import TransactionController

# from models import User

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, template_folder='template')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'paystream.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize TransactionController
transaction_controller = TransactionController()


@app.route('/login', methods=['GET', 'POST'])
def login():
    return transaction_controller.login_user(request)


@app.route('/register', methods=['GET', 'POST'])
def register():
    return transaction_controller.register_user(request, app)


@app.route('/sendTransaction', methods=['POST'])
def send_transaction():
    return transaction_controller.create_transaction(request, app)


@app.route('/myTransactions', methods=['POST'])
def my_transactions():
    return transaction_controller.get_all_transactions(request)


@app.route('/')
def index():
    return render_template("mainpage/index.html")



if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
