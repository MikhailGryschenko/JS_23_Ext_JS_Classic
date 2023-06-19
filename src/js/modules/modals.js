const modals = () => {
    let btnPressed = false;                                     // Или просто let btnPressed; что одно и тоже.
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {   // 4 аргумент для удаления подарка после клика на него
        const trigger = document.querySelectorAll(triggerSelector),     // ALL так как несколько триггеров будет (псевдомассив)
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),        // Получаем все модальные окна по дата-атрибутам
            scroll = calcScroll();

        trigger.forEach(item => {                           // этот метод только к массиву можно
            item.addEventListener('click', (e) => {         // и на каждый триггер - обработчик событий
                if (e.target) {                             // обязательно отменяем стандартное поведение браузера
                    e.preventDefault();
                }

                btnPressed = true;                      // если кликнули хотя бы на одну кнопку на странице
                
                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";              // Показываем модальное окно
                document.body.style.overflow = "hidden";    // отключаем прокрутку экрана под модальным окном
                document.body.style.marginRight = `${scroll}px`;    // убираем дёрганье экрана из-за удаления скролла
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {                       // когда мы кликаем на "крестик" - закрываются все модальные окна
                item.style.display = 'none';
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;    //убираем отступ, который добавляли вместо скролла
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {                   // когда мы кликаем на подложку - закрываются все модальные окна
                    item.style.display = 'none';
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;    //убираем отступ, который добавляли вместо скролла
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let isAnyModalShown = false;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    isAnyModalShown = true;
                }
            });
    
            if (!isAnyModalShown) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;    // убираем дёрганье экрана из-за удаления скролла
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // для разных режимов совместимости со старыми браузерами
            if(!btnPressed && (window.scrollY + document.documentElement.clientHeight >= scrollHeight)) {    // Если НЕ была нажата ни одна кнопла и если долистал страничку до конца
                document.querySelector(selector).click();           // Имитация клика по элементу, ручной вызов.
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    /* showModalByTime('.popup-consultation', 5000); */
};

export default modals;