// =================================================================
// SISTEMA JOURNEY 100K - SERVIDOR DE DESENVOLVIMENTO
// =================================================================
// Servidor Node.js simples para servir os arquivos estáticos
// e fornecer APIs básicas para desenvolvimento
// =================================================================

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// =================================================================
// MIDDLEWARES
// =================================================================

// CORS para desenvolvimento
app.use(cors());

// Parse JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));

// Logs de requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// =================================================================
// ROTAS DA API (MOCK)
// =================================================================

// Rota de autenticação mock
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Credenciais de demonstração
    if (email === 'admin' && password === 'admin') {
        const user = {
            id: 'mock-user-id',
            email: 'admin@soluzionegiusta.com',
            full_name: 'Pedro Fraquete',
            role: 'super_admin',
            department: 'Administração',
            position: 'CEO',
            avatar: 'PF'
        };
        
        const token = 'mock-jwt-token-' + Date.now();
        
        res.json({
            success: true,
            user,
            token,
            message: 'Login realizado com sucesso'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Credenciais inválidas'
        });
    }
});

// Rota de logout mock
app.post('/api/auth/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout realizado com sucesso'
    });
});

// Rota para buscar dados do dashboard
app.get('/api/dashboard/metrics', (req, res) => {
    const metrics = {
        revenue: {
            total: 2800000,
            monthly: 380000,
            growth: 18.2
        },
        projects: {
            active: 47,
            completed: 23,
            total: 70
        },
        employees: {
            active: 29,
            new_this_month: 3
        },
        tasks: {
            completed: 284,
            completion_rate: 94
        }
    };
    
    res.json(metrics);
});

// Rota para buscar projetos
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: '1',
            name: 'Sistema ERP',
            description: 'Desenvolvimento de sistema ERP completo',
            status: 'in_progress',
            progress: 75,
            budget: 150000,
            manager: 'João Marcos',
            start_date: '2025-08-01',
            end_date: '2025-12-31'
        },
        {
            id: '2',
            name: 'Website Institucional',
            description: 'Novo website da empresa',
            status: 'completed',
            progress: 100,
            budget: 25000,
            manager: 'Maria Silva',
            start_date: '2025-07-01',
            end_date: '2025-09-15'
        },
        {
            id: '3',
            name: 'App Mobile',
            description: 'Aplicativo mobile para clientes',
            status: 'planning',
            progress: 10,
            budget: 80000,
            manager: 'Carlos Santos',
            start_date: '2025-10-01',
            end_date: '2026-03-31'
        }
    ];
    
    res.json(projects);
});

// Rota para buscar funcionários
app.get('/api/employees', (req, res) => {
    const employees = [
        {
            id: '1',
            full_name: 'Pedro Fraquete',
            email: 'pedro@soluzionegiusta.com',
            role: 'super_admin',
            department: 'Administração',
            position: 'CEO',
            hire_date: '2020-01-01',
            salary: 25000,
            is_active: true
        },
        {
            id: '2',
            full_name: 'João Marcos',
            email: 'joao@soluzionegiusta.com',
            role: 'manager',
            department: 'Desenvolvimento',
            position: 'Tech Lead',
            hire_date: '2022-03-15',
            salary: 12000,
            is_active: true
        },
        {
            id: '3',
            full_name: 'Maria Silva',
            email: 'maria@soluzionegiusta.com',
            role: 'manager',
            department: 'Design',
            position: 'Design Lead',
            hire_date: '2022-06-01',
            salary: 10000,
            is_active: true
        }
    ];
    
    res.json(employees);
});

// Rota para buscar transações financeiras
app.get('/api/financial/transactions', (req, res) => {
    const transactions = [
        {
            id: '1',
            type: 'income',
            amount: 50000,
            description: 'Pagamento Cliente ABC',
            category: 'Vendas',
            status: 'paid',
            due_date: '2025-09-20',
            paid_date: '2025-09-20'
        },
        {
            id: '2',
            type: 'expense',
            amount: 25750,
            description: 'Pagamento Fornecedor XYZ',
            category: 'Fornecedores',
            status: 'pending',
            due_date: '2025-09-22'
        },
        {
            id: '3',
            type: 'expense',
            amount: 187320,
            description: 'Salários do mês',
            category: 'Salários',
            status: 'pending',
            due_date: '2025-09-23'
        }
    ];
    
    res.json(transactions);
});

// =================================================================
// ROTAS DE PÁGINAS
// =================================================================

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Rota para login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'login.html'));
});

// Rota para dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'dashboard', 'index.html'));
});

// Rotas para outros módulos
const modules = ['employees', 'projects', 'financial', 'chat', 'ponto', 'documents', 'reports', 'gamification', 'settings'];

modules.forEach(module => {
    app.get(`/${module}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'pages', module, 'index.html'));
    });
});

// Catch-all para SPA routing
app.get('*', (req, res) => {
    // Se for uma requisição de API, retornar 404
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ error: 'Endpoint não encontrado' });
    }
    
    // Para outras rotas, servir a página inicial (SPA)
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// =================================================================
// TRATAMENTO DE ERROS
// =================================================================

app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// =================================================================
// INICIALIZAÇÃO DO SERVIDOR
// =================================================================

app.listen(PORT, () => {
    console.log('🚀 Sistema Journey 100k iniciado!');
    console.log(`📡 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${path.join(__dirname, 'frontend')}`);
    console.log('');
    console.log('📋 Rotas disponíveis:');
    console.log('   GET  /                    - Página inicial');
    console.log('   GET  /login               - Página de login');
    console.log('   GET  /dashboard           - Dashboard principal');
    console.log('   POST /api/auth/login      - API de login');
    console.log('   GET  /api/dashboard/metrics - Métricas do dashboard');
    console.log('   GET  /api/projects        - Lista de projetos');
    console.log('   GET  /api/employees       - Lista de funcionários');
    console.log('   GET  /api/financial/transactions - Transações financeiras');
    console.log('');
    console.log('🔑 Credenciais de teste:');
    console.log('   Email: admin');
    console.log('   Senha: admin');
    console.log('');
    console.log('⚡ Para parar o servidor: Ctrl + C');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Servidor sendo encerrado...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Servidor sendo encerrado...');
    process.exit(0);
});
