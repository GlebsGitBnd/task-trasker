from typing import List, Dict, Union, Any, Tuple
from datetime import datetime
from server.models.employee_models import Employee, db


class EmployeeController:
	@staticmethod
	def get_all_employees() -> List[Dict[str, Union[int, str]]]:
		employees = Employee.query.all()
		employee_data = [{
			'id': employee.id,
			'full_name': employee.full_name,
			'position': employee.position,
			'phone_number': employee.phone_number
		} for employee in employees]
		return employee_data
	
	@staticmethod
	def get_employee_by_id(employee_id: int) -> Union[
		Dict[str, Any], Tuple[Dict[str, str], int]]:
		employee = db.session.get(Employee, employee_id)
		if employee:
			employee_data = {
				'id': employee.id,
				'full_name': employee.full_name,
				'birthdate': employee.birthdate.strftime('%Y-%m-%d'),
				'position': employee.position,
				'phone_number': employee.phone_number
			}
			return employee_data
		return {'message': f'Employee {employee_id} not found'}, 404
	
	@staticmethod
	def search_employee_by_name(search_query: str) -> Union[
		List[Dict[str, Any]], Tuple[Dict[str, str], int]]:
		employees = Employee.query.filter(
			Employee.full_name.ilike(search_query)).all()
		
		if employees:
			employee_data = [{
				'id': employee.id,
				'full_name': employee.full_name,
				'birthdate': employee.birthdate.strftime('%Y-%m-%d'),
				'position': employee.position,
				'phone_number': employee.phone_number
			} for employee in employees]
			return employee_data
		else:
			return {'message': 'Employee not found'}, 404
	
	@staticmethod
	def create_employee(data: Dict[str, Any]) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		if data:
			new_employee = Employee(
				full_name=data['full_name'],
				birthdate=datetime.strptime(data['birthdate'],
				                            '%Y-%m-%d').date(),
				position=data['position'],
				phone_number=data.get('phone_number')
			)
			db.session.add(new_employee)
			db.session.commit()
			return {'message': 'Employee created'}
		return {'message': 'Employee not created'}, 404
	
	@staticmethod
	def update_employee(employee_id: int, data: Dict[str, str]) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		employee = Employee.query.get(employee_id)
		if employee:
			for key, value in data.items():
				if key == 'birthdate':
					value = datetime.strptime(value, '%Y-%m-%d').date()
				if hasattr(employee, key):
					setattr(employee, key, value)
			db.session.commit()
			return {'message': f'Employee {employee_id} updated'}
		return {'message': f'Employee {employee_id} not found'}, 404
	
	@staticmethod
	def delete_employee(employee_id: int) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		employee = Employee.query.get(employee_id)
		if employee:
			db.session.delete(employee)
			db.session.commit()
			return {'message': f'Employee {employee_id} deleted'}
		return {'message': f'Employee {employee_id} not found'}, 404
