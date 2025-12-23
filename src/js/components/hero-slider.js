// ============================================================================
// HERO SLIDER
// ============================================================================

import { HERO_CONFIG } from '../../data/projects.js';

let heroSliderInterval = null;
let currentSlide = 0;

export function initHeroSlider() {
    const heroSlider = document.getElementById('heroSlider');
    const indicatorsContainer = document.querySelector('.hero-indicators');
    
    // Limpiar slides existentes
    heroSlider.innerHTML = '';
    
    // Crear slides
    HERO_CONFIG.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${image.src}')`;
        slide.setAttribute('role', 'img');
        slide.setAttribute('aria-label', image.alt);
        
        const overlay = document.createElement('div');
        overlay.className = 'slide-overlay';
        slide.appendChild(overlay);
        
        heroSlider.appendChild(slide);
    });
    
    // Crear indicadores
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        HERO_CONFIG.images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', index);
            indicator.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
            indicator.setAttribute('type', 'button');
            
            indicator.addEventListener('click', () => goToSlide(index));
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Iniciar slider
    startHeroSlider();
    
    // Pausar al interactuar
    heroSlider.addEventListener('mouseenter', pauseHeroSlider);
    heroSlider.addEventListener('mouseleave', startHeroSlider);
    heroSlider.addEventListener('focusin', pauseHeroSlider);
    heroSlider.addEventListener('focusout', startHeroSlider);
}

function startHeroSlider() {
    if (heroSliderInterval) clearInterval(heroSliderInterval);
    
    heroSliderInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % HERO_CONFIG.images.length;
        goToSlide(nextSlide);
    }, HERO_CONFIG.transitionTime);
}

function pauseHeroSlider() {
    if (heroSliderInterval) {
        clearInterval(heroSliderInterval);
        heroSliderInterval = null;
    }
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slideIndex < 0 || slideIndex >= slides.length) return;
    
    // Remover clase active
    slides[currentSlide]?.classList.remove('active');
    indicators[currentSlide]?.classList.remove('active');
    
    // Actualizar slide
    currentSlide = slideIndex;
    
    // Agregar clase active
    slides[currentSlide]?.classList.add('active');
    indicators[currentSlide]?.classList.add('active');
    
    // Reiniciar si estaba pausado
    if (!heroSliderInterval && !document.querySelector('.hero-slider:hover')) {
        startHeroSlider();
    }
}