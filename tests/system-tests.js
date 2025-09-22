// =================================================================
// SISTEMA JOURNEY 100K - TESTES AUTOMATIZADOS
// =================================================================
// Testes básicos para validar funcionalidades principais
// Execute com: node tests/system-tests.js
// =================================================================

const fs = require('fs');
const path = require('path');

// =================================================================
// CONFIGURAÇÕES DE TESTE
// =================================================================

const TEST_CONFIG = {
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
    verbose: true
};

let testResults = {
    passed: 0,
    failed: 0,
    total: 0,
    errors: []
};

// =================================================================
// UTILITÁRIOS DE TESTE
// =================================================================

function log(message, type = 'info') {
    if (!TEST_CONFIG.verbose) return;
    
    const colors = {
        info: '\x1b[36m',    // Cyan
        success: '\x1b[32m', // Green
        error: '\x1b[31m',   // Red
        warning: '\x1b[33m', // Yellow
        reset: '\x1b[0m'     // Reset
    };
    
    const timestamp = new Date().toISOString().substring(11, 19);
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
}

function assert(condition, message) {
    testResults.total++;
    
    if (condition) {
        testResults.passed++;
        log(`✅ PASS: ${message}`, 'success');
        return true;
    } else {
        testResults.failed++;
        testResults.errors.push(message);
        log(`❌ FAIL: ${message}`, 'error');
        return false;
    }
}

function assertEquals(actual, expected, message) {
    return assert(actual === expected, 
        `${message} - Expected: ${expected}, Actual: ${actual}`);
}

function assertExists(value, message) {
    return assert(value !== null && value !== undefined, message);
}

function assertFileExists(filePath, message) {
    return assert(fs.existsSync(filePath), `${message} - File: ${filePath}`);
}

// =================================================================
// TESTES DE ESTRUTURA DE ARQUIVOS
// =================================================================

async function testFileStructure() {
    log('🧪 Iniciando testes de estrutura de arquivos...', 'info');
    
    const requiredFiles = [
        // Arquivos principais
        'package.json',
        'server.js',
        '.env.example',
        'README.md',
        
        // Frontend
        'frontend/index.html',
        'frontend/pages/login.html',
        'frontend/assets/css/global.css',
        'frontend/assets/js/router.js',
        'frontend/assets/js/supabase-config.js',
        'frontend/components/sidebar.html',
        'frontend/components/header.html',
        
        // Páginas principais
        'frontend/pages/dashboard/index.html',
        'frontend/pages/employees/index.html',
        'frontend/pages/projects/index.html',
        'frontend/pages/financial/index.html',
        'frontend/pages/chat/index.html',
        'frontend/pages/ponto/index.html',
        'frontend/pages/documents/index.html',
        'frontend/pages/reports/index.html',
        'frontend/pages/gamification/index.html',
        'frontend/pages/settings/index.html',
        
        // Database
        'database/supabase_schema_completo.sql',
        'database/validacao_schema.sql',
        'database/README.md',
        
        // Documentação
        'docs/DESENVOLVIMENTO.md'
    ];
    
    const basePath = '/home/ubuntu/SISTEMA-PEDRO';
    
    for (const file of requiredFiles) {
        const fullPath = path.join(basePath, file);
        assertFileExists(fullPath, `Arquivo obrigatório existe: ${file}`);
    }
    
    log('✅ Testes de estrutura de arquivos concluídos', 'success');
}

// =================================================================
// TESTES DE CONFIGURAÇÃO
// =================================================================

async function testConfiguration() {
    log('🧪 Iniciando testes de configuração...', 'info');
    
    try {
        // Testar package.json
        const packagePath = '/home/ubuntu/SISTEMA-PEDRO/package.json';
        if (fs.existsSync(packagePath)) {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            assertExists(packageJson.name, 'package.json tem nome');
            assertExists(packageJson.version, 'package.json tem versão');
            assertExists(packageJson.scripts, 'package.json tem scripts');
            assertExists(packageJson.scripts.start, 'package.json tem script start');
            assertExists(packageJson.dependencies, 'package.json tem dependências');
            
            // Verificar dependências essenciais
            const requiredDeps = ['express', 'cors'];
            for (const dep of requiredDeps) {
                assert(packageJson.dependencies[dep], `Dependência ${dep} está presente`);
            }
        }
        
        // Testar .env.example
        const envExamplePath = '/home/ubuntu/SISTEMA-PEDRO/.env.example';
        if (fs.existsSync(envExamplePath)) {
            const envContent = fs.readFileSync(envExamplePath, 'utf8');
            
            assert(envContent.includes('SUPABASE_URL'), '.env.example contém SUPABASE_URL');
            assert(envContent.includes('SUPABASE_ANON_KEY'), '.env.example contém SUPABASE_ANON_KEY');
            assert(envContent.includes('NODE_ENV'), '.env.example contém NODE_ENV');
        }
        
    } catch (error) {
        assert(false, `Erro ao testar configuração: ${error.message}`);
    }
    
    log('✅ Testes de configuração concluídos', 'success');
}

