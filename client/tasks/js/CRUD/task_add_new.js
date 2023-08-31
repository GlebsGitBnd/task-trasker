//Класс создания новой задачи
class AddNewTask {
    constructor(addButton, addBlock) {
        this.addButton = addButton
        this.addBlock = addBlock
    }

    //Создание полей для карточки
    addNewTask() {
        this.addButton.click(async () => {
            const taskCard = $(HtmlTask.createCardTask());
            const createInput = $(HtmlTask.createInputNameTask())

            taskCard.find('.parent-task-text').remove()

            const textNameLabel = taskCard.find('.text-name__label_container')
            textNameLabel.append(createInput)


            const idNewTask = taskCard.find('.fool-info__input[name="id"]').parent()
            idNewTask.remove()

            const spanIdParentTask = taskCard.find('.name_data__name_text[name="parent_task_id"]')
                .siblings('span');
            spanIdParentTask.html('Род. Задача(ID):&nbsp;&nbsp;')

            const fixedCardHtml = CreateCard.createCard(this.addBlock, taskCard)
            const closeBtn = fixedCardHtml.find('.new_card__close')

            CreateCard.closeWindowNewCard(closeBtn, fixedCardHtml, this.addBlock)

            this.addBlock.append(fixedCardHtml)
            this.addBlock.css({'display': 'flex'})

            const employeeSection = $('.task-tracker__employee')
            employeeSection.css({'z-index': '0'})

            await this.postNewTask()
        })
    }

    //Запрос на добавление Задачи
    async postNewTask() {
        const formNewCard = this.addBlock.find('form')
        const submit = this.addBlock.find('input[type="submit"]')
        formNewCard.submit(async (e) => {
            e.preventDefault()
            const formData = new FormData(formNewCard.get(0))

            const formDataObject = await RegularExp.checkTaskCardFormData(formData, 'TASK')
            if (!formDataObject) return

            console.log(formDataObject)

            await Task.postTask(formDataObject)

            this.addBlock.css({'display': 'none'})
            alert('Задача успешно создана')
            location.reload();
            this.addBlock.empty()
        })
        submit.click(() => {
            formNewCard.trigger('submit')
        })
    }
}