import './styles.css';
import { initHomePage, initSearch } from './components/homePage.js';

// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Bootstrap the app
const bootstrap = async () => {
  initSearch();
  await initHomePage();
};

bootstrap();
