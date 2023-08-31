//Класс создания HTML блоков для Задания
class HtmlTask {
    constructor() {
    }

    //Создание полей карочки задания
    static createCardTask(full_name = '', status = '',
                          deadline = '', id = '',
                          parentTaskID = '', parentTaskName = '') {
        return `
        <div class="card-window__task_card card_box" id="${id}">
            <form class="card_box__form">
                <div class="card_box__name_block name-block">
                    <div class="name-block__text text-name">
                        <div class="text-name__label_container"></div>
                    </div>
                </div>
                <div class="card_box__fool_block fool-info">
                    <div class="fool-info__container">
                        <label class="fool-info__label">
                            <span>Исполнитель:</span>
                            <input type="text"
                                   value="${full_name}"
                                   class="fool-info__input"
                                   name="executor_id">
                        </label>
                        <label class="fool-info__label">
                            <span>Статус:</span>
                            <input type="text"
                                   value="${status}"
                                   class="fool-info__input"
                                   name="status">
                        </label>
                        <label class="fool-info__label">
                            <span>Срок:</span>
                            <input type="text"
                                   value="${deadline}"
                                   class="fool-info__input"
                                   name="deadline">
                        </label>
                        <label class="fool-info__label">
                            <span>ID Задачи:</span>
                            <input type="text"
                                   value="${id}"
                                   class="fool-info__input"
                                   name="id">
                        </label>
                        <label class="fool-info__label">
                            <span>ID Родительской задачи:</span>
                            <input type="text"
                                   value="${parentTaskID !== null ? parentTaskID : '-'}"
                                   class="fool-info__input"
                                   name="parent_task_id">
                        </label>
                        <label class="fool-info__label parent-task-text">
                            <span>Название Родительской задачи:</span>
                            <div>${parentTaskName !== '' ? parentTaskName : '-'}</div>
                        </label>
                    </div>
                </div>
            </form>
        </div>`
    }

    //Создания полей информации о работнике
    static createEmployeeInfo(full_name, birthday, phone_number, position) {
        return `
        <div class="card_box__employee_info employee-info">
            <hr>
            <div class="employee-info__btn-container">
                <div class="employee-info__btn_block btn-block">
                    <button class="btn_block card_task__btn_block" type="button">Информация о сотруднике</button>
                </div>
                <div class="employee-info__btn_block btn-block">
                    <button class="btn_block reload_task__btn_block" type="button">Обновить задание</button>
                </div>
            </div>
            <div class="employee-info__employee_data_info employee-data-info">
                <div class="employee-data-info__name">Ф.И.О: ${full_name}</div>
                <div class="employee-data-info__birthday">Дата рождения: ${birthday}</div>
                <div class="employee-data-info__phone">Номер телефона: ${phone_number}</div>
                <div class="employee-data-info__position">Должность: ${position}</div>
            </div>
        </div>`
    }

    //Вспомогательные Детали Состояния
    static createSupportDetail(employee_short_name) {
        return `
        <div class="task_name__support_detail support-detail">
            <div class="support-detail__short_name">(${employee_short_name})</div>
            <div class="support-detail__dragg_and_drop ui-icon">
                <img src="./common/img/hamburger.svg" alt="dragg">
            </div>
            <span class="support-detail__direction">&#9660;</span>
        </div>
        `
    }

    //Текстареа для ввода названия задачи
    static createLabelTextarea(src, task_name) {
        return `
        <label class="text-name__label">
            <span class="text-name__label_span">
                <img src="${src}" alt="status" class="img_status">
                &nbsp;
            </span>
            <textarea class="fool-info__input"
                  name="task_name"
                  readonly>${task_name}</textarea>
            </label>`
    }

    //Инпут для ввода имени сотрудника
    static createInputNameTask() {
        return `
        <label class="text-name__label">
            <span class="text-name__label_span">Название:</span>
            <input type="text" class="fool-info__input" name="task_name">
        </label>`
    }

    //Кнопка удаления Задания
    static createDeleteTaskButton() {
        return `
        <div class="card_box__delete_task">
            <button type="button" class="card_box__delete_button">Удалить</button>
        </div>`
    }
}