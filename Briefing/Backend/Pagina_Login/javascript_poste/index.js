const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',  // Substitua 'seu_usuario' pelo nome de usuário correto
    host: 'localhost',
    database: 'projeto_briefing',  // Substitua 'seu_banco_de_dados' pelo nome do seu banco de dados
    password: '316710',  // Substitua 'sua_senha' pela senha correta
    port: 3542,  // Substitua se a porta for diferente
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch(err => console.error('Erro ao conectar ao banco de dados PostgreSQL', err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para cadastro
app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    console.log('Dados recebidos para cadastro:', req.body);
    try {
        const query = 'INSERT INTO usuarios (nome, email, senha, tipo_usuario_id) VALUES ($1, $2, $3, $4)';
        const values = [nome, email, senha, tipo];
        await client.query(query, values);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log('Dados recebidos para login:', req.body);
    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
        const values = [email, senha];
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login realizado com sucesso' });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
