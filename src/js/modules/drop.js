import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();        // Остановим всплытие
    }

    function highlight (item) {
        item.closest('.file_upload').style.border = "5px solid yellow"; //closest возвращает ближайший родительский элемент (или сам элемент), который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight (item) {
        item.closest('.file_upload').style.border = "none";
        if(item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;                                   // эта перем-я либо будет содержать троеточие, либо ничего не будет содержать
            // 'dhgfjdhsgfjdsgfjdfj.jpg' => ['jhgfhjgjhgjhhjgj', 'jog']
            const arr = input.files[0].name.split('.');
            arr[0].length > 5 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 5) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if (input.closest('main')) {
                const formData = new FormData();
                formData.append('file', input.files[0]);
                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                    });
            };
        });
    });
};

export default drop;