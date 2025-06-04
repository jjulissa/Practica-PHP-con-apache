# app/routes/tasks.py 

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import UserStore
from app.models.task import Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    username = get_jwt_identity()
    user = UserStore.users.get(username)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    tasks = [{"id": t.id, "title": t.title, "description": t.description} for t in user.tasks]
    return jsonify(tasks)

@tasks_bp.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    username = get_jwt_identity()
    user = UserStore.users.get(username)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    data = request.get_json()
    task = Task(data['title'], data['description'], username)
    user.tasks.append(task)
    return jsonify({"message": "Tarea creada", "id": task.id}), 201

