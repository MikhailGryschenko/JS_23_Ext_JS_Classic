const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          //btnAll = menu.querySelector('.all'),
          //btnLovers = menu.querySelector('.lovers'),
          //btnChef = menu.querySelector('.chef'),
          //btnGirl = menu.querySelector('.girl'),
          //btnGuy = menu.querySelector('.guy'),
          //btnGrandmother = menu.querySelector('.grandmother'),
          //btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          //markGirl = wrapper.querySelectorAll('.girl'),
          //markLovers = wrapper.querySelectorAll('.lovers'),
          //markGuy = wrapper.querySelectorAll('.guy'),
          //markChef = wrapper.querySelectorAll('.chef'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if(markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } 
        if (markType.length == 0) {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

/*     btnAll.addEventListener('click', () => {
        typeFilter(markAll);
    });

    btnLovers.addEventListener('click', () => {
        typeFilter(markLovers);
    });

    btnChef.addEventListener('click', () => {
        typeFilter(markChef);
    });

    btnGirl.addEventListener('click', () => {
        typeFilter(markGirl);
    });

    btnGuy.addEventListener('click', () => {
        typeFilter(markGuy);
    });

    btnGrandmother.addEventListener('click', () => {
        typeFilter();
    });

    btnGranddad.addEventListener('click', () => {
        typeFilter();
    }); */

    menu.addEventListener('click', (e) => {
        let target = e.target;
        let classSelect = e.target.classList[0];
        let allElems = wrapper.querySelectorAll(`.${classSelect}`);
        typeFilter(allElems);

        if(target && target.tagName == "LI") {              // если элемент поддерживает событие клика и является LI (list item)
            items.forEach(btn => btn.classList.remove('active'));   // убираем класс активности у всех кнопок
            target.classList.add('active');                         // добавляем класс активности кнопке, на которую кликнули
        }
    });
};


export default filter;