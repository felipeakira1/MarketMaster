async function pesquisarUsername() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const result = document.getElementById('result');

    try {
        // Resposne
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        console.log(response);
        switch(response.status) {
            case 200:
                result.style.color = '#00FF00';
                result.innerText = "Login efetuado com sucesso!";
                break;
            case 401:
                result.style.color = '#ff0000';
                result.innerText = "Senha incorreta";
                break;
            case 404:
                result.style.color = '#ff0000';
                result.innerText = "Usuário não encontrado";
                break;
            case 500:
                result.style.color = '#ff0000';
                result.innerText = "Erro ao buscar usuário";
                break;
        }
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
    }
}

async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if(password === confirmPassword) {
        try {
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, username, password })
            });

            const responseData = await response.json();
            console.log(responseData.message);

        } catch(err) {
            console.error('Erro: ', err);
        }

    } else {
        const passwordResult = document.getElementById('passwordResult');
        passwordResult.innerText = 'Passwords are different'
    }
}