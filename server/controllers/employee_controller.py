from typing import List, Dict, Union, Any, Tuple
from datetime import datetime
from server.models.employee_models import Employee, db


class EmployeeController:
	@staticmethod
	def get_all_employees() -> List[Dict[str, Union[int, str]]]:
		"""
			Получает список всех сотрудников из БД
	
			:return: Список словарей, представляющих данные о сотрудниках
		"""
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
		"""
			Получает данные о сотруднике по его идентификатору из БД

			:param employee_id: Идентификатор сотрудника
			:return: Словарь, представляющий данные о сотруднике
				или кортеж с сообщением об ошибке и кодом статуса
		"""
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
		"""
	        Выполняет поиск сотрудников по имени в БД
	
	        :param search_query: Строка запроса(Имя сотрудника) для поиска
	        :return: Список словарей, представляющих данные найденных
	            сотрудников или кортеж с сообщением об ошибке и кодом статуса
        """
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
		"""
            Создает нового сотрудника в БД

            :param data: Словарь с данными нового сотрудника
            :return: Словарь с сообщением об успешном создании или кортеж с сообщением об ошибке и кодом статуса
        """
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
		"""
            Обновляет данные сотрудника по его идентификатору в БД

	        :param employee_id: Идентификатор сотрудника
	        :param data: Словарь с обновленными данными сотрудника
	        :return: Словарь с сообщением об успешном обновлении или кортеж с сообщением об ошибке и кодом статуса
        """
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
		"""
	        Удаляет сотрудника по его идентификатору из БД
	
	        :param employee_id: Идентификатор сотрудника
	        :return: Словарь с сообщением об успешном удалении или кортеж с сообщением об ошибке и кодом статуса
        """
		employee = Employee.query.get(employee_id)
		if employee:
			db.session.delete(employee)
			db.session.commit()
			return {'message': f'Employee {employee_id} deleted'}
		return {'message': f'Employee {employee_id} not found'}, 404
