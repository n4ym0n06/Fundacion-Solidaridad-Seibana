// ============================================================================
// PROYECTOS Y CATEGORÍAS
// ============================================================================

import { PROJECTS_DATA } from '../../data/projects.js';

let appState = {
    currentCategory: 'all',
    projects: PROJECTS_DATA.projects,
    filteredProjects: [],
    categories: PROJECTS_DATA.categories
};

export function initCategoriesDropdown() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    const projectsPreview = document.getElementById('projectsPreview');
    
    if (!categoriesContainer || !projectsPreview) return;
    
    // Limpiar contenedores
    categoriesContainer.innerHTML = '';
    projectsPreview.innerHTML = '';
    
    // Crear botones de categorías
    appState.categories.forEach((category, index) => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = `category-btn ${index === 0 ? 'active' : ''}`;
        categoryBtn.setAttribute('data-category', category.id);
        categoryBtn.setAttribute('aria-label', `Ver proyectos de ${category.name}`);
        categoryBtn.innerHTML = `
            <i class="${category.icon} category-icon"></i>
            <span>${category.name}</span>
        `;
        
        categoryBtn.addEventListener('click', () => {
            filterProjectsByCategory(category.id);
            updateProjectsPreview(category.id);
            
            // Marcar como activo
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            categoryBtn.classList.add('active');
        });
        
        categoryBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                categoryBtn.click();
            }
        });
        
        categoriesContainer.appendChild(categoryBtn);
    });
    
    // Cargar vista previa inicial
    updateProjectsPreview('all');
}

export function initProjectsGrid() {
    filterProjectsByCategory('all');
}

export function initCategoryFilters() {
    const categoryFilters = document.getElementById('categoryFilters');
    if (!categoryFilters) return;
    
    // Limpiar filtros
    categoryFilters.innerHTML = '';
    
    // Botón "Todos"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Todos los proyectos';
    allBtn.setAttribute('data-category', 'all');
    allBtn.setAttribute('aria-label', 'Mostrar todos los proyectos');
    allBtn.setAttribute('aria-pressed', 'true');
    
    allBtn.addEventListener('click', () => {
        filterProjectsByCategory('all');
        updateActiveFilter('all');
    });
    
    categoryFilters.appendChild(allBtn);
    
    // Botones por categoría
    appState.categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.textContent = category.name;
        filterBtn.setAttribute('data-category', category.id);
        filterBtn.setAttribute('aria-label', `Filtrar proyectos de ${category.name}`);
        filterBtn.setAttribute('aria-pressed', 'false');
        
        filterBtn.addEventListener('click', () => {
            filterProjectsByCategory(category.id);
            updateActiveFilter(category.id);
        });
        
        categoryFilters.appendChild(filterBtn);
    });
}

function updateActiveFilter(categoryId) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-category') === categoryId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });
}

function filterProjectsByCategory(categoryId) {
    appState.currentCategory = categoryId;
    
    if (categoryId === 'all') {
        appState.filteredProjects = [...appState.projects];
    } else {
        appState.filteredProjects = appState.projects.filter(project => project.category === categoryId);
    }
    
    renderProjectsGrid();
}

function renderProjectsGrid() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    if (appState.filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-inbox" style="font-size: 60px; color: var(--color-gray); margin-bottom: 20px;"></i>
                <h3 style="color: var(--color-gray-dark); margin-bottom: 10px;">No hay proyectos en esta categoría</h3>
                <p style="color: var(--color-gray);">Prueba con otra categoría o vuelve más tarde.</p>
            </div>
        `;
        return;
    }
    
    appState.filteredProjects.forEach(project => {
        const category = appState.categories.find(c => c.id === project.category);
        let badgeHTML = '';
        
        if (project.hasBeforeAfter) {
            badgeHTML = '<span class="badge after">Después</span>';
        } else if (project.category === 'alimentos') {
            badgeHTML = '<span class="badge" style="background-color: #17a2b8;">Alimentos</span>';
        } else if (project.category === 'camas') {
            badgeHTML = '<span class="badge" style="background-color: #6f42c1;">Camas</span>';
        }
        
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card scroll-animate';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.images.before}" alt="${project.title}" loading="lazy">
                <div class="project-badge">${badgeHTML}</div>
            </div>
            <div class="project-content">
                <span class="project-category">${category?.name || project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${project.date}</span>
                </div>
                <p class="project-description">${project.description.substring(0, 120)}...</p>
                <div class="project-actions">
                    <button class="btn btn-primary view-project-btn" data-project-id="${project.id}">
                        Ver más detalles
                    </button>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Agregar eventos a los botones
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            window.dispatchEvent(new CustomEvent('openProjectModal', { detail: { projectId } }));
        });
    });
}

function updateProjectsPreview(categoryId) {
    const projectsPreview = document.getElementById('projectsPreview');
    if (!projectsPreview) return;
    
    // Filtrar proyectos
    let previewProjects = appState.projects;
    if (categoryId !== 'all') {
        previewProjects = appState.projects.filter(project => project.category === categoryId);
    }
    
    // Limitar a 6 proyectos
    previewProjects = previewProjects.slice(0, 6);
    
    // Limpiar contenedor
    projectsPreview.innerHTML = '';
    
    // Crear tarjetas de vista previa
    previewProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-preview';
        projectCard.setAttribute('data-project-id', project.id);
        projectCard.setAttribute('role', 'button');
        projectCard.setAttribute('tabindex', '0');
        projectCard.setAttribute('aria-label', `Ver detalles de ${project.title}`);
        
        projectCard.innerHTML = `
            <div class="preview-image">
                <img src="${project.images.before}" alt="${project.title}" loading="lazy">
            </div>
            <div class="preview-content">
                <h4 class="preview-title">${project.title}</h4>
                <div class="preview-meta">
                    <span>${project.date}</span>
                    ${project.hasBeforeAfter ? '<span class="badge before">Antes</span>' : ''}
                </div>
            </div>
        `;
        
        projectCard.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('openProjectModal', { detail: { projectId: project.id } }));
            window.dispatchEvent(new CustomEvent('closeAllDropdowns'));
        });
        
        projectCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                projectCard.click();
            }
        });
        
        projectsPreview.appendChild(projectCard);
    });
}

export function getProjects() {
    return appState.projects;
}