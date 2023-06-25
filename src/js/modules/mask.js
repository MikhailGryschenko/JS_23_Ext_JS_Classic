const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {                   // проверяем есть ли такой метод (старые браузеры не поддерживают)
            elem.setSelectionRange(pos, pos);           // применяем его, если начало и конец выделения совпадают, то это будет просто курсор
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),            // заменяем все НЕ цифры на пустую строку
            val = this.value.replace(/\D/g, '');        // то, что вводит пользователь
        
        if (def.length >= val.length) {              // чтобы не удалили +7
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {     // заменяем каждый символ на значение, которое вернёт колбэк функция для каждого символа
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition (this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        input.addEventListener('keypress', createMask);
    });
};

export default mask;