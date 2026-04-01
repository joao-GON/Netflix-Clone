/**
 * SISTEMA DE NAVEGAÇÃO SIMPLIFICADO
 * Navegação básica entre páginas com estado persistido
 */

/**
 * Navega para uma nova página
 * @param {string} page - Nome da página (ex: 'index', 'perfis', 'catalogue')
 * @param {object} state - Estado/dados a passar para a página
 */
function navigateTo(page, state = {}) {
  // Salva o estado no localStorage para persistência
  localStorage.setItem('appState', JSON.stringify(state));

  // Redireciona para a página HTML correspondente
  window.location.href = page + '.html';
}

/**
 * Obtém o estado atual (dados) da página
 */
function getCurrentState() {
  const state = localStorage.getItem('appState');
  return state ? JSON.parse(state) : {};
}

/**
 * Função de login (chamada ao submit do formulário)
 */
function handleLogin(event) {
  // Previne o comportamento padrão do formulário
  event.preventDefault();

  // Obtém os valores do formulário
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

  // Validação simples
  if (email && password) {
    // Simula validação (em produção, faria requisição ao servidor)
    console.log('Login realizado com:', email);

    // Limpa o formulário
    if (document.getElementById('login-form')) {
      document.getElementById('login-form').reset();
    }

    // Navega para a página de perfis com o estado do usuário
    navigateTo('perfis', { email, username: email.split('@')[0] });
  } else {
    // Mostra alerta se campos vazios
    alert('Por favor, preencha todos os campos!');
  }
}

/**
 * Função para logout (retorna ao login)
 */
function handleLogout() {
  // Limpa o estado e volta ao login
  localStorage.removeItem('appState');
  window.location.href = 'index.html';
}

/**
 * Inicializa ao carregar a página
 */
document.addEventListener('DOMContentLoaded', function() {
  // Se houver um botão de logout, adiciona listener
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});
