let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

// Função para mostrar slide específico
function showSlide(index) {
  // Remove active de todos os slides e dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Adiciona active ao slide e dot atual
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

// Função para mudar slide (próximo/anterior)
function changeSlide(direction) {
  currentSlide += direction;

  // Loop infinito
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  showSlide(currentSlide);
}

// Função para ir direto a um slide específico
function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play (opcional) - avança automaticamente a cada 5 segundos
let autoPlayInterval = setInterval(() => {
  changeSlide(1);
}, 5000);

// Pausa o auto-play quando o usuário interage
document.querySelector('.slider-container').addEventListener('click', () => {
  clearInterval(autoPlayInterval);
  // Reinicia o auto-play após 10 segundos de inatividade
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});

// Suporte para gestos de toque (mobile)
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    changeSlide(1);
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right
    changeSlide(-1);
  }
}
