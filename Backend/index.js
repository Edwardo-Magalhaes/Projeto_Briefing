const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projeto_briefing',
    password: '316710',
    port: 5432,
});

// Middleware para parsing de JSON no corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
    secret: 'chave-secreta-aqui',
    resave: false,
    saveUninitialized: true
}));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'first_page.html'));
});

// Endpoint para a página first_page
app.get('/first_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_page.html'));
});

// Endpoint para cadastrar usuário
app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    try {
        const query = `
            INSERT INTO usuarios (nome, email, senha, tipo_usuario_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, tipo_usuario_id;
        `;
        const values = [nome, email, senha, tipo];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
});

// Endpoint para fazer login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = `
            SELECT id, nome, email, tipo_usuario_id
            FROM usuarios
            WHERE email = $1 AND senha = $2;
        `;
        const values = [email, senha];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            // Salvando dados do usuário na sessão
            req.session.userId = result.rows[0].id;
            // Redirecionando para a página inicial após login
            res.redirect('/'); // Redireciona para a página inicial
        } else {
            // Caso as credenciais sejam inválidas
            res.status(401).json({ error: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
