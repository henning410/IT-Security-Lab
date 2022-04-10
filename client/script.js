let user;

window.addEventListener('load', async function () {
    const div = document.querySelector('.usernamePlace');
    if (getCookie('username') === '') {
        window.location.href = 'login.html';
    }
    div.innerHTML = getCookie('username');
    await getUser();
    await loadAllTodos();
})

//Method to get current user object from backend using cookie data
async function getUser() {
    const response1 = await fetch('http://localhost:3000/person/getByName?username=' + getCookie('username'));
    user = await response1.json();
}

//Method to load all todos from backend for specific user
async function loadAllTodos() {
    const response = await fetch('http://localhost:3000/todo?id=' + user.id);
    const todos = await response.json();
    const div = document.querySelector('.content');
    div.innerHTML = '';
    todos.forEach(todo => {
        const name = document.createElement('h4');
        name.innerHTML = todo.text;
        div.appendChild(createTodoCard(todo));
    })
}

async function deleteTodo(todo) {
    await fetch('http://localhost:3000/todo?id=' + todo.id, {
        method: 'DELETE',
    });
    location.reload();
}

//Method to update state of current todo (Done/Not Done)
async function updateState(todo) {
    await fetch('http://localhost:3000/todo?id=' + todo.id + '&state=' + todo.done, {
        method: 'PUT',
    });
}

async function saveTodo() {
    const category =  document.getElementById('category').value;
    const description =  document.getElementById('description').value;
    const dueDate =  document.getElementById('dueDate').value;
    const todo = {
        "personId": user.id,
        "category": category,
        "text": description,
        "dueDate": dueDate,
    }
    console.log('Neue Notiz: ', todo);
    await fetch('http://localhost:3000/todo/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
    });
    location.reload();
}

//Method to create frontend card for todo
let createTodoCard = (todo) => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.style.display = "flex";
    cardHeader.style.justifyContent = 'space-between';

    cardHeader.innerText = todo.category;
    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa fa-trash-o';
    deleteIcon.ariaHidden = 'true';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.setAttribute('data-toggle', 'tooltip');
    deleteIcon.setAttribute('data-placement', 'top');
    deleteIcon.setAttribute('title', 'Delete');
    cardHeader.appendChild(deleteIcon);
    deleteIcon.onclick = async () => {
        await deleteTodo(todo);
    }

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = todo.text;
    title.className = 'card-title';

    let button = document.createElement('button');
    button.type = 'button';
    if (todo.done) {
        button.className = 'btn btn-outline-success';
        button.innerText = 'Erledigt';
    } else {
        button.className = 'btn btn-outline-danger';
        button.innerText = 'Nicht erledigt';
    }
    button.onclick = async () => {
        if (!todo.done) {
            button.className = 'btn btn-outline-success';
            button.innerText = 'Erledigt';
        } else {
            button.className = 'btn btn-outline-danger';
            button.innerText = 'Nicht erledigt';
        }
        await updateState(todo);
    }

    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-muted';
    let clockIcon = document.createElement('i');
    clockIcon.className = 'fa fa-clock-o';
    clockIcon.ariaHidden = 'true';
    cardFooter.appendChild(clockIcon);
    let footerText = document.createElement('a');
    footerText.innerText = ' ' + todo.dueDate;
    clockIcon.appendChild(footerText);

    cardBody.appendChild(title);
    cardBody.append(button);
    card.appendChild(cardHeader)
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    return card;
}

//Method to search todos by category for specific user
async function submit() {
    const value = document.querySelector('.inputCategory').value;
    if (value!=='') {
        const response = await fetch('http://localhost:3000/todo/category?userId=' + user.id + '&category=' + value, {
            method: 'GET',
        });
        const todos = await response.json();
        const div = document.querySelector('.content');
        div.innerHTML = "";
        if (todos.length > 0){
            todos.forEach(todo => {
                div.appendChild(createTodoCard(todo));
            })
        }
        const searchTerm = document.querySelector('#searchTerm');
        searchTerm.innerHTML = 'Searchterm: ' + value;
    } else {
        await loadAllTodos();
        const searchTerm = document.querySelector('#searchTerm');
        searchTerm.innerHTML = '';
    }
}

function logout() {
    document.cookie = '';
    window.location.href = "login.html";
}

//Method extract data from cookie
//This method is from https://www.w3schools.com/js/js_cookies.asp
function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}