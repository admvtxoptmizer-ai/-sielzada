const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:8888/.netlify/functions' 
    : '/.netlify/functions';

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
    }
  }
});

const fovRange = document.getElementById('fovRange');
const fovDisplay = document.getElementById('fovDisplay');
fovRange.addEventListener('input', () => {
  fovDisplay.textContent = fovRange.value;
});

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

const injectBtn = document.getElementById('injectBtn');
const status = document.getElementById('status');

injectBtn.addEventListener('click', async () => {
  const config = {
    auxilio: document.getElementById('auxilio').checked,
    aimlock: document.getElementById('aimlock').checked,
    fov: parseInt(fovRange.value),
    mode: document.getElementById('modeSelect').value,
    intensity: parseInt(document.getElementById('modeSelect').value)
  };

  injectBtn.textContent = 'INJETANDO...';
  injectBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE}/aimbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    const data = await response.json();

    if (data.success) {
      status.classList.add('active');
      injectBtn.textContent = '✓ INJETADO!';
      
      setTimeout(() => {
        injectBtn.textContent = 'INJETAR AO JOGO?';
        injectBtn.disabled = false;
        status.classList.remove('active');
      }, 3000);
    }
  } catch (error) {
    console.error('Erro:', error);
    injectBtn.textContent = 'INJETAR AO JOGO?';
    injectBtn.disabled = false;
  }
});
