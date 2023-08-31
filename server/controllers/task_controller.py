from server.models.task_models import Task, db
from typing import List, Dict, Union, Any, Tuple
from datetime import datetime


class TaskController:
	@staticmethod
	def get_all_tasks() -> Union[
		List[Dict[str, Any]], Tuple[Dict[str, str], int]]:
		"""
	        Получает список всех задач из БД
	
	        :return: Список словарей, представляющих данные задачи
	            или кортеж с сообщением об ошибке и кодом состояния
        """
		tasks = Task.query.order_by(Task.sort_order).all()
		task_list = []
		
		if tasks:
			for task in tasks:
				task_dict = {
					'id': task.id,
					'task_name': task.task_name,
					'parent_task_id': task.parent_task_id,
					'executor_id': task.executor_id,
					'deadline': task.deadline.isoformat(),
					'status': task.status
				}
				task_list.append(task_dict)
			return task_list
		return {'message': 'Tasks not found'}, 404
	
	@staticmethod
	def get_task_by_id(task_id: int) -> Union[
		Dict[str, Any], Tuple[Dict[str, str], int]]:
		"""
	        Получает данные задачи по ее идентификатору из БД
	
	        :param task_id: идентификатор задачи
	        :return: Словарь, представляющий данные одной задачи
	            или кортеж с сообщением об ошибке и кодом состояния
        """
		task = Task.query.get(task_id)
		if task:
			task_data = {
				'id': task.id,
				'task_name': task.task_name,
				'parent_task_id': task.parent_task_id,
				'executor_id': task.executor_id,
				'deadline': task.deadline.isoformat(),
				'status': task.status
			}
			return task_data
		return {'message': f'Task with id {task_id} not found'}, 404
	
	@staticmethod
	def sort_tasks_by_order(task_order: List[int]) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		"""
	        Обновляет порядок сортировки задач в БД
	
	        :param task_order: Список идентификаторов задач в необходимом порядке
	        :return: Словарь с сообщением об успешном выполнении
	            или кортеж с сообщением об ошибке и кодом состояния
        """
		if task_order:
			for index, task_id in enumerate(task_order):
				task = Task.query.get(task_id)
				if task:
					task.sort_order = index
			db.session.commit()
			return {'message': 'Task order updated'}
		return {'message': 'sort_order not found'}, 404
	
	@staticmethod
	def create_task(data: Dict[str, Any]) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		"""
	        Создает новую задачу в БД
	
	        :param data: Словарь с данными задачи
	        :return: Словарь с сообщением об успешном выполнении
	            или кортеж с сообщением об ошибке и кодом состояния
        """
		new_task = Task(
			task_name=data['task_name'],
			parent_task_id=data.get('parent_task_id'),
			executor_id=data.get('executor_id'),
			deadline=datetime.strptime(data['deadline'], '%Y-%m-%d').date(),
			status=data['status'],
			sort_order=0
		)
		
		tasks_to_update = Task.query.filter(
			Task.sort_order >= new_task.sort_order)
		if tasks_to_update:
			for task in tasks_to_update:
				task.sort_order += 1
			
			db.session.add(new_task)
			db.session.commit()
			return {'message': 'Task_init created'}
		return {'message': 'Task not created'}, 404
	
	@staticmethod
	def update_task(task_id: int, data: Dict[str, Any]) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		"""
            Обновляет задачу по ее идентификатору в БД
	
	        :param task_id: идентификатор задачи
	        :param data: Словарь с обновленными данными задачи
	        :return: Словарь с сообщением об успешном выполнении
	            или кортеж с сообщением об ошибке и кодом состояния
        """
		task = Task.query.get(task_id)
		if task:
			task.task_name = data['task_name']
			task.parent_task_id = data.get('parent_task_id')
			task.executor_id = data.get('executor_id')
			task.deadline = datetime.strptime(data['deadline'],
			                                  '%Y-%m-%d').date()
			task.status = data['status']
			db.session.commit()
			return {'message': f'Task_init {task_id} updated'}
		return {'message': f'Task_init {task_id} not found'}, 404
	
	@staticmethod
	def delete_task(task_id: int) -> Union[
		Dict[str, str], Tuple[Dict[str, str], int]]:
		"""
	        Удаляет задачу по ее идентификатору из БД
	
	        :param task_id: идентификатор задачи задачи
	        :return: Словарь с сообщением об успешном выполнении, или кортеж с сообщением об ошибке и кодом состояния
        """
		task = Task.query.get(task_id)
		if task:
			db.session.delete(task)
			db.session.commit()
			return {'message': f'Task_init {task_id} deleted'}
		return {'message': f'Task_init {task_id} not found'}, 404
