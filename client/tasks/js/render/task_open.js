//Класс Открытия карты задания
class TaskOpenCard {
    constructor() {
    }

    //Показать информацию о задании
    static showInfoCardTask(taskCardBlock) {
        taskCardBlock.on('click', async function (e) {

            const foolInfoBlock = $(this).find('.card_box__fool_block')
            const directionBlock = $(this).find('.support-detail__direction')
            const shortNameBlock = $(this).find('.support-detail__short_name')
            const allNameTaskInput = $(this).find('.fool-info__input')
            const employeeInfoBlock = $(this).find('.employee-info__employee_data_info')

            if ($(e.target).hasClass('card_box__delete_button')) {
                await TaskOpenCard.deleteClick(e, taskCardBlock)
                return;
            }

            if (foolInfoBlock.is(":hidden")) {

                directionBlock.html('&#9650;').animate({opacity: 0.5}, 200)
                await shortNameBlock.animate({opacity: 0}, 300).promise()
                shortNameBlock.hide()
                foolInfoBlock.slideDown(500)

                taskCardBlock.find('textarea').css('text-align', 'center')
            } else {
                if ($(e.target).is('input, textarea')) {
                    $(e.target).prop('readonly', false)
                    return;
                }
                if ($(e.target).hasClass('card_task__btn_block')) {
                    TaskOpenCard.showEmployeeInfo(employeeInfoBlock)
                    return
                }
                if ($(e.target).hasClass('reload_task__btn_block')) {
                    const updateTask = new TaskPutUpdate(taskCardBlock)
                    await updateTask.updateTask()
                    return
                }

                directionBlock.html('&#9660;').animate({opacity: 1}, 200)
                foolInfoBlock.slideUp(500);

                shortNameBlock.show()
                shortNameBlock.animate({opacity: 1}, 300)

                taskCardBlock.find('textarea').css('text-align', 'left')
                allNameTaskInput.prop('readonly', true)
            }
        });
    }

    //Удаление задания
    static async deleteClick(e, taskCardBlock) {
        const taskDelete = new TaskDelete(taskCardBlock)
        await taskDelete.deleteTask()
    }

    //Показать дополнительную информацию о работнике
    static showEmployeeInfo(employeeInfoBlock) {
        if (employeeInfoBlock.is(":hidden")) {
            employeeInfoBlock.slideDown(500)
        } else {
            employeeInfoBlock.slideUp(500)
        }
    }
}