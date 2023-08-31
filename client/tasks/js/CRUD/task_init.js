//Класс Запросов по задачам
class Task {
    constructor() {
    }

    //Общий url для задач
    static get url() {
        return 'http://127.0.0.1:5000/tasks';
    }

    //Получить все задачи
    static async getTasks() {
        try {
            const response = await fetch(this.url);
            CheckError.statusCheck(response)
            return await response.json();
        } catch (err) {
            console.log(err)
        }
    }

    //Получить одну задачу
    static async getTask(taskId) {
        try {
            const response = await fetch(`${this.url}/task/${taskId}`);
            CheckError.statusCheck(response)
            return await response.json();
        } catch (err) {
            alert(err)
        }
    }

    //Создать новую задачу
    static async postTask(data) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            CheckError.statusCheck(response)
        } catch (err) {
            console.log(err)
        }
    }

    //Отсортировать задачи по Drag And Drop
    static async sortTaskByDragAndDrop(taskOrder) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/tasks/sort`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskOrder)
            })
            CheckError.statusCheck(response)
            return await response.json();
        }catch (e) {
            console.log(e)
        }

    }

    //Удалить задачу
    static async deleteTask(taskId) {
        try {
            const response = await fetch(`${this.url}/${taskId}`, {
                method: 'DELETE'
            });
            CheckError.statusCheck(response)
            return await response.json();
        } catch (err) {
            console.log(err)
        }
    }

    //Обновить задачу
    static async updateTask(taskId, data) {
        try {
            const response = await fetch(`${this.url}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            CheckError.statusCheck(response)
            return await response.json();
        } catch (err) {
            console.log(err)
        }
    }
}

