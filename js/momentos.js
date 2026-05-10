// =====================
// Flores flotantes fondo
// =====================
const container = document.getElementById('bgFlowers');
const symbols = ['🌸', '✦', '✧', '🌷', '💕', '☆'];

for (let i = 0; i < 28; i++) {
  const span = document.createElement('span');
  span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  span.style.left = Math.random() * 100 + 'vw';
  span.style.animationDuration = (10 + Math.random() * 16) + 's';
  span.style.animationDelay = (Math.random() * 14) + 's';
  span.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
  container.appendChild(span);
}

// =====================
// Scroll reveal polaroids
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = `translateY(0) rotate(${entry.target.style.getPropertyValue('--rot') || '0deg'})`;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.polaroid, .big-polaroid').forEach(el => {
  observer.observe(el);
});