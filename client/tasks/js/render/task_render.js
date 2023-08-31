//Отрисовка Всех заданий
class Render {
    constructor(renderContainer) {
        this.renderContainer = renderContainer
    }

    //Отрисовка всех карточек с заданиями
    async renderTaskCard() {
        const dataTask = await Task.getTasks()

        for (const elem of dataTask) {
            const dataEmployee = await Employee.getDataEmployee(elem.executor_id)

            const employee_short_name = dataEmployee.full_name.split(' ').slice(0, 2).join(' ')
            const dateBirthdateRus = this.formatDateRussian(dataEmployee.birthdate)
            const dateDeadlineRus = this.formatDateRussian(elem.deadline)

            if (elem.parent_task_id) {
                const dataParentTask = await Task.getTask(elem.parent_task_id)
                elem.parent_task_id = dataParentTask.id
                elem.parent_task_name = dataParentTask.task_name
            }

            const cardTask = $(HtmlTask.createCardTask(dataEmployee.full_name,
                elem.status, dateDeadlineRus, elem.id, elem.parent_task_id, elem.parent_task_name))

            let src;
            switch (elem.status) {
                case 'Завершен':
                    src = './tasks/img/fullfield.svg';
                    break;
                case 'Ожидает работу':
                    src = './tasks/img/reject.svg';
                    break;
                case 'В работе':
                    src = './tasks/img/panding.svg';
                    break;
            }

            const textarea = $(HtmlTask.createLabelTextarea(src, elem.task_name))
            const employeeInfo = $(HtmlTask.createEmployeeInfo(dataEmployee.full_name,
                dateBirthdateRus, dataEmployee.phone_number, dataEmployee.position))
            const supportDetail = $(HtmlTask.createSupportDetail(employee_short_name))
            const deleteTask = $(HtmlTask.createDeleteTaskButton())

            cardTask.find('.text-name__label_container').append(textarea)
            cardTask.find('.card_box__fool_block').append(employeeInfo)
            cardTask.find('.card_box__block').append(deleteTask)
            cardTask.find('.name-block__text').append(supportDetail)
            cardTask.find('input[name="id"]').css('pointer-events', 'none');
            cardTask.append(deleteTask)

            this.renderContainer.append(cardTask)

            const lastCard = this.renderContainer.find('.card_box').last();   //Нужна??

            this.checkInputSize(lastCard)

            this.sortDragAndDrop()
            TaskOpenCard.showInfoCardTask(lastCard)
        }
    }

    //Обновление ширины полей ввода для красивого отображения
    checkInputSize(lastCard) {
        const allInput = this.renderContainer.find('input')
        const textarea = lastCard.find('textarea')
        textarea.css('height', `${textarea[0].scrollHeight - 25}px`);
        textarea.on('input', () => {
            textarea.css('height', `${textarea[0].scrollHeight - 10}px`);
        })
        allInput.each((index, elem) => {
            const inputValue = $(elem).val();
            const textWidth = inputValue.length * 7 + 15;
            $(elem).css({'width': `${textWidth}px`})
        })
    }

    //Перевод даты Европейской в Русскую
    formatDateRussian(dateStr) {
        const [year, month, day] = dateStr.split('-');
        return `${day}.${month}.${year}`;
    }

    sortDragAndDrop() {
        const sortableContainer = $("#sortable")
        sortableContainer.sortable({
            handle: $('.ui-icon'),
            stop: async function () {
                const taskOrder = $(this).sortable("toArray").map((elem) => Number(elem));

                await Task.sortTaskByDragAndDrop(taskOrder)
            }
        });
    }
}