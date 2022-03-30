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

async function deleteNote(note) {
    console.log('DELETE: ', note.id);
    const response = await fetch('http://localhost:3000/note?id=' + note.id, {
        method: 'DELETE',
    });
    location.reload();
}

async function updateState(note) {
    const response = await fetch('http://localhost:3000/note?id=' + note.id + '&state=' + note.done, {
        method: 'PUT',
    });
    const notes = await response.json();
}

let createTaskCard = (note) => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.style.display = "flex";
    cardHeader.style.justifyContent = 'space-between';

    cardHeader.innerText = note.category;
    let deleteIocn = document.createElement('i');
    deleteIocn.className = 'fa fa-trash-o';
    deleteIocn.ariaHidden = 'true';
    deleteIocn.style.cursor = 'pointer';
    deleteIocn.setAttribute('data-toggle', 'tooltip');
    deleteIocn.setAttribute('data-placement', 'top');
    deleteIocn.setAttribute('title', 'Delete');
    cardHeader.appendChild(deleteIocn);
    deleteIocn.onclick = () => {
        deleteNote(note);
    }

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = note.note;
    title.className = 'card-title';

    let button = document.createElement('button');
    button.type = 'button';
    if (note.done) {
        button.className = 'btn btn-outline-success';
        button.innerText = 'Erledigt';
    } else {
        button.className = 'btn btn-outline-danger';
        button.innerText = 'Nicht erledigt';
    }
    button.onclick = () => {
        button.className = 'btn btn-outline-success';
        button.innerText = 'Erledigt';
        updateState(note);
    }

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