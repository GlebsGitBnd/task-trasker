//Экземпляр отрисовки карточек с заданиями
const allTasksContainer = $('.tasks__all_tasks')
const render = new Render(allTasksContainer)


//Экземпляр Добавления задания
const addTaskButton = $('.new-task__add_button > img')
const addTaskBlack = $('.new-task__card_window')
const newTask = new AddNewTask(addTaskButton, addTaskBlack)

//Экземпляр Добавления Сотрудника
const addEmployeeButton = $('.employee__add_button > img')
const addEmployeeBlack = $('.employee__card_window')
const newEmployee = new AddNewEmployee(addEmployeeButton, addEmployeeBlack)


//Запуск отрисовки
newTask.addNewTask()
newEmployee.addNewEmployee()
render.renderTaskCard()






