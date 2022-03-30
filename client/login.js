async function authenticate() {
    const password =  document.getElementById('password').value;
    const username =  document.getElementById('username').value;
    document.cookie = "username=" + username +  ";path=/";
    const response = await fetch('http://localhost:3000/user/login?username=' + username + '&password=' + password);
    const status = await response.json();
    if (status) {
        window.location.href = "mainpage.html";
    } else {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.role = 'alert';
        alert.innerText = 'Username or password wrong'

        const div = document.querySelector('.login');
        insertAfter(alert, div);
    }
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
