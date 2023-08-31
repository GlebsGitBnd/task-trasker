class HtmlEmployee {
    constructor() {
    }

    static createCardEmployee() {
        return `
        <div class="card-window__employee_form card_box">
            <form id="card_box__form">
                <div class="fool-info__container">
                    <label class="fool-info__label">
                        <span>Ф.И.О:</span>
                        <input type="text" name="full_name" class="fool-info__input">
                    </label>
                    <label class="fool-info__label">
                        <span>Дата Рождения:</span>
                        <input type="text" name="birthdate" class="fool-info__input">
                    </label>
                    <label class="fool-info__label">
                        <span>Должность:</span>
                        <input type="text" name="position" class="fool-info__input">
                    </label>
                    <label class="fool-info__label">
                        <span>Номер телефона:</span>
                        <input type="text" name="phone_number" class="fool-info__input">
                    </label>
                </div>
            </form>
        </div>
        `
    }
}