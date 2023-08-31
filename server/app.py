from __future__ import annotations
from flask import Flask, request, jsonify, Response
from flask_autoindex import AutoIndex
from flask_cors import CORS
from flask_migrate import Migrate

from server.data_base.data_base_init import db
from server.controllers.employee_controller import EmployeeController
from server.controllers.task_controller import TaskController

import os

app = Flask(__name__)
CORS(app)

current_directory = os.path.abspath(os.path.dirname(__file__))
database_path = os.path.join(current_directory, '../database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
	db.create_all()


# EndPoints Employee
@app.route('/employees', methods=['GET'])
def get_employees() -> Response:
	employees = EmployeeController.get_all_employees()
	return jsonify(employees)


@app.route('/employees/search_id/<int:employee_id>', methods=['GET'])
def get_employee(employee_id) -> Response:
	employee = EmployeeController.get_employee_by_id(employee_id)
	return jsonify(employee)


@app.route('/employees/search_name', methods=['GET'])
def search_employee_by_name() -> tuple[Response, int] | Response:
	search_query = request.args.get('q')
	if not search_query:
		return jsonify(
			{'message': 'Search query parameter "q" is missing'}), 400
	
	search_results = EmployeeController.search_employee_by_name(search_query)
	print("Received q parameter:", search_query)
	return jsonify(search_results)


@app.route('/employees', methods=['POST'])
def create_employee() -> Response:
	data = request.json
	response = EmployeeController.create_employee(data)
	return jsonify(response)


@app.route('/employees/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id) -> Response:
	data = request.json
	response = EmployeeController.update_employee(employee_id, data)
	return jsonify(response)


@app.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id) -> Response:
	response = EmployeeController.delete_employee(employee_id)
	return jsonify(response)


# EndPoints Task
@app.route('/tasks', methods=['GET'])
def get_tasks() -> Response:
	tasks = TaskController.get_all_tasks()
	return jsonify(tasks)


@app.route('/tasks/task/<int:task_id>', methods=['GET'])
def get_task(task_id: int) -> Response:
	task_data = TaskController.get_task_by_id(task_id)
	return jsonify(task_data)


@app.route('/tasks/sort', methods=['POST'])
def sort_tasks() -> Response:
	task_order = request.json
	task_sorted = TaskController.sort_tasks_by_order(task_order)
	return jsonify(task_sorted)


@app.route('/tasks', methods=['POST'])
def create_task() -> Response:
	data = request.json
	response = TaskController.create_task(data)
	return jsonify(response)


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id: int) -> Response:
	data = request.json
	response = TaskController.update_task(task_id, data)
	return jsonify(response)


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id: int) -> Response:
	print(task_id)
	response = TaskController.delete_task(task_id)
	return jsonify(response)


if __name__ == '__main__':
	auto_index = AutoIndex(app, browse_root=os.path.join(current_directory, '..', 'client'))
	app.run()
