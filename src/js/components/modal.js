// ============================================================================
// MODALES
// ============================================================================

import { getProjects } from './projects.js';

export function initModals() {
    // Modal de proyecto
    const projectModal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    if (projectModal && modalOverlay && modalClose) {
        modalOverlay.addEventListener('click', closeProjectModal);
        modalClose.addEventListener('click', closeProjectModal);
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        });
        
        // Prevenir cierre al hacer clic dentro
        projectModal.querySelector('.modal-container')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Modal de donación
    const donationModal = document.getElementById('donationModal');
    const donationModalOverlay = document.getElementById('donationModalOverlay');
    const donationModalClose = document.getElementById('donationModalClose');
    const closeDonationModalBtn = document.getElementById('closeDonationModal');
    
    if (donationModal && donationModalOverlay && donationModalClose && closeDonationModalBtn) {
        [donationModalOverlay, donationModalClose, closeDonationModalBtn].forEach(element => {
            element.addEventListener('click', closeDonationModal);
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && donationModal.classList.contains('active')) {
                closeDonationModal();
            }
        });
        
        // Imprimir resumen
        document.getElementById('printSummary')?.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Escuchar eventos para abrir modales
    window.addEventListener('openProjectModal', (e) => {
        openProjectModal(e.detail.projectId);
    });
}

export function openProjectModal(projectId) {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const categories = [
        { id: 'casas', name: 'Construcción de Casas' },
        { id: 'alimentos', name: 'Operativo de Alimentos' },
        { id: 'camas', name: 'Entrega de Camas' },
        { id: 'kermes', name: 'Kermés' },
        { id: 'recreativa', name: 'Tarde recreativa con niños' }
    ];
    
    const category = categories.find(c => c.id === project.category);
    const modalContent = document.getElementById('modalContent');
    const projectModal = document.getElementById('projectModal');
    
    if (!modalContent || !projectModal) return;
    
    // Construir contenido
    let beforeAfterHTML = '';
    if (project.hasBeforeAfter) {
        beforeAfterHTML = `
            <div class="before-after-slider" id="beforeAfterSlider-${project.id}">
                <div class="before-image">
                    <img src="${project.images.before}" alt="${project.title} - Antes" loading="lazy">
                    <div class="slider-label before-label">Antes</div>
                </div>
                <div class="after-image">
                    <img src="${project.images.after}" alt="${project.title} - Después" loading="lazy">
                    <div class="slider-label after-label">Después</div>
                </div>
                <div class="slider-handle"></div>
            </div>
        `;
    }
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">
                <span class="project-category">${category?.name || project.category}</span> | 
                <i class="fas fa-map-marker-alt"></i> ${project.location} | 
                <i class="fas fa-calendar-alt"></i> ${project.date}
            </p>
        </div>
        
        <div class="modal-body">
            ${beforeAfterHTML}
            
            <div class="project-details">
                <div class="detail-item">
                    <h4>Problema identificado</h4>
                    <p>La familia vivía en condiciones precarias, con riesgo de derrumbe y sin servicios básicos adecuados.</p>
                </div>
                
                <div class="detail-item">
                    <h4>Nuestra intervención</h4>
                    <p>${project.description}</p>
                    <ul>
                        <li>Construcción de estructura segura y resistente</li>
                        <li>Instalación de techo, puertas y ventanas</li>
                        <li>Conexión a servicios básicos (agua, electricidad)</li>
                        <li>Entrega de mobiliario básico</li>
                    </ul>
                </div>
                
                <div class="detail-item">
                    <h4>Materiales utilizados</h4>
                    <ul>
                        ${project.stats.materials.map(material => `<li>${material}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="project-impact">
                <h3 class="impact-title">Impacto del proyecto</h3>
                <div class="impact-stats">
                    <div class="stat-box">
                        <span class="stat-number">${project.stats.families}</span>
                        <span class="stat-label">Familias beneficiadas</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${project.stats.people}</span>
                        <span class="stat-label">Personas impactadas</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${project.stats.days}</span>
                        <span class="stat-label">Días de trabajo</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${project.date}</span>
                        <span class="stat-label">Fecha de entrega</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <button class="btn btn-secondary" id="closeModalBtn">Cerrar</button>
            <button class="btn btn-primary" onclick="location.href='#donaciones'">Donar para más proyectos</button>
        </div>
    `;
    
    // Mostrar modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Inicializar slider si existe
    if (project.hasBeforeAfter) {
        initBeforeAfterSlider(`beforeAfterSlider-${project.id}`);
    }
    
    // Agregar evento al botón cerrar
    document.getElementById('closeModalBtn')?.addEventListener('click', closeProjectModal);
    
    // Enfocar el modal
    projectModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        projectModal.focus();
    }, 100);
}

export function closeProjectModal() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        projectModal.setAttribute('aria-hidden', 'true');
    }
}

function initBeforeAfterSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const handle = slider.querySelector('.slider-handle');
    const afterImage = slider.querySelector('.after-image');
    
    if (!handle || !afterImage) return;
    
    let isDragging = false;
    let startX = 0;
    let startWidth = 50;
    
    function updateSliderPosition(clientX) {
        const sliderRect = slider.getBoundingClientRect();
        let position = ((clientX - sliderRect.left) / sliderRect.width) * 100;
        position = Math.max(0, Math.min(100, position));
        
        afterImage.style.width = `${position}%`;
        handle.style.left = `${position}%`;
        handle.setAttribute('aria-valuenow', position);
    }
    
    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startWidth = parseFloat(afterImage.style.width) || 50;
        document.body.style.cursor = 'ew-resize';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = '';
    });
    
    // Touch events
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches[0]) {
            startX = e.touches[0].clientX;
        }
        startWidth = parseFloat(afterImage.style.width) || 50;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches[0]) return;
        updateSliderPosition(e.touches[0].clientX);
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Keyboard accessibility
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');
    handle.setAttribute('aria-label', 'Control deslizante para comparar imágenes antes y después');
    
    handle.addEventListener('keydown', (e) => {
        let newValue = parseFloat(afterImage.style.width) || 50;
        
        switch (e.key) {
            case 'ArrowLeft':
                newValue = Math.max(0, newValue - 5);
                break;
            case 'ArrowRight':
                newValue = Math.min(100, newValue + 5);
                break;
            case 'Home':
                newValue = 0;
                break;
            case 'End':
                newValue = 100;
                break;
            default:
                return;
        }
        
        e.preventDefault();
        afterImage.style.width = `${newValue}%`;
        handle.style.left = `${newValue}%`;
        handle.setAttribute('aria-valuenow', newValue);
    });
    
    // Inicializar en 50%
    afterImage.style.width = '50%';
    handle.style.left = '50%';
}

export function openDonationModal() {
    const donationModal = document.getElementById('donationModal');
    if (!donationModal) return;
    
    // Mostrar modal
    donationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    donationModal.setAttribute('aria-hidden', 'false');
    
    setTimeout(() => {
        donationModal.focus();
    }, 100);
}

export function closeDonationModal() {
    const donationModal = document.getElementById('donationModal');
    if (donationModal) {
        donationModal.classList.remove('active');
        document.body.style.overflow = '';
        donationModal.setAttribute('aria-hidden', 'true');
    }
}