async function createUser() {
    const password =  document.getElementById('password').value;
    const username =  document.getElementById('username').value;
    const repeatPassword = document.getElementById('passwordRepeat').value;
    const user = {
        "username": username,
        "email": 'test@test.com',
        "password": password,
    }
    if (repeatPassword !== password) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.role = 'alert';
        alert.innerText = 'Passwords must be equal'
        const div = document.querySelector('.login');
        insertAfter(alert, div);
    } else {
        await fetch('http://localhost:3000/person', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        window.location.href = "login.html";
    }
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
