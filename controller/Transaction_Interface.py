from abc import ABC, abstractmethod


class TransactionInterface(ABC):

    @abstractmethod
    def register_user(self, request, app):
        pass

    @abstractmethod
    def login_user(self, request):
        pass

    @abstractmethod
    def create_transaction(self, request, app):
        pass

    @abstractmethod
    def get_all_transactions(self, request):
        pass