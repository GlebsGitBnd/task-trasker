//Класс Обновления задачи
class TaskPutUpdate {
    constructor(taskBlock) {
        this.taskBlock = taskBlock
        this.form = this.taskBlock.find('form')
    }

    //метод обновления задачи
    async updateTask() {
        const formData = new FormData(this.form.get(0))
        const formDataObject = await RegularExp.checkTaskCardFormData(formData)

        if (!formDataObject) return

        console.log(formDataObject)
        const currentTask = await Task.getTask(formDataObject.id)
        const identical = Object.keys(currentTask).every((value) => {
            return (currentTask[value] === formDataObject[value])
        })

        if (identical) {
            alert('Внесите изменения.')
            return
        }

        if (formDataObject.id === formDataObject.parent_task_id) {
            alert('Родительская задача не может ссылаться на настоящую.')
            return
        }

        try {
            if (formDataObject.parent_task_id) {
                const task = await Task.getTask(formDataObject.parent_task_id)
                if (task[1] === 404) {
                    throw new Error('Задачи с таким ID не существует')
                }
            }
        } catch (e) {
            alert(e)
            return
        }

        await Task.updateTask(formDataObject.id, formDataObject)
        alert('Успешно обновлено')
        location.reload();
    }
}