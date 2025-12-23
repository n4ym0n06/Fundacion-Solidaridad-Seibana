# Fundación Solidaridad Seibana

Sitio web oficial de la Fundación Solidaridad Seibana - Organización sin fines de lucro dedicada a la construcción de viviendas y ayuda humanitaria en comunidades necesitadas.

## Estructura del Proyecto

fundacion-solidaridad-seibana/
│   README.md                    # Documentación principal
│
├───docs
│       documentation.md         # Esta documentación técnica
│
├───public
│       index.html               # Página principal HTML
│
└───src
    ├───assets
    │   └───images              # Recursos multimedia
    │           logo.png
    │           JM.png
    │           476092360_2422888868071932_7521579303721710678_n.jpg
    │           561318405_18021545162749726_4446628885319866297_n.jpg
    │           581257718_18102041557662608_2472287848266837343_n.jpg
    │           banreservas-920x500.webp
    │           AQMG20mqPMn_wqgJR1NQtQclJXDCJIb7zV2bLEuS1symHfqNAemHZsjQaL9dJLHseAKgwKqHL3lyfU-GHFfDUdWml2mBe0s9.mp4
    │           AQMs_9JgEdsJlpIST1Y6QuXlKQrjlZ9PFjx6uBl_QVejwq0vMZkqtp_faTM4UyAgdXcBzuBMPsdTlLKV77cRfKaqmWMjn07x.mp4
    │
    ├───css
    │   │   main.css                    # Archivo CSS principal
    │   │
    │   ├───base                        # Estilos base y fundamentales
    │   │       _variables.css          # Variables CSS globales
    │   │       _reset.css              # Reset CSS y estilos base
    │   │       _utilities.css          # Clases utilitarias
    │   │
    │   ├───components                  # Componentes reutilizables
    │   │       _navbar.css             # Navegación principal
    │   │       _hero.css               # Sección hero con slider
    │   │       _cards.css              # Tarjetas (equipo, proyectos)
    │   │       _modal.css              # Ventanas modales
    │   │       _preloader.css          # Pantalla de carga inicial
    │   │       _footer.css             # Pie de página
    │   │
    │   └───pages                       # Estilos específicos por sección
    │           _mission.css            # Sección Misión
    │           _team.css               # Sección Equipo
    │           _projects.css           # Sección Obras Realizadas
    │           _gallery.css            # Sección Galería
    │           _donation.css           # Sección Donaciones
    │           _advice.css             # Sección Asesoría
    │           _contact.css            # Sección Contacto
    │
    ├───data                           # Datos y configuración
    │       projects.js                # Datos de proyectos y configuración
    │
    └───js
        │   main.js                    # Punto de entrada JavaScript
        │
        ├───components                 # Componentes JavaScript modulares
        │       preloader.js           # Control del preloader
        │       navigations.js         # Navegación y menús
        │       hero-slider.js         # Slider automático del hero
        │       projects.js            # Gestión de proyectos y filtros
        │       modal.js               # Control de ventanas modales
        │       donation.js            # Sistema de donaciones
        │
        └───pages                      # Lógica específica de páginas
                home.js                # Funciones generales de la página
                contact.js             # Formularios de contacto


## Características

- Diseño responsive y moderno
- Navegación con mega dropdown para obras realizadas
- Slider automático en la sección hero
- Galería de proyectos con filtros por categoría
- Sistema de donaciones con múltiples opciones
- Formularios de contacto validados
- Modales interactivos para detalles de proyectos
- Preloader animado
- Botón para volver arriba

## Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables CSS y Grid/Flexbox
- JavaScript ES6+ (módulos)
- Font Awesome para iconos
- Google Fonts (Montserrat y Open Sans)

## Instalación y Uso

# Opción 1: Clonar el proyecto con Git (recomendado)

- Asegúrate de tener Git instalado

git --version


- Clona el repositorio desde GitHub

git clone https://github.com/TU_USUARIO/fundacion-solidaridad-seibana.git


- Entra a la carpeta del proyecto

cd fundacion-solidaridad-seibana


- Abre el archivo principal en tu navegador

public/index.html


- No se requiere servidor, compilación ni dependencias adicionales.

# Opción 2: Descargar desde GitHub (sin Git)

- Ve al repositorio en GitHub.

- Haz clic en Code → Download ZIP.

- Extrae el archivo ZIP en tu computadora.

- Abre el archivo:

public/index.html


- El sitio funcionará directamente en el navegador.

Uso en Desarrollo (opcional)

# Para una mejor experiencia durante el desarrollo se recomienda usar un servidor local como Live Server en VS Code:

- Abre el proyecto en VS Code.

- Instala la extensión Live Server.

- Haz clic derecho en public/index.html.

- Selecciona Open with Live Server.

## Información de Contacto

- **Email:** juanmanuelfebles@gmail.com  
- **Teléfono:** +1 (809) 123-4567  
- **Dirección:** Calle Solidaridad #123, Colonia Seibana, República Dominicana

## Licencia

© 2025 Fundación Solidaridad Seibana. Todos los derechos reservados.
EOF


