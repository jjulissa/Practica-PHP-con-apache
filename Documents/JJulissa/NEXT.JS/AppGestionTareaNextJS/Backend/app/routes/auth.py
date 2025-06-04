 # app/routes/auth.py 

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import UserStore

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        UserStore.add_user(data['username'], data['password'])
        return jsonify({"message": "Usuario registrado"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = UserStore.users.get(data['username'])
    if user and user.password == data['password']:
        access_token = create_access_token(identity=user.username)
        return jsonify(token=access_token)
    return jsonify({"error": "Credenciales inválidas"}), 401


 