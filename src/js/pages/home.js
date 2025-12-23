// ============================================================================
// FUNCIONES PARA LA PÁGINA DE INICIO
// ============================================================================

export function initScrollAnimations() {
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
        // Simular carga de más proyectos
        const loadMoreBtn = document.getElementById('loadMoreProjects');
        const originalText = loadMoreBtn.textContent;
        
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            // En un caso real, aquí se cargarían más proyectos desde una API
            loadMoreBtn.textContent = originalText;
            loadMoreBtn.disabled = false;
            
            showNotification('Se cargaron 3 proyectos más');
        }, 1500);
    });
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', () => {
        const megaDropdown = document.getElementById('megaDropdown');
        const obrasLink = document.getElementById('obrasLink');
        
        // Reiniciar estilos del mega dropdown al cambiar tamaño
        if (megaDropdown && obrasLink) {
            if (window.innerWidth > 768) {
                // Modo desktop
                obrasLink.setAttribute('aria-expanded', 'false');
                obrasLink.classList.remove('active');
                megaDropdown.classList.remove('open');
                megaDropdown.style.cssText = '';
            } else {
                // Modo móvil
                obrasLink.setAttribute('aria-expanded', 'false');
                obrasLink.classList.remove('active');
                megaDropdown.classList.remove('open');
                megaDropdown.style.maxHeight = '0';
                megaDropdown.style.overflowY = 'hidden';
            }
        }
    });
}

export function showNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: white;
        padding: 12px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
    
    // Agregar estilo para fadeOut
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}