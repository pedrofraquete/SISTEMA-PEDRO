// =================================================================
// SISTEMA JOURNEY 100K - CONFIGURAÇÃO SUPABASE
// =================================================================
// Configuração e inicialização do cliente Supabase
// Gerenciamento de autenticação e operações de banco de dados
// =================================================================

// Configuração do Supabase (substitua pelas suas credenciais)
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here',
    // Configurações adicionais
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
};

// Cliente Supabase global
let supabaseClient = null;

// =================================================================
// INICIALIZAÇÃO DO SUPABASE
// =================================================================

function initializeSupabase() {
    try {
        // Verificar se as credenciais estão configuradas
        if (SUPABASE_CONFIG.url.includes('your-project') || 
            SUPABASE_CONFIG.anonKey.includes('your-anon-key')) {
            console.warn('⚠️ Supabase não configurado. Usando modo de desenvolvimento.');
            return null;
        }

        // Inicializar cliente Supabase
        supabaseClient = supabase.createClient(
            SUPABASE_CONFIG.url, 
            SUPABASE_CONFIG.anonKey,
            SUPABASE_CONFIG
        );

        console.log('✅ Supabase inicializado com sucesso');
        return supabaseClient;
    } catch (error) {
        console.error('❌ Erro ao inicializar Supabase:', error);
        return null;
    }
}

// =================================================================
// AUTENTICAÇÃO
// =================================================================

class AuthService {
    constructor() {
        this.client = supabaseClient;
        this.currentUser = null;
        this.isAuthenticated = false;
    }

    // Login com email e senha
    async signIn(email, password) {
        try {
            if (!this.client) {
                // Modo de desenvolvimento - simular login
                if (email === 'admin' && password === 'admin') {
                    const mockUser = {
                        id: 'mock-user-id',
                        email: 'admin@soluzionegiusta.com',
                        full_name: 'Pedro Fraquete',
                        role: 'super_admin',
                        department: 'Administração',
                        position: 'CEO'
                    };
                    
                    this.currentUser = mockUser;
                    this.isAuthenticated = true;
                    
                    // Salvar no localStorage
                    localStorage.setItem('journey_user', JSON.stringify(mockUser));
                    localStorage.setItem('journey_token', 'mock-token-' + Date.now());
                    
                    return { user: mockUser, error: null };
                } else {
                    return { user: null, error: { message: 'Credenciais inválidas' } };
                }
            }

            const { data, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return { user: null, error };
            }

            // Buscar perfil do usuário
            const profile = await this.getUserProfile(data.user.id);
            
            this.currentUser = profile;
            this.isAuthenticated = true;

            return { user: profile, error: null };
        } catch (error) {
            console.error('Erro no login:', error);
            return { user: null, error };
        }
    }

    // Logout
    async signOut() {
        try {
            if (this.client) {
                await this.client.auth.signOut();
            }
            
            this.currentUser = null;
            this.isAuthenticated = false;
            
            // Limpar localStorage
            localStorage.removeItem('journey_user');
            localStorage.removeItem('journey_token');
            
            return { error: null };
        } catch (error) {
            console.error('Erro no logout:', error);
            return { error };
        }
    }

    // Buscar perfil do usuário
    async getUserProfile(userId) {
        try {
            if (!this.client) {
                return this.currentUser;
            }

            const { data, error } = await this.client
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Erro ao buscar perfil:', error);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            return null;
        }
    }

    // Verificar sessão atual
    async getCurrentSession() {
        try {
            if (!this.client) {
                // Verificar localStorage em modo de desenvolvimento
                const userData = localStorage.getItem('journey_user');
                const token = localStorage.getItem('journey_token');
                
                if (userData && token) {
                    this.currentUser = JSON.parse(userData);
                    this.isAuthenticated = true;
                    return { user: this.currentUser, error: null };
                }
                
                return { user: null, error: null };
            }

            const { data, error } = await this.client.auth.getSession();
            
            if (error || !data.session) {
                return { user: null, error };
            }

            const profile = await this.getUserProfile(data.session.user.id);
            this.currentUser = profile;
            this.isAuthenticated = true;

            return { user: profile, error: null };
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
            return { user: null, error };
        }
    }

    // Registrar novo usuário
    async signUp(userData) {
        try {
            if (!this.client) {
                console.warn('Registro não disponível em modo de desenvolvimento');
                return { user: null, error: { message: 'Registro não disponível' } };
            }

            const { data, error } = await this.client.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        full_name: userData.full_name,
                        role: userData.role || 'employee'
                    }
                }
            });

            if (error) {
                return { user: null, error };
            }

            return { user: data.user, error: null };
        } catch (error) {
            console.error('Erro no registro:', error);
            return { user: null, error };
        }
    }
}

// =================================================================
// OPERAÇÕES DE BANCO DE DADOS
// =================================================================

class DatabaseService {
    constructor() {
        this.client = supabaseClient;
    }

