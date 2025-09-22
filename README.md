# Sistema Journey 100k - Soluzione Giusta

Sistema completo de gestão empresarial desenvolvido para a Soluzione Giusta, com foco na jornada de crescimento até 100k de faturamento mensal.

## 📋 Módulos do Sistema

### 🏠 **Dashboard Principal**
- Visão geral de métricas e KPIs
- Gráficos de faturamento e performance
- Atividades recentes e contas urgentes
- Cards de estatísticas em tempo real

### 👥 **Gestão de Funcionários**
- Cadastro e gerenciamento de colaboradores
- Controle de cargos e departamentos
- Histórico de atividades
- Sistema de avaliações

### 📊 **Gestão de Projetos**
- Criação e acompanhamento de projetos
- Kanban board para tarefas
- Timeline e marcos importantes
- Relatórios de progresso

### 💰 **Módulo Financeiro**
- Controle de receitas e despesas
- Fluxo de caixa
- Contas a pagar e receber
- Relatórios financeiros

### 💬 **Chat/Comunicação**
- Sistema de mensagens internas
- Notificações em tempo real
- Histórico de conversas
- Integração com WhatsApp

### ⏰ **Ponto Digital**
- Registro de entrada e saída
- Controle de horas trabalhadas
- Relatórios de frequência
- Justificativas de ausências

### 📄 **Documentos**
- Armazenamento de arquivos
- Controle de versões
- Compartilhamento seguro
- Categorização por projetos

### 📈 **Relatórios**
- Dashboards personalizados
- Exportação em múltiplos formatos
- Agendamento de relatórios
- Análises avançadas

### 🏆 **Gamificação**
- Sistema de pontuação
- Rankings e conquistas
- Metas e desafios
- Recompensas e incentivos

### ⚙️ **Configurações**
- Configurações do sistema
- Gestão de usuários e permissões
- Integrações com APIs externas
- Backup e segurança

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js / Python Flask
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Deploy**: Vercel / Netlify
- **Versionamento**: Git/GitHub

## 📦 Estrutura do Projeto

```
SISTEMA-PEDRO/
├── frontend/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── projects/
│   │   ├── financial/
│   │   ├── chat/
│   │   ├── ponto/
│   │   ├── documents/
│   │   ├── reports/
│   │   ├── gamification/
│   │   └── settings/
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── components/
├── backend/
│   ├── api/
│   ├── models/
│   ├── controllers/
│   └── middleware/
├── database/
│   ├── migrations/
│   └── seeds/
└── docs/
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Git
- Conta no Supabase
- Conta no GitHub

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/pedrofraquete/SISTEMA-PEDRO.git
cd SISTEMA-PEDRO
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure o banco de dados**
```bash
npm run db:migrate
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

## 🌐 Deploy

O sistema está configurado para deploy automático via GitHub Actions:

- **Frontend**: Vercel
- **Backend**: Railway/Heroku
- **Banco**: Supabase

## 📱 Funcionalidades Principais

### ✅ **Implementadas**
- [x] Interface de Login
- [x] Dashboard Principal
- [x] Navegação entre módulos
- [x] Design responsivo
- [x] Gráficos e métricas

### 🔄 **Em Desenvolvimento**
- [ ] Autenticação com Supabase
- [ ] CRUD completo dos módulos
- [ ] Integração com APIs externas
- [ ] Sistema de notificações
- [ ] Chat em tempo real

### 🎯 **Planejadas**
- [ ] App mobile (React Native)
- [ ] Inteligência artificial
- [ ] Relatórios avançados
- [ ] Integração com ERP
- [ ] API pública

## 👨‍💻 Equipe de Desenvolvimento

- **Pedro Fraquete** - CEO & Founder
- **Soluzione Giusta** - Empresa

## 📄 Licença

Este projeto é propriedade da Soluzione Giusta. Todos os direitos reservados.

## 📞 Contato

Para dúvidas ou suporte:
- Email: contato@soluzionegiusta.com
- Website: https://soluzionegiusta.com
- LinkedIn: [Pedro Fraquete](https://linkedin.com/in/pedrofraquete)

---

**Journey 100k** - Transformando ideias em resultados! 🚀
