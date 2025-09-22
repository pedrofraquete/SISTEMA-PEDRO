# 🚀 Guia de Desenvolvimento - Sistema Journey 100k

## 📋 Visão Geral

Este documento contém todas as informações necessárias para desenvolver e executar o Sistema Journey 100k localmente.

## 🛠️ Pré-requisitos

- **Node.js** 18+ instalado
- **Git** para controle de versão
- **Conta no Supabase** (opcional para desenvolvimento)
- **Editor de código** (VS Code recomendado)

## 🚀 Instalação e Execução

### 1. **Clone o Repositório**
```bash
git clone https://github.com/pedrofraquete/SISTEMA-PEDRO.git
cd SISTEMA-PEDRO
```

### 2. **Instale as Dependências**
```bash
npm install
```

### 3. **Configure as Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
nano .env
```

### 4. **Inicie o Servidor de Desenvolvimento**
```bash
npm start
# ou
npm run dev
```

### 5. **Acesse o Sistema**
- **URL**: http://localhost:3000
- **Login**: admin
- **Senha**: admin

## 📁 Estrutura do Projeto

```
SISTEMA-PEDRO/
├── frontend/                 # Frontend da aplicação
│   ├── index.html           # Página inicial
│   ├── pages/               # Páginas do sistema
│   │   ├── login.html       # Página de login
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── employees/       # Gestão de funcionários
│   │   ├── projects/        # Gestão de projetos
│   │   ├── financial/       # Módulo financeiro
│   │   ├── chat/           # Chat interno
│   │   ├── ponto/          # Ponto digital
│   │   ├── documents/      # Documentos
│   │   ├── reports/        # Relatórios
│   │   ├── gamification/   # Gamificação
│   │   └── settings/       # Configurações
│   ├── assets/             # Recursos estáticos
│   │   ├── css/           # Estilos CSS
│   │   ├── js/            # Scripts JavaScript
│   │   └── images/        # Imagens
│   └── components/         # Componentes reutilizáveis
│       ├── sidebar.html   # Barra lateral
│       └── header.html    # Cabeçalho
├── backend/                # Backend da aplicação (futuro)
├── database/               # Scripts do banco de dados
│   ├── supabase_schema_completo.sql
│   ├── validacao_schema.sql
│   └── README.md
├── docs/                   # Documentação
├── server.js              # Servidor de desenvolvimento
├── package.json           # Dependências do projeto
└── README.md              # Documentação principal
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start
npm run dev

# Executar testes (futuro)
npm test

# Build para produção (futuro)
npm run build

# Linting e formatação
npm run lint
npm run format
```

## 🌐 Rotas da Aplicação

### **Páginas Principais**
- `/` - Página inicial
- `/login` - Login/Autenticação
- `/dashboard` - Dashboard principal
- `/employees` - Gestão de funcionários
- `/projects` - Gestão de projetos
- `/financial` - Módulo financeiro
- `/chat` - Chat interno
- `/ponto` - Ponto digital
- `/documents` - Documentos
- `/reports` - Relatórios
- `/gamification` - Gamificação
- `/settings` - Configurações

### **APIs de Desenvolvimento**
- `POST /api/auth/login` - Autenticação
- `POST /api/auth/logout` - Logout
- `GET /api/dashboard/metrics` - Métricas do dashboard
- `GET /api/projects` - Lista de projetos
- `GET /api/employees` - Lista de funcionários
- `GET /api/financial/transactions` - Transações financeiras

## 🔐 Autenticação

### **Modo de Desenvolvimento**
O sistema funciona com dados mockados para desenvolvimento:

- **Email**: admin
- **Senha**: admin

### **Integração com Supabase**
Para usar o Supabase real:

1. **Configure as variáveis no .env**:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
```

2. **Execute o schema do banco**:
```sql
-- No SQL Editor do Supabase
-- Execute: database/supabase_schema_completo.sql
```

3. **Valide a instalação**:
```sql
-- Execute: database/validacao_schema.sql
```

## 🎨 Desenvolvimento Frontend

### **Tecnologias Utilizadas**
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilos e animações
- **JavaScript (Vanilla)** - Funcionalidades
- **Font Awesome** - Ícones
- **Chart.js** - Gráficos

### **Sistema de Componentes**
- **Sidebar**: Navegação principal (`components/sidebar.html`)
- **Header**: Cabeçalho com busca (`components/header.html`)
- **Router**: Sistema de roteamento (`assets/js/router.js`)
- **Supabase**: Integração com banco (`assets/js/supabase-config.js`)

### **Padrões de Código**
- Use **camelCase** para JavaScript
- Use **kebab-case** para CSS
- Use **PascalCase** para classes
- Comente código complexo
- Mantenha funções pequenas e focadas

## 🗄️ Banco de Dados

### **Estrutura Principal**
- **profiles** - Perfis de usuários
- **projects** - Projetos da empresa
- **tasks** - Tarefas dos projetos
- **financial_transactions** - Transações financeiras
- **time_entries** - Registros de ponto
- **messages** - Chat interno
- **documents** - Arquivos e documentos

### **Configuração do Supabase**
1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o schema: `database/supabase_schema_completo.sql`
3. Configure as variáveis de ambiente
4. Teste a conexão

## 🧪 Testes

### **Testes Manuais**
1. **Login**: Teste com admin/admin
2. **Navegação**: Teste todos os módulos
3. **Responsividade**: Teste em mobile/tablet
4. **Funcionalidades**: Teste CRUD básico

### **Testes Automatizados** (Futuro)
- Unit tests com Jest
- Integration tests
- E2E tests com Cypress

## 📱 Responsividade

O sistema é **mobile-first** e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### **Breakpoints CSS**
```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) { }

/* Desktop */
@media (min-width: 1200px) { }
```

## 🚀 Deploy

### **Desenvolvimento Local**
```bash
npm start
# Acesse: http://localhost:3000
```

### **Deploy em Produção**
1. **Vercel** (Recomendado para frontend)
2. **Netlify** (Alternativa)
3. **Railway** (Para backend Node.js)
4. **Supabase** (Banco de dados)

### **Variáveis de Produção**
```env
NODE_ENV=production
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-producao
```

## 🔍 Debug e Troubleshooting

### **Problemas Comuns**

**1. Servidor não inicia**
```bash
# Verifique se a porta está livre
lsof -i :3000

# Mate processos se necessário
kill -9 PID
```

**2. Erro de dependências**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

**3. Erro de Supabase**
- Verifique as credenciais no .env
- Confirme se o schema foi aplicado
- Teste a conexão no painel do Supabase

### **Logs de Debug**
```javascript
// Ativar logs detalhados
localStorage.setItem('debug', 'true');

// Ver logs no console
console.log('Debug info:', data);
```

## 📚 Recursos Úteis

### **Documentação**
- [Supabase Docs](https://supabase.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/)
- [Font Awesome Icons](https://fontawesome.com/icons)

### **Ferramentas**
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - Testar APIs
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## 🤝 Contribuição

### **Fluxo de Desenvolvimento**
1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Faça suas alterações
3. Teste localmente
4. Commit: `git commit -m "feat: adiciona nova funcionalidade"`
5. Push: `git push origin feature/nova-funcionalidade`
6. Abra um Pull Request

### **Padrões de Commit**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes

## 📞 Suporte

Para dúvidas ou problemas:
- **Email**: pedro@soluzionegiusta.com
- **GitHub Issues**: [Criar issue](https://github.com/pedrofraquete/SISTEMA-PEDRO/issues)
- **Documentação**: Consulte este arquivo

---

**Sistema Journey 100k** - Desenvolvido com ❤️ pela Soluzione Giusta
