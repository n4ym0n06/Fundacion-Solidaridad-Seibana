// ============================================================================
// SISTEMA DE ANIMACIONES - CONTROL CENTRALIZADO
// ============================================================================

class AnimationSystem {
    constructor() {
        this.initialized = false;
        this.observer = null;
        this.scrollElements = new Set();
        console.log('🎬 Sistema de animaciones inicializado');
    }
    
    // ========== INICIALIZACIÓN PRINCIPAL ==========
    init() {
        if (this.initialized) {
            console.warn('⚠️ Sistema de animaciones ya inicializado');
            return;
        }
        
        console.log('🚀 Inicializando sistema de animaciones...');
        
        // 1. Configurar observador de scroll
        this.setupScrollObserver();
        
        // 2. Animar elementos que ya están visibles
        this.animateVisibleElements();
        
        // 3. Configurar eventos globales
        this.setupGlobalEvents();
        
        // 4. Marcar como inicializado
        this.initialized = true;
        
        console.log('✅ Sistema de animaciones listo');
    }
    
    // ========== ANIMACIONES DE SCROLL ==========
    setupScrollObserver() {
        console.log('👀 Configurando observador de scroll...');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Encontrar todos los elementos a animar
        const elements = document.querySelectorAll('[data-scroll-animate], .scroll-animate');
        console.log(`🔍 Encontrados ${elements.length} elementos para animar al scroll`);
        
        elements.forEach(element => {
            this.observer.observe(element);
            this.scrollElements.add(element);
        });
    }
    
    animateElement(element) {
        // Determinar tipo de animación
        const animationType = element.getAttribute('data-scroll-animate') || 'fade-up';
        
        // Agregar clase animada
        element.classList.add('animated');
        
        // Aplicar animación específica
        switch(animationType) {
            case 'fade-up':
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                break;
            case 'fade-down':
                element.style.animation = 'fadeInDown 0.8s ease forwards';
                break;
            case 'fade-left':
                element.style.animation = 'fadeInLeft 0.8s ease forwards';
                break;
            case 'fade-right':
                element.style.animation = 'fadeInRight 0.8s ease forwards';
                break;
            case 'zoom':
                element.style.animation = 'zoomIn 0.8s ease forwards';
                break;
            default:
                element.style.animation = 'fadeInUp 0.8s ease forwards';
        }
        
        console.log(`🎯 Animando elemento:`, element.className);
    }
    
    // ========== ANIMACIONES INICIALES ==========
    animateVisibleElements() {
        console.log('✨ Animando elementos visibles inicialmente...');
        
        // Animaciones del hero
        this.animateHero();
        
        // Animaciones de entrada
        this.animateEntranceElements();
        
        // Animaciones de tarjetas
        this.animateCards();
    }
    
    animateHero() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('animated');
                console.log('🌟 Hero animado');
            }, 300);
        }
        
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('animate-fade-in-up');
            console.log('🌟 Título del hero animado');
        }
        
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            setTimeout(() => {
                heroButtons.classList.add('animate-fade-in-up');
                heroButtons.style.animationDelay = '0.5s';
            }, 500);
        }
    }
    
    animateEntranceElements() {
        // Elementos con clases de animación específicas
        const fadeInElements = document.querySelectorAll('.fade-in');
        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        const slideRightElements = document.querySelectorAll('.slide-in-right');
        
        // Animar con delays escalonados
        fadeInElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeIn 0.8s ease forwards`;
                el.style.opacity = '1';
            }, index * 100);
        });
        
        slideLeftElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInLeft 0.8s ease forwards`;
                el.style.opacity = '1';
            }, index * 100 + 200);
        });
        
        slideRightElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInRight 0.8s ease forwards`;
                el.style.opacity = '1';
            }, index * 100 + 200);
        });
        
        console.log(`🎭 Animados ${fadeInElements.length + slideLeftElements.length + slideRightElements.length} elementos de entrada`);
    }
    
    animateCards() {
        const teamCards = document.querySelectorAll('.team-card');
        const projectCards = document.querySelectorAll('.project-card');
        
        teamCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        });
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        });
    }
    
    // ========== ANIMACIONES DE HOVER ==========
    setupHoverAnimations() {
        console.log('🔄 Configurando animaciones hover...');
        
        // Tarjetas
        document.querySelectorAll('.team-card, .project-card, .gallery-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
                btn.style.transition = 'all 0.3s ease';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ========== CONTROL DEL PRELOADER ==========
    setupPreloader() {
        console.log('🌀 Configurando preloader...');
        
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        const hidePreloader = () => {
            console.log('👋 Ocultando preloader...');
            
            // Agregar clase para animar la salida
            preloader.classList.add('hiding');
            
            // Esperar a que termine la animación
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                console.log('✅ Preloader ocultado, body marcado como loaded');
                
                // Iniciar animaciones después de quitar preloader
                this.animateVisibleElements();
                this.setupHoverAnimations();
            }, 800);
        };
        
        // Ocultar cuando todo cargue
        window.addEventListener('load', hidePreloader);
        
        // Timeout de seguridad
        setTimeout(hidePreloader, 3000);
    }
    
    // ========== EVENTOS GLOBALES ==========
    setupGlobalEvents() {
        console.log('🌐 Configurando eventos globales...');
        
        // Reiniciar animaciones al redimensionar
        window.addEventListener('resize', () => {
            this.animateVisibleElements();
        });
        
        // Forzar animaciones si hay problemas
        window.addEventListener('error', () => {
            console.warn('⚠️ Error detectado, forzando animaciones...');
            this.forceAnimations();
        });
    }
    
    // ========== UTILIDADES ==========
    forceAnimations() {
        console.log('🔧 Forzando todas las animaciones...');
        
        // Forzar preloader
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
        
        document.body.classList.add('loaded');
        
        // Forzar animaciones de todos los elementos
        document.querySelectorAll('[data-scroll-animate], .scroll-animate, .fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.add('animated');
        });
        
        console.log('✅ Animaciones forzadas');
    }
    
    pauseAll() {
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation || el.classList.contains('animate-')) {
                el.style.animationPlayState = 'paused';
            }
        });
    }
    
    resumeAll() {
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation || el.classList.contains('animate-')) {
                el.style.animationPlayState = 'running';
            }
        });
    }
    
    // ========== ANIMACIONES ESPECÍFICAS ==========
    animateHeroSlider() {
        const slider = document.getElementById('heroSlider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                slide.style.animation = 'fadeIn 1s ease forwards';
            });
        };
        
        // Rotación automática
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Mostrar primera slide
        showSlide(0);
    }
    
    animateModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('active');
        modal.style.animation = 'fadeIn 0.3s ease forwards';
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.animation = 'fadeIn 0.3s ease reverse forwards';
        
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    }
}

// ========== EXPORTACIÓN E INICIALIZACIÓN GLOBAL ==========
const animationSystem = new AnimationSystem();

// Exportar funciones principales
export function initAnimations() {
    animationSystem.init();
}

export function setupPreloaderAnimations() {
    animationSystem.setupPreloader();
}

export function animateHeroSlider() {
    animationSystem.animateHeroSlider();
}

export function forceAllAnimations() {
    animationSystem.forceAnimations();
}

// Inicializar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupPreloaderAnimations();
});

// Hacer disponible globalmente para debugging
window.AnimationSystem = animationSystem;
window.forceAnimations = forceAllAnimations;

console.log('🎬 Sistema de animaciones cargado');