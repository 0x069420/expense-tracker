function getData() {
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return { name, password };
}

 function registerUser(){    
    const userData = getData();
    console.log('User data:', userData.name, userData.password);
    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });               
}