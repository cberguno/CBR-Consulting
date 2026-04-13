// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Navbar scroll shadow =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 24px rgba(10,35,66,0.25)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(10,35,66,0.15)';
  }
});

// ===== Contact form =====
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.className = 'form-status error';
    return;
  }

  if (!isValidEmail(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.className = 'form-status error';
    return;
  }

  // Simulate submission (replace with real API call when backend is ready)
  formStatus.textContent = 'Sending...';
  formStatus.className = 'form-status';

  setTimeout(() => {
    form.reset();
    formStatus.textContent = "Thanks! We'll be in touch within one business day.";
    formStatus.className = 'form-status success';
  }, 800);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
