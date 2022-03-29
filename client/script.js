window.addEventListener('load', function () {
    console.log(document.cookie)
    console.log('username from cookie: ', getCookie('username'));
    const div = document.querySelector('.usernamePlace');
    div.innerHTML = getCookie('username');
    loadAllNotes();
})

async function loadAllNotes() {
    const response1 = await fetch('http://localhost:3000/user/getByName?username=' + getCookie('username'));
    const user = await response1.json();
    console.log('USER: ', user);

    const response = await fetch('http://localhost:3000/note?id=' + user.id);
    const notes = await response.json();
    const div = document.querySelector('.content');
    notes.forEach(note => {
        const name = document.createElement('h4');
        name.innerHTML = note.note;
        div.appendChild(createTaskCard(note));
    })
}

let createTaskCard = (note) => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerText = note.category;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = note.note;
    title.className = 'card-title';

    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-danger';
    button.innerText = 'Nicht erledigt';

    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer text-muted';
    let clockIcon = document.createElement('i');
    clockIcon.className = 'fa fa-clock-o';
    clockIcon.ariaHidden = 'true';
    cardFooter.appendChild(clockIcon);
    let footerText = document.createElement('a');
    footerText.innerText = ' ' + note.dueDate;
    clockIcon.appendChild(footerText);

    cardBody.appendChild(title);
    cardBody.append(button);
    card.appendChild(cardHeader)
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    return card;
}

async function submit() {
    const value = document.querySelector('.inputID').value;
    const response = await fetch('http://localhost:3000/user?id=' + value, {
        method: 'GET',
    });
    const user = await response.json();
    const div = document.querySelector('.container1');
    div.innerHTML = "";

    user.forEach(user => {
        const name = document.createElement('h2');
        name.innerHTML = user.username
        //const name = newEl('h2', {innerText: user.name});
        div.appendChild(name);
    })
}

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