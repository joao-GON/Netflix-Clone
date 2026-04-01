// Funcionalidade de Dark Mode e Light Mode

// Define a chave do localStorage para armazenar preferência de tema
const THEME_KEY = 'netflix-theme';

/**
 * Inicializa o tema ao carregar a página
 * Verifica se há tema salvo no localStorage, caso contrário usa preferência do sistema
 */
function initTheme() {
  // Obtém o tema salvo no localStorage ou null
  const savedTheme = localStorage.getItem(THEME_KEY);
  
  // Se houver tema salvo, aplica-o; caso contrário, verifica preferência do sistema
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Verifica se o sistema prefere dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
  
  // Atualiza o botão toggle para refletir o tema atual
  updateToggleButton();
}

/**
 * Define o tema da página
 * @param {string} theme - O tema a ser aplicado ('dark' ou 'light')
 */
function setTheme(theme) {
  // Adiciona ou remove a classe 'dark-mode' no elemento html
  const html = document.documentElement;
  
  if (theme === 'dark') {
    html.classList.add('dark-mode');
  } else {
    html.classList.remove('dark-mode');
  }
  
  // Salva a preferência no localStorage para persistência
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Alterna entre dark mode e light mode
 */
function toggleTheme() {
  // Obtém o tema atual verificando se 'dark-mode' está presente
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  
  // Aplica o tema oposto
  const newTheme = isDarkMode ? 'light' : 'dark';
  setTheme(newTheme);
  
  // Atualiza o texto e ícone do botão
  updateToggleButton();
}

/**
 * Atualiza o texto e ícone do botão toggle
 */
function updateToggleButton() {
  // Obtém o botão toggle
  const toggleButton = document.getElementById('theme-toggle');
  
  if (!toggleButton) return; // Sai se botão não existir
  
  // Obtém o tema atual
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  
  // Atualiza o texto do botão
  if (isDarkMode) {
    toggleButton.textContent = '☀️ Light Mode';
    toggleButton.setAttribute('aria-label', 'Mudar para Light Mode');
  } else {
    toggleButton.textContent = '🌙 Dark Mode';
    toggleButton.setAttribute('aria-label', 'Mudar para Dark Mode');
  }
}

/**
 * Listener para monitorar mudanças de preferência do sistema
 * Se o usuário mudar a preferência no SO, a página se adapta
 */
function setupSystemThemeListener() {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  darkModeQuery.addListener((e) => {
    // Se não houver tema salvo, adapta à preferência do sistema
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
      updateToggleButton();
    }
  });
}

/**
 * Inicializa todos os event listeners
 */
function setupEventListeners() {
  // Adiciona listener ao botão toggle
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
  }
  
  // Monitora mudanças de preferência do sistema
  setupSystemThemeListener();
}

/**
 * Executa ao carregar a página (DOMContentLoaded)
 */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o tema
  initTheme();
  
  // Configura event listeners
  setupEventListeners();
});
