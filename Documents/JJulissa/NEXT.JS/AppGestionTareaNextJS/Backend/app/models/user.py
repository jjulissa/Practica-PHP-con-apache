# app/models/user.py 

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password  # En producción deberías hashear la contraseña
        self.tasks = []

class UserStore:
    users = {}

    @classmethod
    def add_user(cls, username, password):
        if username in cls.users:
            raise ValueError("Usuario ya existe")
        cls.users[username] = User(username, password)

