window.addEventListener('load', async function () {
    //delete cookie
    document.cookie = "username=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
})

async function authenticate() {
    const password =  document.getElementById('password').value;
    const username =  document.getElementById('username').value;
    const response = await fetch('http://localhost:3000/person/login?username=' + username + '&password=' + password);
    const user = await response.json();
    if (user.length===1) {
        document.cookie = "username=" + username +  ";path=/";
        window.location.href = "mainpage.html";
    } else {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.role = 'alert';
        alert.innerText = 'Username or Password wrong'
        const div = document.querySelector('.login');
        insertAfter(alert, div);
    }
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
