// ============================================================================
// FUNCIONES PARA LA PÁGINA DE INICIO
// ============================================================================

export function initScrollAnimations() {
    console.log('🎬 Inicializando animaciones de scroll...');
    
    // Agregar clase a elementos animables
    document.querySelectorAll('.project-card, .stat-box, .contact-item, .donation-benefits li, .team-card, .gallery-item, .info-item').forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    // Observar elementos
    observeElements();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

export function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

export function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

export function setupGlobalEvents() {
    // Cargar más proyectos
    document.getElementById('loadMoreProjects')?.addEventListener('click', () => {
        const loadMoreBtn = document.getElementById('loadMoreProjects');
        const originalText = loadMoreBtn.textContent;
        
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.textContent = originalText;
            loadMoreBtn.disabled = false;
        }, 1500);
    });
}