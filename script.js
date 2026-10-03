const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.nav nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menu?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.gallery-grid .g').forEach(card => {
  card.addEventListener('click', () => {
    const style = getComputedStyle(card);
    lightboxImage.style.backgroundImage = style.backgroundImage;
    lightboxTitle.textContent = card.dataset.title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

const formButton = document.getElementById('whatsappForm');
formButton?.addEventListener('click', () => {
  const occasion = document.getElementById('occasion').value;
  const date = document.getElementById('eventDate').value;
  const note = document.getElementById('eventNote').value.trim();
  const dateText = date ? new Date(`${date}T12:00:00`).toLocaleDateString('en-NG', {day:'numeric', month:'long', year:'numeric'}) : 'not decided yet';
  const message = `Hello Temhy Events & Surprise! 👋\n\nI'd like to enquire about ${occasion}.\nPreferred date: ${dateText}.\n${note ? `\nMy idea/details: ${note}` : ''}\n\nPlease let me know how we can plan it.`;
  window.open(`https://wa.me/2348163254682?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
