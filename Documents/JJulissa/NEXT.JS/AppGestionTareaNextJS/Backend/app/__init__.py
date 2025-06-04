# backend/app/__init__.py

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    JWTManager(app)

    from app.routes.auth import auth_bp
    from app.routes.tasks import tasks_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)

    return app