    // Buscar dados de uma tabela
    async select(table, options = {}) {
        try {
            if (!this.client) {
                return this.getMockData(table, options);
            }

            let query = this.client.from(table).select(options.select || '*');

            // Aplicar filtros
            if (options.filters) {
                options.filters.forEach(filter => {
                    query = query.eq(filter.column, filter.value);
                });
            }

            // Aplicar ordenação
            if (options.orderBy) {
                query = query.order(options.orderBy.column, { 
                    ascending: options.orderBy.ascending !== false 
                });
            }

            // Aplicar limite
            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error } = await query;

            if (error) {
                console.error(`Erro ao buscar ${table}:`, error);
                return { data: null, error };
            }

            return { data, error: null };
        } catch (error) {
            console.error(`Erro ao buscar ${table}:`, error);
            return { data: null, error };
        }
    }

    // Inserir dados
    async insert(table, data) {
        try {
            if (!this.client) {
                console.log(`Mock insert em ${table}:`, data);
                return { data: { ...data, id: 'mock-id-' + Date.now() }, error: null };
            }

            const { data: result, error } = await this.client
                .from(table)
                .insert(data)
                .select()
                .single();

            if (error) {
                console.error(`Erro ao inserir em ${table}:`, error);
                return { data: null, error };
            }

            return { data: result, error: null };
        } catch (error) {
            console.error(`Erro ao inserir em ${table}:`, error);
            return { data: null, error };
        }
    }

    // Atualizar dados
    async update(table, id, data) {
        try {
            if (!this.client) {
                console.log(`Mock update em ${table}:`, { id, data });
                return { data: { ...data, id }, error: null };
            }

            const { data: result, error } = await this.client
                .from(table)
                .update(data)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error(`Erro ao atualizar ${table}:`, error);
                return { data: null, error };
            }

            return { data: result, error: null };
        } catch (error) {
            console.error(`Erro ao atualizar ${table}:`, error);
            return { data: null, error };
        }
    }

    // Deletar dados
    async delete(table, id) {
        try {
            if (!this.client) {
                console.log(`Mock delete em ${table}:`, id);
                return { error: null };
            }

            const { error } = await this.client
                .from(table)
                .delete()
                .eq('id', id);

            if (error) {
                console.error(`Erro ao deletar de ${table}:`, error);
                return { error };
            }

            return { error: null };
        } catch (error) {
            console.error(`Erro ao deletar de ${table}:`, error);
            return { error };
        }
    }

    // Dados mock para desenvolvimento
    getMockData(table, options = {}) {
        const mockData = {
            profiles: [
                {
                    id: '1',
                    full_name: 'Pedro Fraquete',
                    email: 'pedro@soluzionegiusta.com',
                    role: 'super_admin',
                    department: 'Administração',
                    position: 'CEO',
                    is_active: true
                },
                {
                    id: '2',
                    full_name: 'João Marcos',
                    email: 'joao@soluzionegiusta.com',
                    role: 'manager',
                    department: 'Desenvolvimento',
                    position: 'Tech Lead',
                    is_active: true
                }
            ],
            projects: [
                {
                    id: '1',
                    name: 'Sistema ERP',
                    description: 'Desenvolvimento de sistema ERP completo',
                    status: 'in_progress',
                    progress_percentage: 75,
                    budget: 150000,
                    manager_id: '2'
                },
                {
                    id: '2',
                    name: 'Website Institucional',
                    description: 'Novo website da empresa',
                    status: 'completed',
                    progress_percentage: 100,
                    budget: 25000,
                    manager_id: '2'
                }
            ],
            financial_transactions: [
                {
                    id: '1',
                    type: 'income',
                    amount: 50000,
                    description: 'Pagamento Cliente ABC',
                    status: 'paid',
                    created_at: '2025-09-20'
                },
                {
                    id: '2',
                    type: 'expense',
                    amount: 25750,
                    description: 'Pagamento Fornecedor XYZ',
                    status: 'pending',
                    due_date: '2025-09-22'
                }
            ]
        };

        const data = mockData[table] || [];
        
        // Aplicar filtros mock
        let filteredData = data;
        if (options.filters) {
            options.filters.forEach(filter => {
                filteredData = filteredData.filter(item => 
                    item[filter.column] === filter.value
                );
            });
        }

        // Aplicar limite mock
        if (options.limit) {
            filteredData = filteredData.slice(0, options.limit);
        }

        return { data: filteredData, error: null };
    }
}

// =================================================================
// INSTÂNCIAS GLOBAIS
// =================================================================

// Inicializar serviços
let authService = null;
let dbService = null;

function initializeServices() {
    initializeSupabase();
    authService = new AuthService();
    dbService = new DatabaseService();
    
    // Expor globalmente
    window.authService = authService;
    window.dbService = dbService;
    
    return { authService, dbService };
}

// =================================================================
// FUNÇÕES DE CONVENIÊNCIA
// =================================================================

// Verificar se está autenticado
function isAuthenticated() {
    return authService ? authService.isAuthenticated : false;
}

// Obter usuário atual
function getCurrentUser() {
    return authService ? authService.currentUser : null;
}

// Fazer login
async function login(email, password) {
    if (!authService) {
        initializeServices();
    }
    return await authService.signIn(email, password);
}

// Fazer logout
async function logout() {
    if (!authService) return;
    
    const result = await authService.signOut();
    
    // Redirecionar para login
    if (typeof navigateTo === 'function') {
        navigateTo('/login');
    } else {
        window.location.href = '/frontend/pages/login.html';
    }
    
    return result;
}

// Buscar dados
async function fetchData(table, options = {}) {
    if (!dbService) {
        initializeServices();
    }
    return await dbService.select(table, options);
}

// Salvar dados
async function saveData(table, data, id = null) {
    if (!dbService) {
        initializeServices();
    }
    
    if (id) {
        return await dbService.update(table, id, data);
    } else {
        return await dbService.insert(table, data);
    }
}

// Deletar dados
async function deleteData(table, id) {
    if (!dbService) {
        initializeServices();
    }
    return await dbService.delete(table, id);
}

// =================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// =================================================================

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    
    // Verificar sessão atual
    if (authService) {
        authService.getCurrentSession().then(({ user, error }) => {
            if (user && typeof updateUserInfo === 'function') {
                updateUserInfo(user);
            }
        });
    }
});

// =================================================================
// EXPORT PARA MÓDULOS
// =================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSupabase,
        AuthService,
        DatabaseService,
        isAuthenticated,
        getCurrentUser,
        login,
        logout,
        fetchData,
        saveData,
        deleteData
    };
}
