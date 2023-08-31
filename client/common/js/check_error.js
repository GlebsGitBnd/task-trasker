//Отлавливает ошибки и выводит её на страницу
class CheckError{
    constructor() {
    }
    static statusCheck(response) {
        if (!response.ok) {
            $('body').html(`<div class="err">Ошибка ${response.status}! Сервер не отвечает</div>`)
            throw new Error(`Ошибка! ${response.status}`)
        }
    }
}