// ============================================================================
// DATOS DE PROYECTOS
// ============================================================================

const PROJECTS_DATA = {
    categories: [
        {
            id: 'casas',
            name: 'Construcción de Casas',
            icon: 'fas fa-home',
            description: 'Proyectos de construcción de viviendas dignas para familias en situación de vulnerabilidad.'
        },
        {
            id: 'alimentos',
            name: 'Operativo de Alimentos',
            icon: 'fas fa-utensils',
            description: 'Distribución de alimentos y víveres a comunidades en situación de inseguridad alimentaria.'
        },
        {
            id: 'camas',
            name: 'Entrega de Camas',
            icon: 'fas fa-bed',
            description: 'Entrega de camas y colchones a familias que duermen en el suelo o en condiciones precarias.'
        },
        {
            id: 'kermes',
            name: 'Kermés',
            icon: 'fas fa-gamepad',
            description: 'Eventos recreativos y de esparcimiento para niños y familias de comunidades vulnerables.'
        },
        {
            id: 'recreativa',
            name: 'Tarde recreativa con niños',
            icon: 'fas fa-child',
            description: 'Actividades lúdicas, educativas y recreativas para el desarrollo integral de niños.'
        }
    ],
    projects: []
};

// Generar proyectos
for (let i = 1; i <= 15; i++) {
    PROJECTS_DATA.projects.push({
        id: i,
        title: `Casa #${i.toString().padStart(2, '0')} - La Esperanza`,
        category: 'casas',
        location: `Sector ${i}, Santo Domingo Este`,
        date: `2023-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
        description: `Casa construida para una familia de ${i % 5 + 3} miembros. La vivienda anterior estaba en condiciones precarias y ahora cuenta con estructura segura y espacios dignos.`,
        images: {
            before: `https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=${i + 100}`,
            after: `https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=${i + 200}`,
            gallery: []
        },
        stats: {
            families: 1,
            people: i % 5 + 3,
            days: 30 + (i % 30),
            materials: ['Bloques', 'Cemento', 'Varillas', 'Techo', 'Puertas', 'Ventanas']
        },
        hasBeforeAfter: true
    });
}

const otherCategories = ['alimentos', 'camas', 'kermes', 'recreativa'];
const otherTitles = {
    alimentos: ['Entrega de víveres en Villa Mella', 'Despensa navideña', 'Apoyo alimentario post-inundaciones'],
    camas: ['Entrega de camas a adultos mayores', 'Camas para niños en situación de calle', 'Mobiliario para albergue'],
    kermes: ['Kermés día del niño', 'Feria comunitaria de salud', 'Evento recreativo barrial'],
    recreativa: ['Taller de pintura para niños', 'Juegos tradicionales', 'Actividad deportiva comunitaria']
};

let projectId = 16;
otherCategories.forEach(category => {
    for (let i = 0; i < 3; i++) {
        PROJECTS_DATA.projects.push({
            id: projectId++,
            title: otherTitles[category][i] || `${category} proyecto ${i+1}`,
            category: category,
            location: 'Varias localidades',
            date: `2023-${((projectId + i) % 12 + 1).toString().padStart(2, '0')}-${((projectId + i) % 28 + 1).toString().padStart(2, '0')}`,
            description: `Proyecto de ${PROJECTS_DATA.categories.find(c => c.id === category).name.toLowerCase()} que benefició a ${(projectId % 50) + 20} personas.`,
            images: {
                before: `https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=${projectId + 300}`,
                after: `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=${projectId + 400}`,
                gallery: []
            },
            stats: {
                families: Math.floor((projectId % 10) + 1),
                people: (projectId % 50) + 20,
                days: 1,
                materials: ['Materiales variados según proyecto']
            },
            hasBeforeAfter: i % 2 === 0
        });
    }
});

// CONFIGURACIÓN GLOBAL
const HERO_CONFIG = {
    images: [
        { 
            src: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
            alt: 'Familia recibiendo llaves de su nueva casa' 
        },
        { 
            src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
            alt: 'Voluntarios construyendo una casa' 
        },
        { 
            src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
            alt: 'Entrega de alimentos a familias necesitadas' 
        },
        { 
            src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
            alt: 'Niños jugando en una kermés comunitaria' 
        }
    ],
    transitionTime: 6000,
    fadeTime: 1000
};

const DONATION_AMOUNTS = [500, 1000, 2500, 5000];
const MIN_DONATION = 50;

export { PROJECTS_DATA, HERO_CONFIG, DONATION_AMOUNTS, MIN_DONATION };