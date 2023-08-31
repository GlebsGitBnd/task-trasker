//Удаление задачи
class TaskDelete {
    constructor(taskCard) {
        this.taskCard = taskCard
    }

    //Метод удаления задачи
    async deleteTask() {
        if (confirm('Данные нельзя будет восстановить.')) {
            await Task.deleteTask(this.taskCard.find('input[name="id"]').val())
            await this.taskCard.animate({opacity: 0}, 500).promise();
            await this.taskCard.slideUp(500).promise();
            this.taskCard.remove();
        }
    }
}