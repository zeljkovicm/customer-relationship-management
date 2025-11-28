import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.css'

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle') as HTMLInputElement | null;
  if (!themeToggle) {
    return; // ako element još nije u DOM-u, samo izađi
  }

  // Učitaj prethodno sačuvanu temu ili podrazumevano 'light'
  const savedTheme =
    (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'light';

  // Primeni temu na <html> (documentElement)
  document.documentElement.setAttribute('data-bs-theme', savedTheme);

  // Podesi stanje checkbox-a prema sačuvanoj temi
  themeToggle.checked = savedTheme === 'dark';

  // Reaguj na promenu
  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';

    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Kada je DOM spreman, poveži toggle
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
});