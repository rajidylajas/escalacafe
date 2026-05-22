/* ============================================
   ESCALA CAFÉ — JavaScript Principal
   Ficheiro: main.js
   ============================================ */

/* ----------------------------------------
   LOADER
   ---------------------------------------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ----------------------------------------
   CURSOR PERSONALIZADO
   ---------------------------------------- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Efeito de escala ao passar em elementos interativos
document.querySelectorAll('a, button, .menu-item, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
    ring.style.opacity     = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity     = '0.5';
  });
});

/* ----------------------------------------
   NAVBAR — efeito ao scroll
   ---------------------------------------- */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ----------------------------------------
   MENU — troca de categorias (tabs)
   ---------------------------------------- */
function showMenu(category) {
  // Esconde todas as grelhas e desactiva todos os tabs
  document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));

  // Mostra a grelha seleccionada e activa o tab clicado
  document.getElementById('menu-' + category).classList.add('active');
  event.target.classList.add('active');

  // Re-aciona as animações de reveal para os novos itens
  document.querySelectorAll('#menu-' + category + ' .reveal').forEach(el => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 50);
  });
}

/* ----------------------------------------
   REVEAL AO SCROLL — IntersectionObserver
   ---------------------------------------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----------------------------------------
   MENU MOBILE
   ---------------------------------------- */
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ----------------------------------------
   FORMULÁRIO DE CONTACTO
   ---------------------------------------- */
function submitForm() {
  const btn = document.querySelector('.btn-submit');
  btn.querySelector('span').textContent = 'Mensagem enviada!';
  btn.style.background = '#4A2908';

  setTimeout(() => {
    btn.querySelector('span').textContent = 'Enviar mensagem';
    btn.style.background = '';
  }, 3000);
}