// =================================================================
// TESTES DE CONTEÚDO HTML
// =================================================================

async function testHtmlContent() {
    log('🧪 Iniciando testes de conteúdo HTML...', 'info');
    
    const htmlFiles = [
        'frontend/index.html',
        'frontend/pages/login.html'
    ];
    
    for (const file of htmlFiles) {
        const fullPath = path.join('/home/ubuntu/SISTEMA-PEDRO', file);
        
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Testes básicos de HTML
            assert(content.includes('<!DOCTYPE html>'), `${file} tem DOCTYPE`);
            assert(content.includes('<html'), `${file} tem tag html`);
            assert(content.includes('<head>'), `${file} tem head`);
            assert(content.includes('<body>'), `${file} tem body`);
            assert(content.includes('<title>'), `${file} tem title`);
            
            // Testes específicos
            if (file.includes('login.html')) {
                assert(content.includes('Journey 100k'), `${file} contém título Journey 100k`);
                assert(content.includes('form'), `${file} contém formulário`);
                assert(content.includes('input'), `${file} contém campos de input`);
            }
            
            if (file.includes('index.html')) {
                assert(content.includes('Journey 100k'), `${file} contém título Journey 100k`);
            }
        }
    }
    
    log('✅ Testes de conteúdo HTML concluídos', 'success');
}

// =================================================================
// TESTES DE JAVASCRIPT
// =================================================================

async function testJavaScriptFiles() {
    log('🧪 Iniciando testes de arquivos JavaScript...', 'info');
    
    const jsFiles = [
        'frontend/assets/js/router.js',
        'frontend/assets/js/supabase-config.js',
        'server.js'
    ];
    
    for (const file of jsFiles) {
        const fullPath = path.join('/home/ubuntu/SISTEMA-PEDRO', file);
        
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Testes básicos de sintaxe
            assert(!content.includes('console.error('), `${file} não tem console.error sem tratamento`);
            
            // Testes específicos
            if (file.includes('router.js')) {
                assert(content.includes('class JourneyRouter'), `${file} contém classe JourneyRouter`);
                assert(content.includes('navigate'), `${file} contém função navigate`);
            }
            
            if (file.includes('supabase-config.js')) {
                assert(content.includes('supabase'), `${file} contém referências ao Supabase`);
                assert(content.includes('AuthService'), `${file} contém AuthService`);
            }
            
            if (file.includes('server.js')) {
                assert(content.includes('express'), `${file} usa Express`);
                assert(content.includes('app.listen'), `${file} inicia servidor`);
            }
        }
    }
    
    log('✅ Testes de arquivos JavaScript concluídos', 'success');
}

// =================================================================
// TESTES DE CSS
// =================================================================

async function testCssFiles() {
    log('🧪 Iniciando testes de arquivos CSS...', 'info');
    
    const cssFile = 'frontend/assets/css/global.css';
    const fullPath = path.join('/home/ubuntu/SISTEMA-PEDRO', cssFile);
    
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Testes de CSS
        assert(content.includes(':root'), `${cssFile} contém variáveis CSS`);
        assert(content.includes('--primary-color'), `${cssFile} contém cor primária`);
        assert(content.includes('.btn'), `${cssFile} contém estilos de botão`);
        assert(content.includes('.card'), `${cssFile} contém estilos de card`);
        assert(content.includes('@media'), `${cssFile} contém media queries`);
        
        // Verificar se não há erros óbvios
        assert(!content.includes('color: ;'), `${cssFile} não tem propriedades vazias`);
        assert(!content.includes('undefined'), `${cssFile} não contém undefined`);
    }
    
    log('✅ Testes de arquivos CSS concluídos', 'success');
}

// =================================================================
// TESTES DE BANCO DE DADOS
// =================================================================

