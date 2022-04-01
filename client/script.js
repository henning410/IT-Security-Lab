let user;
window.addEventListener('load', async function () {
    console.log('username from cookie: ', getCookie('username'));
    const div = document.querySelector('.usernamePlace');
    div.innerHTML = getCookie('username');
    await getUser();
    await loadAllNotes();
})

//Method to get current user object from backend using cookie data
async function getUser() {
    const response1 = await fetch('http://localhost:3000/user/getByName?username=' + getCookie('username'));
    user = await response1.json();
    console.log('User from backend: ', user);
}

//Method to load all notes from backend for specific user
async function loadAllNotes() {
    const response = await fetch('http://localhost:3000/note?id=' + user.id);
    const notes = await response.json();
    const div = document.querySelector('.content');
    div.innerHTML = '';
    notes.forEach(note => {
        const name = document.createElement('h4');
        name.innerHTML = note.note;
        div.appendChild(createNoteCard(note));
    })
}

async function deleteNote(note) {
    await fetch('http://localhost:3000/note?id=' + note.id, {
        method: 'DELETE',
    });
    location.reload();
}

//Method to update state of current note (Done/Not Done)
async function updateState(note) {
    await fetch('http://localhost:3000/note?id=' + note.id + '&state=' + note.done, {
        method: 'PUT',
    });
}

async function saveNote() {
    const category =  document.getElementById('category').value;
    const description =  document.getElementById('description').value;
    const dueDate =  document.getElementById('dueDate').value;
    const note = {
        "personId": user.id,
        "category": category,
        "note": description,
        "dueDate": dueDate,
    }
    console.log('Neue Notiz: ', note);
    await fetch('http://localhost:3000/note/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note),
    });
    location.reload();
}

//Method to create frontend card for note
let createNoteCard = (note) => {
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
    deleteIocn.onclick = async () => {
        await deleteNote(note);
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
    button.onclick = async () => {
        if (!note.done) {
            button.className = 'btn btn-outline-success';
            button.innerText = 'Erledigt';
        } else {
            button.className = 'btn btn-outline-danger';
            button.innerText = 'Nicht erledigt';
        }
        await updateState(note);
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

//Method to search notes by category for specific user
async function submit() {
    const value = document.querySelector('.inputCategory').value;
    if (value!=='') {
        const response = await fetch('http://localhost:3000/note/category?userId=' + user.id + '&category=' + value, {
            method: 'GET',
        });
        const note = await response.json();
        const div = document.querySelector('.content');
        div.innerHTML = "";

        note.forEach(note => {
            div.appendChild(createNoteCard(note));
        })
    } else {
        await loadAllNotes();
    }
}

//Method extract data from cookie
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