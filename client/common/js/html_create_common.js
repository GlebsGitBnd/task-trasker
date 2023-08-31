//Общий класс создания HTML блоков
class Html {
    constructor() {
    }

    //Создание кнопки закрытия
    static createBtnCloseCard() {
        return `
        <div class="new_card__close">
            <img src="./common/img/close.svg" alt="close">
        </div>`
    }

    //Создание кнопки сабмита
    static createBtnSubmitAdd() {
        return `
        <div class="submit_box">
            <label class="submit_label">
                <input type="submit" value="Создать задание" id="input_submit_post">
            </label>
        </div>
        `
    }

    //Создание предупреждения о случайном закрытии
    static createWarningWindowAdd() {
        return `
        <div class="warning">
            <div class="warning__info">
                <div class="warning__text">Изменения не будут сохранены. Вы уверены, что хотите продолжить?</div>
                <div class="warning__button">
                    <button id="abolitionBtn">Отменить</button>
                    <button id="continueBtn">Продолжить</button>
                </div>
            </div>
        </div>`
    }
}