async function testDatabaseFiles() {
    log('🧪 Iniciando testes de arquivos de banco de dados...', 'info');
    
    const sqlFile = 'database/supabase_schema_completo.sql';
    const fullPath = path.join('/home/ubuntu/SISTEMA-PEDRO', sqlFile);
    
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Testes de SQL
        assert(content.includes('CREATE TABLE'), `${sqlFile} contém criação de tabelas`);
        assert(content.includes('profiles'), `${sqlFile} contém tabela profiles`);
        assert(content.includes('projects'), `${sqlFile} contém tabela projects`);
        assert(content.includes('financial_transactions'), `${sqlFile} contém tabela financial_transactions`);
        assert(content.includes('ALTER TABLE'), `${sqlFile} contém alterações de tabela`);
        assert(content.includes('CREATE INDEX'), `${sqlFile} contém criação de índices`);
        
        // Verificar RLS (Row Level Security)
        assert(content.includes('ENABLE ROW LEVEL SECURITY'), `${sqlFile} habilita RLS`);
        assert(content.includes('CREATE POLICY'), `${sqlFile} contém políticas de segurança`);
    }
    
    log('✅ Testes de arquivos de banco de dados concluídos', 'success');
}

// =================================================================
// TESTES DE DOCUMENTAÇÃO
// =================================================================

async function testDocumentation() {
    log('🧪 Iniciando testes de documentação...', 'info');
    
    const docFiles = [
        'README.md',
        'docs/DESENVOLVIMENTO.md',
        'database/README.md'
    ];
    
    for (const file of docFiles) {
        const fullPath = path.join('/home/ubuntu/SISTEMA-PEDRO', file);
        
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Testes básicos de documentação
            assert(content.length > 100, `${file} tem conteúdo suficiente`);
            assert(content.includes('#'), `${file} usa formatação Markdown`);
            
            // Testes específicos
            if (file.includes('DESENVOLVIMENTO.md')) {
                assert(content.includes('Instalação'), `${file} contém instruções de instalação`);
                assert(content.includes('npm'), `${file} menciona npm`);
                assert(content.includes('Supabase'), `${file} menciona Supabase`);
            }
        }
    }
    
    log('✅ Testes de documentação concluídos', 'success');
}

// =================================================================
// RELATÓRIO DE TESTES
// =================================================================

function generateTestReport() {
    log('\n📊 RELATÓRIO DE TESTES', 'info');
    log('='.repeat(50), 'info');
    
    const successRate = ((testResults.passed / testResults.total) * 100).toFixed(1);
    
    log(`Total de testes: ${testResults.total}`, 'info');
    log(`Testes aprovados: ${testResults.passed}`, 'success');
    log(`Testes falharam: ${testResults.failed}`, testResults.failed > 0 ? 'error' : 'info');
    log(`Taxa de sucesso: ${successRate}%`, successRate >= 90 ? 'success' : 'warning');
    
    if (testResults.errors.length > 0) {
        log('\n❌ ERROS ENCONTRADOS:', 'error');
        testResults.errors.forEach((error, index) => {
            log(`${index + 1}. ${error}`, 'error');
        });
    }
    
    log('\n' + '='.repeat(50), 'info');
    
    if (testResults.failed === 0) {
        log('🎉 TODOS OS TESTES PASSARAM!', 'success');
        return true;
    } else {
        log('⚠️  ALGUNS TESTES FALHARAM', 'warning');
        return false;
    }
}

// =================================================================
// EXECUÇÃO PRINCIPAL
// =================================================================

async function runAllTests() {
    log('🚀 Iniciando bateria de testes do Sistema Journey 100k...', 'info');
    log('='.repeat(60), 'info');
    
    try {
        await testFileStructure();
        await testConfiguration();
        await testHtmlContent();
        await testJavaScriptFiles();
        await testCssFiles();
        await testDatabaseFiles();
        await testDocumentation();
        
        const allPassed = generateTestReport();
        
        // Salvar relatório em arquivo
        const reportPath = '/home/ubuntu/SISTEMA-PEDRO/tests/test-report.json';
        const report = {
            timestamp: new Date().toISOString(),
            results: testResults,
            success: allPassed
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        log(`📋 Relatório salvo em: ${reportPath}`, 'info');
        
        process.exit(allPassed ? 0 : 1);
        
    } catch (error) {
        log(`💥 Erro durante execução dos testes: ${error.message}`, 'error');
        process.exit(1);
    }
}

// =================================================================
// INICIALIZAÇÃO
// =================================================================

if (require.main === module) {
    runAllTests();
}

module.exports = {
    runAllTests,
    testFileStructure,
    testConfiguration,
    testHtmlContent,
    testJavaScriptFiles,
    testCssFiles,
    testDatabaseFiles,
    testDocumentation
};
