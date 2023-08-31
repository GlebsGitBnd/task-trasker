//Регулярные Выражения Для всех полей
class RegularExp {
    constructor() {
    }

    //Проверка поля Имени и должности
    static checkEmployeeNameAndPosition(strKey, strVal, strTag = '') {
        const regName = /.{2,}/;
        if (['full_name', 'position', 'executor_id'].includes(strKey) && !regName.test(strVal)) {
            if (strKey === 'full_name' || strKey === 'executor_id') strTag = 'Некорректное Ф.И.О'
            if (strKey === 'position') strTag = 'Некорректное название должности'
            alert(`${strTag}\n` +
                "Должны быть русские или латинские буквы \n" +
                "(Минимум 2 символа)")
            return false
        }
    }

    //Проверка Названия задания
    static checkTaskName(nameKey, nameVal) {
        const regTaskName = /.{2,}/;
        if (nameKey === 'task_name' && !regTaskName.test(nameVal)) {
            alert(`Некорректное название задания\n` +
                "Должны быть русские или латинские буквы \n" +
                "(Минимум 2 символа)")
            return false
        }

    }

    //Проверка номера телефона
    static checkPhoneNumber(phoneKey, phoneVal) {
        const regPhone = /^(?!(?:(?:.*[ -])\1|\+\1))[0-9()+\s-]{6,18}$/
        if (phoneKey === 'phone_number' && !regPhone.test((phoneVal))) {
            alert("Некорректный формат номера телефона \n" +
                "Попробуйте форматы:\n" +
                "+7-XXX-XXX-XX-XX, 8-XXX-XXX-XX-XX, 2-XX-XX-XX \n")
            return false
        }

    }

    //Проверка Статуса Задания
    static checkStatus(statusKey, statusVal) {
        const regStatus = /^(Ожидает работу|В работе|Завершен)$/;
        if (statusKey === 'status' && !regStatus.test(statusVal)) {
            alert("Некорректный статус.\n" +
                "Статус может быть \"Ожидает работу\", " +
                "\"В работе\" или \"Завершен\"");
            return false
        }
    }

    //Проверка Даты
    static checkData(dataKey, dataVal, operation) {
        const regDate = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2]|\d{2})\.(19\d{2}|20\d{2}|21\d{2}|22\d{2})$/
        if ((dataKey === 'deadline' || dataKey === 'birthdate') && !regDate.test(dataVal)) {
            alert("Некорректная дата.\nФормат дд.мм.гггг");
            return false;
        }

        const parts = dataVal.split('.');
        const day = parseInt(parts[0], 10) + 1;
        const month = parseInt(parts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
        const year = parseInt(parts[2], 10);

        const dateObject = new Date(year, month, day)
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        if (dateObject <= today && (operation === 'TASK' || operation === 'EMPLOYEE')) {
            alert("Некорректная дата.\n" +
                "Дата не может быть раньше текущей даты.");
            return false
        }
        return dateObject;
    }

    //Проверка ID
    static checkId(idKey, idVal) {
        const regId = /^[0-9]+$/
        if (idKey === 'id' && !regId.test(idVal)) {
            alert("Некорректный id.\n" +
                "Должна быть цифра");
            return false
        }
    }

    //Проверка ID задания родителя
    static checkParentTask(idKey, idVal) {
        const regId = /^[0-9\-]*$|^$/
        if (idKey === 'parent_task_id' && !regId.test(idVal)) {
            alert("Некорректный id родительской задачи.\n" +
                "Должна быть цифра или пустая строка или '-'");
            return false
        }
    }

    //Проверка полей Карточки Задания
    static async checkTaskCardFormData(formData, operation) {
        const formDataObject = {};
        for (let pair of formData.entries()) {

            const checkTaskName = RegularExp.checkTaskName(pair[0], pair[1])
            const checkStatus = RegularExp.checkStatus(pair[0], pair[1])
            const checkData = RegularExp.checkData(pair[0], pair[1], operation)
            const checkId = RegularExp.checkId(pair[0], pair[1])
            const checkParentTask = RegularExp.checkParentTask(pair[0], pair[1])

            const checkRegArr = [checkTaskName, checkStatus, checkData, checkId, checkParentTask]

            if (checkRegArr.includes(false)) return
            if (pair[0] === 'deadline') pair[1] = checkData.toISOString().slice(0, 10)
            if (pair[0] === 'id') pair[1] = Number(pair[1])
            if (pair[0] === 'parent_task_id') pair[1] = pair[1]
            if (pair[0] === 'parent_task_id' && (pair[1] === '' || pair[1] === '-')) pair[1] = null
            formDataObject[pair[0]] = pair[1];
        }

        const employee = await Employee.getDataEmployeeByName(formDataObject.executor_id)

        if (formDataObject.parent_task_id !== null) {
            try {
                const task = await Task.getTask(formDataObject.parent_task_id)
                if (task[1] === 404) {
                    throw new Error('Задачи с таким ID не существует')
                }
            } catch (e) {
                alert(e)
                return
            }
        }
        formDataObject.executor_id = employee[0].id

        return formDataObject
    }

    //Проверка полей Карточки Работника
    static async checkEmployeeCardFormData(formData) {
        const formDataObject = {};
        console.log(formData)
        for (let pair of formData.entries()) {

            console.log(pair[0], pair[1])

            const checkNameAndPosition = RegularExp.checkEmployeeNameAndPosition(pair[0], pair[1])
            const checkData = RegularExp.checkData(pair[0], pair[1])
            const checkPhone = RegularExp.checkPhoneNumber(pair[0], pair[1])

            const checkRegArr = [checkNameAndPosition, checkData, checkPhone]

            if (pair[0] === 'deadline' || pair[0] === 'birthdate') pair[1] = checkData.toISOString().slice(0, 10)

            if (checkRegArr.includes(false)) return
            formDataObject[pair[0]] = pair[1];
        }
        return formDataObject
    }
}