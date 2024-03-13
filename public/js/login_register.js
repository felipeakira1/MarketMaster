  


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

async function createHash(password) {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(`Hash da senha: ${hash}`);
        return hash;
    } catch(err) {
        console.error('Erro ao gerar hash da senha:', erro);
    }
}

async function registerUser() {
    const password = document.getElementById('password').value;

    const response = await fetch('/user/hash-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Hash da senha:', data.hashedPassword);
        // Você pode fazer algo com o hash da senha aqui
    } else {
        console.error('Erro ao gerar o hash da senha');
    }
}