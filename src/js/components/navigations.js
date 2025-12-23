// ============================================================================
// NAVEGACIÓN MODIFICADA - OBRAS REALIZADAS COMO DROPDOWN/ANCLA
// ============================================================================

let appState = {
    isMobileMenuOpen: false
};

function closeAllDropdowns() {
    document.querySelectorAll('.mega-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.dropdown-btn[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
}

export function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const obrasLink = document.getElementById('obrasLink');
    const megaDropdown = document.getElementById('megaDropdown');
    const obrasDropdownLi = document.getElementById('obrasDropdown');
    
    // Menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            appState.isMobileMenuOpen = !appState.isMobileMenuOpen;
            this.setAttribute('aria-expanded', appState.isMobileMenuOpen);
            navMenu.classList.toggle('active');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Bloquear scroll
            document.body.style.overflow = appState.isMobileMenuOpen ? 'hidden' : '';
            
            // Cerrar mega dropdown cuando se cierra el menú móvil
            if (!appState.isMobileMenuOpen && megaDropdown) {
                obrasLink.setAttribute('aria-expanded', 'false');
                megaDropdown.classList.remove('open');
                megaDropdown.style.maxHeight = '0';
            }
        });
    }
    
    // Mega dropdown para Obras Realizadas
    if (obrasLink && megaDropdown && obrasDropdownLi) {
        // Toggle en desktop (hover mantiene open por CSS) — aquí solo manejamos el click inteligente
        obrasLink.addEventListener('click', function(e) {
            const isDesktop = window.innerWidth > 992;
            if (isDesktop) {
                // evitar navegación inmediata si el usuario quería ver el dropdown con click
                e.preventDefault();
                const isOpen = megaDropdown.classList.toggle('open');
                obrasLink.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                if (!isOpen) {
                    // si cerró, no navegamos
                    closeAllDropdowns();
                } else {
                    // mantener abierto, focus para accesibilidad
                    megaDropdown.querySelector('.dropdown-categories')?.focus();
                }
                return;
            }
            // en móvil, permitir que el href funcione como ancla (no preventDefault)
            // pero también queremos abrir/cerrar el dropdown en móvil
            const isOpen = megaDropdown.classList.toggle('open');
            obrasLink.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            // No hacemos preventDefault para que también navegue al ancla
        });
        
        // Cerrar con click fuera
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!obrasDropdownLi.contains(target)) {
                closeAllDropdowns();
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });
        
        // En hover (desktop) dejamos que el CSS abra; también para tocar focus por teclado
        obrasDropdownLi.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) {
                megaDropdown.classList.add('open');
                obrasLink.setAttribute('aria-expanded','true');
            }
        });
        obrasDropdownLi.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
                megaDropdown.classList.remove('open');
                obrasLink.setAttribute('aria-expanded','false');
            }
        });
    }
    
    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.closest('.obras-dropdown')) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && appState.isMobileMenuOpen) {
                    mobileMenuBtn.click();
                }
                closeAllDropdowns();
            });
        }
    });
    
    // Ver todas las obras
    document.getElementById('viewAllProjects')?.addEventListener('click', function(e) {
        e.preventDefault();
        closeAllDropdowns();
        document.getElementById('obras')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                if (appState.isMobileMenuOpen) {
                    mobileMenuBtn.click();
                }
                
                // Desplazamiento suave
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Configurar efectos de scroll en navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efecto de scroll
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

export function getAppState() {
    return appState;
}