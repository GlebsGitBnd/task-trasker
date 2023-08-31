//Класс создания нового работника
class AddNewEmployee {
    constructor(addButton, addBlock) {
        this.addButton = addButton
        this.addBlock = addBlock
    }

    //Добавление нового работника
    addNewEmployee() {
        this.addButton.click(async () => {
            const taskCard = $(HtmlEmployee.createCardEmployee());

            const fixedCardHtml = CreateCard.createCard(this.addBlock, taskCard)
            const closeBtn = fixedCardHtml.find('.new_card__close')

            const nameSubmit = $(fixedCardHtml).find('#input_submit_post')
            nameSubmit.prop('value', 'Создать сотрудника')

            CreateCard.closeWindowNewCard(closeBtn, fixedCardHtml, this.addBlock)

            this.addBlock.append(fixedCardHtml)
            this.addBlock.css({'display': 'flex'})

            const employeeSection = $('.task-tracker__employee')
            employeeSection.css({'z-index': '2000'})

            await this.postNewTask()
        })
    }

    //Запрос на сохранения нового работника в БД
    async postNewTask() {
        const formNewCard = this.addBlock.find('form')
        const submit = this.addBlock.find('input[type="submit"]')
        formNewCard.submit(async (e) => {
            e.preventDefault()
            const formData = new FormData(formNewCard.get(0))

            const formDataObject = await RegularExp.checkEmployeeCardFormData(formData, 'EMPLOYEE')
            console.log(formDataObject)

            if (!formDataObject) return

            const res = await Employee.postDataEmployees(formDataObject)
            if (!res) return

            this.addBlock.css({'display': 'none'})
            alert('Сотрудник успешно создан')
            location.reload();
            this.addBlock.empty()
        })
        submit.click(() => {
            formNewCard.trigger('submit')
        })
    }
}