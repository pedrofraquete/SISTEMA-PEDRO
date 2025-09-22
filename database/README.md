# 🗄️ Banco de Dados - Sistema Journey 100k

## 📋 Visão Geral

O banco de dados do Sistema Journey 100k foi projetado para suportar todas as funcionalidades de um sistema completo de gestão empresarial, utilizando **PostgreSQL** através do **Supabase**.

## 🏗️ Arquitetura

### **Tecnologias Utilizadas**
- **PostgreSQL 15+** (via Supabase)
- **Row Level Security (RLS)** para segurança
- **Triggers** para auditoria automática
- **Views** para relatórios otimizados
- **Índices** para performance

## 📊 Estrutura das Tabelas

### 👥 **Módulo de Usuários**
- `profiles` - Perfis de usuários (estende auth.users)
- `companies` - Empresas e organizações
- `departments` - Departamentos da empresa

### 📋 **Módulo de Projetos**
- `projects` - Projetos da empresa
- `tasks` - Tarefas dos projetos

### 💰 **Módulo Financeiro**
- `financial_categories` - Categorias de receitas/despesas
- `financial_transactions` - Transações financeiras

### ⏰ **Módulo de Ponto Digital**
- `time_entries` - Registros de entrada/saída
- `absence_requests` - Solicitações de ausência

### 📄 **Módulo de Documentos**
- `documents` - Arquivos e documentos

### 💬 **Módulo de Chat**
- `conversations` - Conversas
- `conversation_participants` - Participantes
- `messages` - Mensagens

### 🏆 **Módulo de Gamificação**
- `achievements` - Conquistas disponíveis
- `user_scores` - Pontuações dos usuários
- `user_achievements` - Conquistas obtidas

### 📈 **Módulo de Relatórios**
- `reports` - Configurações de relatórios

### ⚙️ **Sistema**
- `system_settings` - Configurações do sistema
- `notifications` - Notificações
- `audit_logs` - Logs de auditoria

## 🚀 Como Aplicar o Schema

### **1. Acesse o Supabase**
1. Faça login em [supabase.com](https://supabase.com)
2. Selecione seu projeto
3. Vá para **SQL Editor**

### **2. Execute o Schema**
1. Abra o arquivo `supabase_schema_completo.sql`
2. Copie todo o conteúdo
3. Cole no SQL Editor do Supabase
4. Clique em **Run** para executar

### **3. Valide a Instalação**
1. Abra o arquivo `validacao_schema.sql`
2. Copie e execute no SQL Editor
3. Verifique se todos os componentes foram criados

## 🔐 Segurança (RLS)

O sistema utiliza **Row Level Security** para garantir que:

- ✅ Usuários só acessam seus próprios dados
- ✅ Projetos são visíveis apenas para participantes
- ✅ Dados financeiros têm acesso controlado
- ✅ Mensagens são privadas entre participantes

### **Políticas Implementadas**

```sql
-- Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

-- Usuários podem ver projetos onde participam
CREATE POLICY "Users can view assigned projects" ON projects 
FOR SELECT USING (
    auth.uid() = manager_id OR 
    auth.uid() = client_id OR
    EXISTS (SELECT 1 FROM tasks WHERE project_id = projects.id AND assigned_to = auth.uid())
);
```

## 📈 Performance

### **Índices Criados**
- `idx_profiles_email` - Busca por email
- `idx_projects_status` - Filtro por status
- `idx_tasks_assigned` - Tarefas por usuário
- `idx_financial_transactions_type` - Transações por tipo
- `idx_time_entries_user` - Ponto por usuário
- `idx_messages_conversation` - Mensagens por conversa

### **Views Otimizadas**
- `dashboard_metrics` - Métricas do dashboard
- `productivity_report` - Relatório de produtividade

## 🔄 Triggers Automáticos

### **Updated At**
Todas as tabelas principais têm trigger para atualizar `updated_at`:

```sql
CREATE TRIGGER update_profiles_updated_at 
BEFORE UPDATE ON profiles 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🎯 Funções Úteis

### **Calcular Horas Trabalhadas**
```sql
SELECT calculate_worked_hours(
    'user-uuid-here'::UUID, 
    '2025-09-01'::DATE, 
    '2025-09-30'::DATE
);
```

### **Atualizar Pontuação**
```sql
SELECT update_user_score('user-uuid-here'::UUID, 50);
```

## 📊 Dados Iniciais

O schema inclui dados iniciais para:

### **Categorias Financeiras**
- Vendas, Consultoria, Licenciamento (Receitas)
- Salários, Aluguel, Marketing, Tecnologia (Despesas)

### **Conquistas da Gamificação**
- Primeiro Login (10 pontos)
- Primeira Tarefa (25 pontos)
- Projeto Concluído (100 pontos)
- Pontualidade (50 pontos)
- Colaborador do Mês (200 pontos)
- Meta Batida (150 pontos)

### **Configurações do Sistema**
- Nome da empresa: "Soluzione Giusta"
- Sistema: "Journey 100k"
- Fuso horário: "America/Sao_Paulo"
- Moeda: "BRL"

## 🔧 Manutenção

### **Backup Automático**
O Supabase faz backup automático, mas recomenda-se:
- Backup manual antes de grandes alterações
- Exportação periódica dos dados críticos

### **Monitoramento**
- Acompanhe o uso de storage
- Monitore performance das queries
- Verifique logs de erro regularmente

### **Atualizações**
- Sempre teste em ambiente de desenvolvimento
- Use migrations para alterações de schema
- Mantenha documentação atualizada

## 📞 Suporte

Para dúvidas sobre o banco de dados:
- Consulte a [documentação do Supabase](https://supabase.com/docs)
- Verifique os logs no painel do Supabase
- Entre em contato com a equipe de desenvolvimento

---

**Sistema Journey 100k** - Banco de dados robusto e escalável! 🚀
