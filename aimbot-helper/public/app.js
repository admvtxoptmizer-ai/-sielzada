const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:8888/.netlify/functions' 
    : '/.netlify/functions';

// Particles.js config
particlesJS('particles-js', {
  "particles": {
    "number": { "value": 70 },
    "color": { "value": "#3a7bfd" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5 },
    "size": { "value": 3, "random": true },
    "line_linked": { 
      "enable": true, 
      "distance": 150, 
      "color": "#3a7bfd", 
      "opacity": 0.4, 
      "width": 1 
    },
    "move": { "enable": true, "speed": 2 }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "repulse": { "distance": 100 },
      "push": { "particles_nb": 3 }
    }
  },
  "retina_detect": true
});

// FOV Range slider
const fovRange = document.getElementById('fovRange');
const fovDisplay = document.getElementById('fovDisplay');
fovRange.addEventListener('input', () => {
  fovDisplay.textContent = fovRange.value;
});

// Tabs
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Inject button
const injectBtn = document.getElementById('injectBtn');
const status = document.getElementById('status');
const auxilioCheck = document.getElementById('auxilio');
const aimlockCheck = document.getElementById('aimlock');
const modeSelect = document.getElementById('modeSelect');

injectBtn.addEventListener('click', async () => {
  const config = {
    auxilio: auxilioCheck.checked,
    aimlock: aimlockCheck.checked,
    fov: parseInt(fovRange.value),
    mode: `auxilio ${modeSelect.value}%`,
    intensity: parseInt(modeSelect.value)
  };

  if (!config.auxilio && !config.aimlock) {
    alert('Selecione pelo menos uma função!');
    return;
  }

  injectBtn.textContent = 'INJETANDO...';
  injectBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE}/aimbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    const data = await response.json();

    if (data.success) {
      console.log('Aimbot Config:', data.config);
      console.log('Injection Code:', data.injectionCode);
      
      status.classList.add('active');
      injectBtn.textContent = '✓ INJETADO!';
      
      setTimeout(() => {
        injectBtn.textContent = 'INJETAR AO JOGO?';
        injectBtn.disabled = false;
        status.classList.remove('active');
      }, 3000);
    } else {
      throw new Error('Falha na injeção');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao injetar! Verifique o console.');
    injectBtn.textContent = 'INJETAR AO JOGO?';
    injectBtn.disabled = false;
  }
});

// Carregar configurações ao iniciar
async function loadConfig() {
  try {
    const response = await fetch(`${API_BASE}/config`);
    const data = await response.json();
    console.log('System Config:', data.config);
  } catch (error) {
    console.error('Erro ao carregar config:', error);
  }
}

loadConfig();

// Easter egg - Ctrl+Shift+D para debug
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    console.log('%c🎯 DEBUG MODE ATIVADO', 'color: #00ff00; font-size: 20px; font-weight: bold;');
    console.log('FOV:', fovRange.value);
    console.log('Auxilio:', auxilioCheck.checked);
    console.log('Aimlock:', aimlockCheck.checked);
    console.log('Mode:', modeSelect.value + '%');
  }
});
