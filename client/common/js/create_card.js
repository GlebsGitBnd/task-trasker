//Класс создания общей карточки
class CreateCard {
    constructor() {
    }

    //Создание общей карточки
    static createCard(cardWindow, card) {
        card.css({'padding': '35px 35px 15px 35px'})

        const taskLabel = card.find(('label:not([class="submit_label"])'))
        taskLabel.css({
            'display': 'flex',
            'justify-content': 'space-between',
            'margin-top': '10px'
        })

        const inputPlace = card.find('.fool-info__input');
        inputPlace.attr({'size': '50', 'readonly': false});
        inputPlace.css({'border': '1px solid grey'})

        const taskFoolInfo = card.find('.card_box__fool_block')
        taskFoolInfo.css({'display': 'block'})

        const closeBtn = $(Html.createBtnCloseCard())
        const submitBtn = $(Html.createBtnSubmitAdd())

        card.append(closeBtn, submitBtn)

        return $(card.prop('outerHTML'))
    }

    //Кнопка закрытия при создании карточки
    static closeWindowNewCard(closeBtn, cardWindow, addBlock) {
        closeBtn.click(() => {
            cardWindow.fadeOut(200, () => {
                const warningWindow = $(Html.createWarningWindowAdd())
                warningWindow.hide()
                addBlock.append(warningWindow)
                warningWindow.fadeIn(500)

                this.changesClose(warningWindow, cardWindow, addBlock)
            })
        })
    }

    //Проверка на случайное закрытие
    static changesClose(warningWindow, cardWindow, addBlock) {
        const abolitionBtn = warningWindow.find('#abolitionBtn')
        const continueBtn = warningWindow.find('#continueBtn')

        abolitionBtn.click(() => {
            warningWindow.fadeOut(500, () => {
                warningWindow.remove()
                cardWindow.fadeIn(200)
            })
        })

        continueBtn.click(() => {
            warningWindow.fadeOut(500, () => {
                $(warningWindow, cardWindow).remove()
                addBlock.css({'display': 'none'})
                addBlock.empty()
            })
        })
    }
}