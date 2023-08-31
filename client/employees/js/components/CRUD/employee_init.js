//Класс запросов для Работника
class Employee {
    constructor() {
    }

    //Общий url для работников
    static get url() {
        return 'http://127.0.0.1:5000/employees'
    }

    //Получить всех работников
    static async getDataEmployees() {
        try {
            const response = await fetch(this.url)
            CheckError.statusCheck(response)
            return await response.json()
        } catch (err) {
            console.log(err)
        }

    }

    //Получить одного работника
    static async getDataEmployee(employeeId) {
        const response = await fetch(`${this.url}/search_id/${employeeId}`);
        return await response.json();
    }

    //Получить одного работника по имени
    static async getDataEmployeeByName(name) {
        try {
            const response = await fetch(`${this.url}/search_name?q=${encodeURIComponent(name)}`)
            if (!response.ok) {
                throw new Error('Такого сотрудника нет в Базе Данных')
            }
            return await response.json();
        } catch (err) {
            alert(err)
        }
    }

    //Добавить нового работника
    static async postDataEmployees(data) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            CheckError.statusCheck(response)
            return await response.json()
        } catch (err) {
            console.log(err)
        }

    }

    //Удалить нового работника
    static async deleteEmployee(employeeId) {
        try {
            const response = await fetch(`${this.url}/${employeeId}`, {
                method: 'DELETE'
            });
            CheckError.statusCheck(response)
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }

    //Обновить нового работника
    static async updateEmployee(employeeId, data) {
        try {
            const response = await fetch(`${this.url}/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            CheckError.statusCheck(response)
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }

}
