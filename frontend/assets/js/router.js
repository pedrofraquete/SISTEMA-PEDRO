// =================================================================
// SISTEMA JOURNEY 100K - ROTEADOR DE NAVEGAÇÃO
// =================================================================
// Gerencia a navegação entre páginas do sistema
// Controla autenticação e permissões de acesso
// =================================================================

class JourneyRouter {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.routes = this.initializeRoutes();
        this.init();
    }

    // =================================================================
    // CONFIGURAÇÃO DAS ROTAS
    // =================================================================
    initializeRoutes() {
        return {
            // Páginas públicas
            '/': {
                path: '/frontend/index.html',
                title: 'Journey 100k - Início',
                requiresAuth: false,
                roles: []
            },
            '/login': {
                path: '/frontend/pages/login.html',
                title: 'Login - Journey 100k',
                requiresAuth: false,
                roles: []
            },

            // Dashboard principal
            '/dashboard': {
                path: '/frontend/pages/dashboard/index.html',
                title: 'Dashboard - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Módulo de funcionários
            '/employees': {
                path: '/frontend/pages/employees/index.html',
                title: 'Funcionários - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager']
            },

            // Módulo de projetos
            '/projects': {
                path: '/frontend/pages/projects/index.html',
                title: 'Projetos - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Módulo financeiro
            '/financial': {
                path: '/frontend/pages/financial/index.html',
                title: 'Financeiro - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin']
            },

            // Chat
            '/chat': {
                path: '/frontend/pages/chat/index.html',
                title: 'Chat - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Ponto digital
            '/ponto': {
                path: '/frontend/pages/ponto/index.html',
                title: 'Ponto Digital - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Documentos
            '/documents': {
                path: '/frontend/pages/documents/index.html',
                title: 'Documentos - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Relatórios
            '/reports': {
                path: '/frontend/pages/reports/index.html',
                title: 'Relatórios - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager']
            },

            // Gamificação
            '/gamification': {
                path: '/frontend/pages/gamification/index.html',
                title: 'Gamificação - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin', 'manager', 'employee']
            },

            // Configurações
            '/settings': {
                path: '/frontend/pages/settings/index.html',
                title: 'Configurações - Journey 100k',
                requiresAuth: true,
                roles: ['super_admin', 'admin']
            }
        };
    }

    // =================================================================
    // INICIALIZAÇÃO DO ROTEADOR
    // =================================================================
    init() {
        this.loadUserSession();
        this.setupNavigationListeners();
        this.handleInitialRoute();
    }

    // =================================================================
    // GERENCIAMENTO DE SESSÃO
    // =================================================================
    loadUserSession() {
        try {
            const userData = localStorage.getItem('journey_user');
            const authToken = localStorage.getItem('journey_token');
            
            if (userData && authToken) {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
                this.validateToken(authToken);
            }
        } catch (error) {
            console.error('Erro ao carregar sessão:', error);
            this.logout();
        }
    }

    async validateToken(token) {
        try {
            // Aqui você faria a validação com o Supabase
            // Por enquanto, vamos simular
            const isValid = token && token.length > 10;
            
            if (!isValid) {
                this.logout();
            }
        } catch (error) {
            console.error('Token inválido:', error);
            this.logout();
        }
    }

    login(userData, token) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        
        localStorage.setItem('journey_user', JSON.stringify(userData));
        localStorage.setItem('journey_token', token);
        
        // Redirecionar para dashboard após login
        this.navigate('/dashboard');
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('journey_user');
        localStorage.removeItem('journey_token');
        
        // Redirecionar para login
        this.navigate('/login');
    }

    // =================================================================
    // NAVEGAÇÃO
    // =================================================================
    navigate(route, pushState = true) {
        const routeConfig = this.routes[route];
        
        if (!routeConfig) {
            console.error('Rota não encontrada:', route);
            this.navigate('/dashboard');
            return;
        }

        // Verificar autenticação
        if (routeConfig.requiresAuth && !this.isAuthenticated) {
            this.navigate('/login');
            return;
        }

        // Verificar permissões
        if (routeConfig.roles.length > 0 && this.currentUser) {
            if (!routeConfig.roles.includes(this.currentUser.role)) {
                this.showAccessDenied();
                return;
            }
        }

        // Atualizar URL se necessário
        if (pushState && window.location.pathname !== route) {
            history.pushState({ route }, routeConfig.title, route);
        }

        // Atualizar título da página
        document.title = routeConfig.title;

        // Carregar página
        this.loadPage(routeConfig.path);
    }

    async loadPage(pagePath) {
        try {
            this.showLoading();
            
            // Simular carregamento
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Em um ambiente real, você carregaria o conteúdo via AJAX
            // Por enquanto, vamos redirecionar
            window.location.href = pagePath;
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.showError('Erro ao carregar página');
        } finally {
            this.hideLoading();
        }
    }

    // =================================================================
    // LISTENERS DE NAVEGAÇÃO
    // =================================================================
    setupNavigationListeners() {
        // Interceptar cliques em links de navegação
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });

        // Gerenciar botão voltar do navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route, false);
            }
        });

        // Interceptar links da sidebar
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink && navLink.getAttribute('href') !== '#') {
                e.preventDefault();
                const href = navLink.getAttribute('href');
                const route = this.pathToRoute(href);
                if (route) {
                    this.navigate(route);
                }
            }
        });
    }

    pathToRoute(path) {
        // Converter caminho do arquivo para rota
        const routeMap = {
            'pages/dashboard/index.html': '/dashboard',
            'pages/employees/index.html': '/employees',
            'pages/projects/index.html': '/projects',
            'pages/financial/index.html': '/financial',
            'pages/chat/index.html': '/chat',
            'pages/ponto/index.html': '/ponto',
            'pages/documents/index.html': '/documents',
            'pages/reports/index.html': '/reports',
            'pages/gamification/index.html': '/gamification',
            'pages/settings/index.html': '/settings'
        };

        return routeMap[path] || null;
    }

    handleInitialRoute() {
        const currentPath = window.location.pathname;
        const route = Object.keys(this.routes).find(r => 
            this.routes[r].path.includes(currentPath.split('/').pop())
        ) || '/';
        
        this.navigate(route, false);
    }

    // =================================================================
    // UTILITÁRIOS DE UI
    // =================================================================
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('active');
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('active');
        }
    }

    showError(message) {
        // Implementar notificação de erro
        console.error(message);
        alert('Erro: ' + message);
    }

    showAccessDenied() {
        alert('Acesso negado! Você não tem permissão para acessar esta página.');
    }

    // =================================================================
    // UTILITÁRIOS DE USUÁRIO
    // =================================================================
    getCurrentUser() {
        return this.currentUser;
    }

    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    hasAnyRole(roles) {
        return this.currentUser && roles.includes(this.currentUser.role);
    }

    isAdmin() {
        return this.hasAnyRole(['super_admin', 'admin']);
    }

    // =================================================================
    // BREADCRUMBS
    // =================================================================
    updateBreadcrumbs(route) {
        const breadcrumbsContainer = document.querySelector('.breadcrumbs');
        if (!breadcrumbsContainer) return;

        const routeConfig = this.routes[route];
        if (!routeConfig) return;

        const breadcrumbs = this.generateBreadcrumbs(route);
        breadcrumbsContainer.innerHTML = breadcrumbs.map(crumb => 
            `<span class="breadcrumb-item">${crumb}</span>`
        ).join(' / ');
    }

    generateBreadcrumbs(route) {
        const breadcrumbMap = {
            '/': ['Início'],
            '/dashboard': ['Dashboard'],
            '/employees': ['Dashboard', 'Funcionários'],
            '/projects': ['Dashboard', 'Projetos'],
            '/financial': ['Dashboard', 'Financeiro'],
            '/chat': ['Dashboard', 'Chat'],
            '/ponto': ['Dashboard', 'Ponto Digital'],
            '/documents': ['Dashboard', 'Documentos'],
            '/reports': ['Dashboard', 'Relatórios'],
            '/gamification': ['Dashboard', 'Gamificação'],
            '/settings': ['Dashboard', 'Configurações']
        };

        return breadcrumbMap[route] || ['Dashboard'];
    }
}

// =================================================================
// INICIALIZAÇÃO GLOBAL
// =================================================================

// Instância global do roteador
let journeyRouter;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    journeyRouter = new JourneyRouter();
    
    // Expor globalmente para uso em outras páginas
    window.JourneyRouter = journeyRouter;
});

// Funções de conveniência globais
window.navigateTo = function(route) {
    if (journeyRouter) {
        journeyRouter.navigate(route);
    }
};

window.getCurrentUser = function() {
    return journeyRouter ? journeyRouter.getCurrentUser() : null;
};

window.logout = function() {
    if (journeyRouter) {
        journeyRouter.logout();
    }
};

// =================================================================
// EXPORT PARA MÓDULOS
// =================================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JourneyRouter;
}
