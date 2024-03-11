  
async function pesquisarUsername() {
    const username = document.getElementById('username').value;
    
    try {
        const response = await fetch('/get-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        console.log(response)
        if (response.ok) {
            const user = await response.json();
            console.log(user);
        } else {
            console.error('Usuario nao encontrado');
        }
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
    }
}