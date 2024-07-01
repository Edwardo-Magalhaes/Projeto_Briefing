const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
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

// Endpoint para a página de login
app.get('/login_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_page.html'));
});

// Endpoint para a página de busca (search_page)
app.get('/search_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search_page.html'));
});

// Endpoint para cadastrar usuário
app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    try {
        // Gerar hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        const query = `
            INSERT INTO usuarios (nome, email, senha, tipo_usuario_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, tipo_usuario_id;
        `;
        const values = [nome, email, hashedPassword, tipo];

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
            SELECT id, nome, email, senha, tipo_usuario_id
            FROM usuarios
            WHERE email = $1;
        `;
        const values = [email];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            const isPasswordValid = await bcrypt.compare(senha, user.senha);

            if (isPasswordValid) {
                req.session.userId = user.id;
                res.status(200).json({ message: 'Login realizado com sucesso!' });
            } else {
                res.status(401).json({ error: 'Credenciais inválidas.' });
            }
        } else {
            res.status(401).json({ error: 'Credenciais inválidas.' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

// Endpoint para enviar solicitação de projeto
app.post('/enviar-solicitacao', async (req, res) => {
    const { titulo, descricao, categoria, prazo_entrega, orcamento_estimado, nome_cliente, email_cliente, telefone_cliente } = req.body;

    if (!titulo || !descricao || !categoria || !prazo_entrega || !orcamento_estimado || !nome_cliente || !email_cliente) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const query = `
            INSERT INTO solicitacoes_projetos (titulo, descricao, categoria, prazo_entrega, orcamento_estimado, nome_cliente, email_cliente, telefone_cliente)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, titulo, descricao, categoria, prazo_entrega, orcamento_estimado, nome_cliente, email_cliente, telefone_cliente;
        `;
        const values = [titulo, descricao, categoria, prazo_entrega, orcamento_estimado, nome_cliente, email_cliente, telefone_cliente];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao enviar solicitação de projeto:', error);
        res.status(500).json({ error: 'Erro ao enviar solicitação de projeto.' });
    }
});
// Endpoint para buscar projetos
app.get('/solicitacoes_projetos', async (req, res) => {
    try {
        const query = `
            SELECT id, titulo, descricao, categoria, prazo_entrega, orcamento_estimado, nome_cliente, email_cliente, telefone_cliente
            FROM solicitacoes_projetos;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ error: 'Erro ao buscar projetos.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
