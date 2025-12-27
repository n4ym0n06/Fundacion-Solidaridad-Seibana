// ============================================================================
// ARCHIVO PRINCIPAL DE JAVASCRIPT
// ============================================================================

// Importar componentes
import { initPreloader } from './components/preloader.js';
import { initNavigation } from './components/navigations.js';
import { initHeroSlider } from './components/hero-slider.js';
import { initCategoriesDropdown, initProjectsGrid, initCategoryFilters } from './components/projects.js';
import { initModals } from './components/modal.js';
import { initDonationWidget } from './components/donation.js';
import { initContactForms } from './pages/contact.js';
import { initScrollAnimations, initBackToTop, updateActiveNavigation, setupGlobalEvents } from './pages/home.js';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando aplicación...');
    
    // Inicializar componentes
    initPreloader();
    initNavigation();
    initHeroSlider();
    initCategoriesDropdown();
    initProjectsGrid();
    initCategoryFilters();
    initDonationWidget();
    initModals();
    initContactForms();
    initScrollAnimations();
    initBackToTop();
    
    // Configurar eventos globales
    setupGlobalEvents();
    
    // Actualizar navegación activa
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Marcar como cargada
    setTimeout(() => {
        document.body.classList.add('loaded');
        updateActiveNavigation(); // Actualizar navegación inicial
    }, 100);
});

// Manejar carga completa
window.addEventListener('load', () => {
    console.log('✅ Aplicación completamente cargada y optimizada');
    
    // Optimización para móviles
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});