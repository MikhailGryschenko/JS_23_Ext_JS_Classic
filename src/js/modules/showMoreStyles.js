import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper/* styles */) => {

    const btn = document.querySelector(trigger);
/*     const cards = document.querySelectorAll(styles),
          btn = document.querySelector(trigger); */

/*     cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        // btn.style.display = 'none';
        btn.remove();
    }); */
    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')         // или можно просто указать путь к базе данных (а не на сервер): 'assets/db.json'
            .then(res => createCards(res))                  // и обращаться тогда надо к (res.styles)
            .catch(Error => errorMessage(Error));
        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    };

    function errorMessage(error) {
        let mess = document.createElement('div');
        mess.classList.add('animated', 'fadeInUp', 'status');
        mess.textContent = `${error}`;
        document.querySelector(wrapper).appendChild(mess);
    };
};

export default showMoreStyles;