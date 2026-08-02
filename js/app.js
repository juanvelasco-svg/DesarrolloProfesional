// YouthDev 2026 - Simplified Participant Version

// State management
const state = {
    currentPage: 'intro',
    personalData: { name: '', age: '' },
    goals: {
        lifeGoals: '',
        roles: [],
        passions: '',
        competencies: [],
        personalGoals: ''
    },
    testResults: {},
    recommendations: []
};

// Roles and Competencies data
const roles = [
    'Líder', 'Comunicador', 'Innovador', 'Organizador', 
    'Creativo', 'Analítico', 'Emprendedor', 'Colaborador'
];

const competencies = [
    { id: 'comunicacion', name: 'Comunicación' },
    { id: 'trabajo_equipo', name: 'Trabajo en Equipo' },
    { id: 'resolucion_problemas', name: 'Resolución de Problemas' },
    { id: 'pensamiento_critico', name: 'Pensamiento Crítico' },
    { id: 'liderazgo', name: 'Liderazgo' },
    { id: 'adaptabilidad', name: 'Adaptabilidad' },
    { id: 'gestion_tiempo', name: 'Gestión del Tiempo' },
    { id: 'creatividad', name: 'Creatividad' }
];

// Quiz questions for each competency
const quizQuestions = [
    {
        competency: 'comunicacion',
        questions: [
            { text: 'Me expreso claramente al hablar con otros', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Escucho activamente cuando otros hablan', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Puedo explicar ideas complejas de forma simple', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'trabajo_equipo',
        questions: [
            { text: 'Disfruto trabajando en grupo', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Contribuyo equitativamente en trabajos grupales', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Ayudo a mis compañeros cuando lo necesitan', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'resolucion_problemas',
        questions: [
            { text: 'Analizo los problemas antes de actuar', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Busco múltiples soluciones ante un desafío', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Mantengo la calma bajo presión', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'pensamiento_critico',
        questions: [
            { text: 'Cuestiono la información antes de aceptarla', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Evalúo diferentes perspectivas antes de decidir', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Identifico errores en razonamientos lógicos', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'liderazgo',
        questions: [
            { text: 'Tomo iniciativa en proyectos grupales', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Motivo a otros a alcanzar sus metas', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Asumo responsabilidad por decisiones del grupo', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'adaptabilidad',
        questions: [
            { text: 'Me ajusto fácilmente a cambios inesperados', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Aprendo rápidamente nuevas habilidades', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Manejo bien la incertidumbre', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'gestion_tiempo',
        questions: [
            { text: 'Planifico mi tiempo eficazmente', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Cumpló con los plazos establecidos', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Priorizo tareas importantes sobre urgentes', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    },
    {
        competency: 'creatividad',
        questions: [
            { text: 'Genero ideas originales con facilidad', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Encuentro soluciones innovadoras a problemas', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
            { text: 'Disfruto explorando nuevas posibilidades', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] }
        ]
    }
];

// Recommendations database - Complete information from original version
const recommendationsDB = {
    comunicacion: {
        webs: [
            { name: 'Harvard Online - edX', url: 'https://harvardonline.harvard.edu/program/leadership-and-communication', objective: 'Liderazgo y Comunicación (gratis sin certificado)' },
            { name: 'LinkedIn Learning - Comunicación', url: 'https://es.linkedin.com/learning/topics/comunicacion', objective: 'Mejorar habilidades comunicativas' },
            { name: 'Oxford Home Study', url: 'https://www.oxfordhomestudy.com/courses/customer-service-courses-online/free-communication-skills-courses', objective: 'Habilidades de Comunicación' },
            { name: 'Meetup', url: 'https://meetup.com', objective: 'Practicar networking social (siempre sé PRUDENTE)' }
        ],
        apps: [
            { name: 'Habilidades Sociales', url: 'https://play.google.com/store/apps/details/Habilidades_Sociales?id=com.fasabeteam.habilidadessociales&hl=es_PE', objective: 'Conceptos Actuales' },
            { name: 'Social Skills', url: 'https://play.google.com/store/apps/details?id=in.softecks.socialskills&hl=es_PE', objective: 'Aprendizaje Completo' }
        ],
        videos: [
            { name: 'TED - El poder de la vulnerabilidad - Brené Brown', url: 'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability', objective: 'Comprender conexión humana' },
            { name: 'TED - 5 consejos para mejorar su pensamiento crítico', url: 'https://www.youtube.com/watch?v=YO4pwpaH8Fo', objective: 'Mejora tu análisis' }
        ],
        trabajos: [
            { name: 'Voluntariado comunitario', objective: 'Practicar empatía y trabajo en equipo' },
            { name: 'Atención al cliente', objective: 'Desarrollar comunicación asertiva' }
        ]
    },
    trabajo_equipo: {
        webs: [
            { name: 'LinkedIn Learning - Teamwork', url: 'https://www.linkedin.com/learning/topics/teamwork', objective: 'Trabajo en equipo efectivo' },
            { name: 'UPValencia Trabajo en equipo', url: 'https://www.edx.org/learn/remote-work/universitat-politecnica-de-valencia-trabajo-en-equipo-en-entornos-presenciales-remotos-e-hibridos', objective: 'Trabajo en equipo (gratis audit course' }
        ],
        apps: [
            { name: 'Trello', url: 'https://play.google.com/store/apps/details?id=com.trello&hl=es_PE', objective: 'Gestión colaborativa de tareas' },
            { name: 'Microsoft Teams', url: 'https://play.google.com/store/apps/details?id=com.microsoft.teams&hl=es_PE', objective: 'Colaboración empresarial' }
        ],
        videos: [
            { name: 'TED - La importancia del trabajo en equipo', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A', objective: 'Valor de la colaboración' },
            { name: 'TED - Cómo construir equipos de alto rendimiento', url: 'https://www.youtube.com/watch?v=ibmImRxW7aE', objective: 'Equipos efectivos' }
        ],
        trabajos: [
            { name: 'Proyectos grupales universitarios', objective: 'Practicar colaboración académica' },
            { name: 'Deportes de equipo', objective: 'Desarrollar coordinación grupal' }
        ]
    },
    resolucion_problemas: {
        webs: [
            { name: 'Cursos edX', url: 'https://www.edx.org/es/aprende/solucion-de-problemas', objective: 'Soluciones Razonadas' },
            { name: 'Oxford - Problem Solving', url: 'https://www.oxfordhomestudy.com/free-problem-solving-courses', objective: 'Pensamiento Critico' },
            { name: 'Cursos MIT', url: 'https://globalalumni.xpro.mit.edu/es/curso-online/critical-thinking/', objective: 'Razonamiento Analitico' },
            { name: 'Psychology Today - Problem Solving', url: 'https://www.psychologytoday.com/us/blog/a-deeper-wellness/202307/problem-solving-understanding-and-dealing-with-challenges', objective: 'Enfoque psicológico' }
        ],
        apps: [
            { name: 'Simple MInd', url: 'https://play.google.com/store/apps/details?id=com.modelmakertools.simplemindfree&hl=es', objective: 'Mapas Mentales' },
            { name: 'Moral Machine', url: 'https://www.moralmachine.net/hl/es', objective: 'Toma de Decisiones Profundas' },
            { name: 'Virtonomics', url: 'https://virtonomics.com/blogs/lang/es/juegos-de-negocios-gratuitos-populares/', objective: 'Juegos de Negocios' },
            { name: 'Plague Inc', url: 'https://play.google.com/store/apps/details?id=com.miniclip.plagueinc', objective: 'Infecta al Mundo' },
            
        ],
        videos: [
            { name: 'TED - Resuelve problemas bajo presión', url: 'https://www.youtube.com/watch?v=WzxUDrXv3fA', objective: 'Estrategias rápidas' },
            { name: 'TED - El arte de resolver problemas complejos', url: 'https://www.youtube.com/watch?v=KpFOdXPnZnE', objective: 'Análisis sistemático' }
        ],
        trabajos: [
            { name: 'Soporte técnico', objective: 'Resolver incidencias técnicas' },
            { name: 'Analista de datos junior', objective: 'Identificar patrones y soluciones' }
        ]
    },
    pensamiento_critico: {
        webs: [
            { name: 'Critical Thinking Institute', url: 'https://www.criticalthinking.org/', objective: 'Fundamentos del pensamiento crítico' },
            { name: 'Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/critical-thinking/', objective: 'Teoría profunda' },
            { name: 'Harvard Online - Critical Thinking', url: 'https://harvardonline.harvard.edu/course/structure-function-argument-introduction-critical-thinking-0', objective: 'Introducción al pensamiento crítico (gratis sin certificado)' },
            { name: 'Coursera - Pensamiento Crítico', url: 'https://coursera.org', objective: 'Desarrollar habilidades de análisis crítico' }
        ],
        apps: [
            { name: 'Neuro Nation', url: 'https://play.google.com/store/apps/details?id=air.nn.mobile.app.main&hl=es', objective: 'Ejercicos Mentales' },
            { name: 'Mind Master', url: 'https://play.google.com/store/apps/details?id=com.appsynergy.mindmaster', objective: 'Entrena tu mente' },
            { name: 'Critical Thinking Coach', url: 'https://play.google.com/store/apps/details?id=com.critical.thinking.coach&hl=es_PE', objective: 'Retos mentales diarios' }
        ],
        videos: [
            { name: 'TED - Mejora tu pensamiento crítico', url: 'https://www.youtube.com/watch?v=6OLQVR5R-fg', objective: 'Herramientas prácticas' },
            { name: 'TED - Esta herramienta te ayudará a mejorar tu pensamiento crítico', url: 'https://www.youtube.com/watch?v=7C3XUy3BYug', objective: 'Herramienta valiosa' }
        ],
        trabajos: [
            { name: 'Asistente de investigación', objective: 'Practicar análisis de datos' },
            { name: 'Tutor académico', objective: 'Desarrollar explicación de conceptos complejos' }
        ]
    },
    liderazgo: {
        webs: [
            { name: 'Ejerciendo Liderazgo - Harvard', url: 'https://harvardonline.harvard.edu/course/exercising-leadership-foundational-principles', objective: 'Principios Fundamentales' },
            { name: 'Liderazgo sin temor - Harvard', url: 'https://www.edx.org/learn/business-management/harvard-university-purpose-perspective-and-persuasion', objective: 'Propósito, Perspectiva y Persuasión' },
            { name: 'Oxford - Cualidades de Liderazgo', url: 'https://www.oxfordhomestudy.com/courses/leadership-courses-online/certification-in-leadership-and-management', objective: 'Cualidades de un líder' },
            { name: 'Business Simulations', url: 'https://businesssimulations.com/insights/articles/five-great-mobile-phone-apps-for-leadership-development-all-free-too/', objective: 'Desarrollo de Liderazgo' }
        ],
        apps: [
            { name: 'SC training', url: 'https://training.safetyculture.com/es/', objective: 'Desarrollo de habilidades de Liderazgo' },
            { name: 'Business Simulation', url: 'https://businesssimulations.com/insights/articles/five-great-mobile-phone-apps-for-leadership-development-all-free-too/', objective: 'Modelos de Empresa' }
        ],
        videos: [
            { name: 'TED - Líderes que inspiran', url: 'https://www.youtube.com/watch?v=4bcB5FJq80Q', objective: 'Observar estilos de liderazgo efectivo' },
            { name: 'TED - Cómo motivar a tu equipo', url: 'https://www.youtube.com/watch?v=NyoT1k3SMAM', objective: 'Motivación efectiva' }
        ],
        trabajos: [
            { name: 'Líder de proyecto universitario', objective: 'Practicar gestión de equipos' },
            { name: 'Coordinador de evento', objective: 'Desarrollar organización y delegación' }
        ]
    },
    adaptabilidad: {
        webs: [
            { name: 'Psychology Today - Adaptability', url: 'https://www.psychologytoday.com/us/basics/adaptability', objective: 'Fundamentos de adaptabilidad' },
            { name: 'Greater Good Science Center', url: 'https://greatergood.berkeley.edu/topic/resilience', objective: 'Ciencia de la resiliencia' },
            { name: 'AnahucX - Inteligencia Emocional', url: 'https://www.edx.org/learn/leadership/universidades-anahuac-inteligencia-emocional-para-el-liderazgo-efectivo-y-colaboracion', objective: 'Inteligencia Emocional para el Liderazgo' }
        ],
        apps: [
            { name: 'Insight Timer', url: 'https://play.google.com/store/apps/details?id=com.spotlightsix.zentimerlite2&hl=es', objective: 'Meditación y mindfulness' },
            { name: 'Proyecto Europeo', url: 'https://www.cope-euproject.eu/es/sobre-el-proyecto/practicar-resiliencia/', objective: 'Desarrollar Resilencia' },
            { name: 'Modelol Stoico', url: 'https://play.google.com/store/apps/details?id=com.stoicroutine.stoic&hl=es_PE', objective: 'Salud Mental' },
            { name: 'Yana', url: 'https://play.google.com/store/apps/details?id=com.yanaapp&hl=es_PE', objective: 'Salud Mental con IA' }
        ],
        videos: [
            { name: 'TED - Adapta tu mente para prosperar', url: 'https://www.youtube.com/watch?v=STeRsNSJwVE', objective: 'Flexibilidad mental' },
            { name: 'TED - El estrés puede ser tu amigo', url: 'https://www.youtube.com/watch?v=RcGyVTAoXEU', objective: 'Convierte el estrés en tu amigo' }
        ],
        trabajos: [
            { name: 'Trabajos por proyectos', objective: 'Adaptarse a diferentes entornos' },
            { name: 'Viajes de intercambio', objective: 'Experiencia cultural diversa' }
        ]
    },
    gestion_tiempo: {
        webs: [
            { name: 'Tareas mas Importantes', url: 'https://es.linkedin.com/advice/3/how-can-you-use-mit-method-prioritize-your-tasks-lk8cf?lang=es&lang=es', objective: 'Metodo MIT' },
            { name: 'Tiempo y Efectividad', url: 'https://www.edx.org/learn/time-management/pontificia-universidad-javeriana-uso-efectivo-del-tiempo', objective: 'Universidad Jaleriana' },
            { name: 'Oxford - Time Management', url: 'https://www.oxfordhomestudy.com/courses/online-management-courses/time-management-free-courses', objective: 'Herramientas de gestión' }
        ],
        apps: [
            { name: 'Google Tasks', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.tasks&hl=es_PE', objective: 'Organizador de Tareas' },
            { name: 'MIcrosoft To DO', url: 'https://apps.microsoft.com/detail/9nblggh5r558?hl=es-ES&gl=ES', objective: 'Organizador' },
            { name: 'Clockify', url: 'https://clockify.me/es/', objective: 'Controlador de Tiempo para grupos' }
        ],
        videos: [
            { name: 'TED - Gestiona tu tiempo como tu carrera', url: 'https://www.youtube.com/watch?v=Oj-h1z5jjM0', objective: 'Planificación estratégica' },
            { name: 'TED - Técnicas de gestión del tiempo', url: 'https://www.youtube.com/watch?v=VPVDiS5-8hI', objective: 'Métodos prácticos' }
        ],
        trabajos: [
            { name: 'Asistente administrativo', objective: 'Organizar agendas y prioridades' },
            { name: 'Planificador de eventos', objective: 'Coordinar múltiples tareas' }
        ]
    },
    creatividad: {
        webs: [
            { name: 'Crative Thinking - Oxford', url: 'https://www.oxfordhomestudy.com/courses/train-the-trainer-courses/creative-thinking-courses', objective: 'Pensamiento creativo' },
            { name: 'Harvard -Deusto', url: 'https://www.harvard-deusto.com/innovacion-y-creatividad', objective: 'Innovación y Creatividad' },
            { name: 'MIT Innovadores y Emprendedores', url: 'https://openlearning.mit.edu/news/free-online-courses-mit-entrepreneurs-and-innovators', objective: 'Emprendimiento e Innovación' }
        ],
        apps: [
            { name: 'Kreative', url: 'https://play.google.com/store/apps/details?id=com.aya.idea_generator&hl=es_PE', objective: 'Crear Ideas' },
            { name: 'Oblique Strategies', url: 'https://play.google.com/store/apps/details?id=com.monoloco.obliquestrategies', objective: 'Rompe Bloqueos Mentales' },
            { name: 'Brainstormer', url: 'https://play.google.com/store/apps/details?id=me.cendre.brainstorming.android&hl=es_PE', objective: 'Lluvia de Ideas' }
        ],
        videos: [
            { name: 'TED - Tu cuerpo moldea tu creatividad', url: 'https://www.youtube.com/watch?v=z25yMTHkRY0', objective: 'Conexión cuerpo-mente' },
            { name: 'TED - Hábitos de las personas creativas', url: 'https://www.youtube.com/watch?v=ZnYWWouUoVA', objective: 'Rutinas creativas' }
        ],
        trabajos: [
            { name: 'Diseñador freelance', objective: 'Proyectos creativos variados' },
            { name: 'Redactor de contenidos', objective: 'Generar ideas originales' }
        ]
    }
};

// DOM Elements
const pages = {
    intro: document.getElementById('introPage'),
    goals: document.getElementById('goalsPage'),
    test: document.getElementById('testPage'),
    results: document.getElementById('resultsPage'),
    recommendations: document.getElementById('recommendationsPage')
};

const navLinks = document.querySelectorAll('#participantNav .nav-link');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeRolesSelection();
    initializeCompetenciesSelection();
    setupEventListeners();
    showPage('intro');
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (canNavigateTo(page)) {
                showPage(page);
            }
        });
    });

    // Personal Data Form
    document.getElementById('personalDataForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('participantName').value.trim();
        const age = parseInt(document.getElementById('participantAge').value);
        
        if (!name || !age || age < 14 || age > 100) {
            alert('Por favor ingresa un nombre válido y una edad entre 14 y 100 años.');
            return;
        }
        
        state.personalData = { name, age };
        showPage('goals');
    });

    // Goals Form
    document.getElementById('goalsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const lifeGoals = document.getElementById('lifeGoals').value.trim();
        const passions = document.getElementById('passions').value.trim();
        const personalGoals = document.getElementById('personalGoals').value.trim();
        
        if (!lifeGoals || !passions || !personalGoals) {
            alert('Por favor completa todos los campos de metas.');
            return;
        }
        
        if (state.goals.roles.length === 0) {
            alert('Selecciona al menos un rol con el que te identifiques.');
            return;
        }
        
        if (state.goals.competencies.length === 0) {
            alert('Selecciona al menos una competencia en la que seas bueno/a.');
            return;
        }
        
        state.goals = { lifeGoals, roles: [...state.goals.roles], passions, competencies: [...state.goals.competencies], personalGoals };
        generateQuiz();
        showPage('test');
    });

    // Submit Test
    document.getElementById('submitTest').addEventListener('click', calculateResults);

    // Generate PDF
    document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);
}

// Check if navigation is allowed
function canNavigateTo(page) {
    const progressOrder = ['intro', 'goals', 'test', 'results', 'recommendations'];
    const currentIndex = progressOrder.indexOf(state.currentPage);
    const targetIndex = progressOrder.indexOf(page);
    
    // Allow going back or staying on current page
    if (targetIndex <= currentIndex) return true;
    
    // Check prerequisites
    if (page === 'goals' && !state.personalData.name) return false;
    if (page === 'test' && !state.goals.lifeGoals) return false;
    if (page === 'results' && Object.keys(state.testResults).length === 0) return false;
    if (page === 'recommendations' && Object.keys(state.testResults).length === 0) return false;
    
    return true;
}

// Show page
function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.add('d-none'));
    
    // Show requested page
    if (pages[pageName]) {
        pages[pageName].classList.remove('d-none');
    }
    
    // Update nav active state
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
    });
    
    state.currentPage = pageName;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Initialize roles selection
function initializeRolesSelection() {
    const container = document.getElementById('rolesSelection');
    container.innerHTML = '';
    
    roles.forEach(role => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input role-checkbox" type="checkbox" value="${role}" id="role_${role}">
                <label class="form-check-label" for="role_${role}">${role}</label>
            </div>
        `;
        container.appendChild(col);
    });
    
    // Add change listeners
    document.querySelectorAll('.role-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateRolesSelection);
    });
}

// Update roles selection
function updateRolesSelection() {
    const checkboxes = document.querySelectorAll('.role-checkbox:checked');
    const count = checkboxes.length;
    const countSpan = document.getElementById('rolesCount');
    countSpan.textContent = count;
    
    if (count >= 3) {
        document.querySelectorAll('.role-checkbox:not(:checked)').forEach(cb => {
            cb.disabled = true;
        });
    } else {
        document.querySelectorAll('.role-checkbox').forEach(cb => {
            cb.disabled = false;
        });
    }
    
    state.goals.roles = Array.from(checkboxes).map(cb => cb.value);
}

// Initialize competencies selection
function initializeCompetenciesSelection() {
    const container = document.getElementById('competenciesSelection');
    container.innerHTML = '';
    
    competencies.forEach(comp => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input competency-checkbox" type="checkbox" value="${comp.id}" id="comp_${comp.id}">
                <label class="form-check-label" for="comp_${comp.id}">${comp.name}</label>
            </div>
        `;
        container.appendChild(col);
    });
    
    // Add change listeners
    document.querySelectorAll('.competency-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateCompetenciesSelection);
    });
}

// Update competencies selection
function updateCompetenciesSelection() {
    const checkboxes = document.querySelectorAll('.competency-checkbox:checked');
    const count = checkboxes.length;
    const countSpan = document.getElementById('competenciesCount');
    countSpan.textContent = count;
    
    if (count >= 3) {
        document.querySelectorAll('.competency-checkbox:not(:checked)').forEach(cb => {
            cb.disabled = true;
        });
    } else {
        document.querySelectorAll('.competency-checkbox').forEach(cb => {
            cb.disabled = false;
        });
    }
    
    state.goals.competencies = Array.from(checkboxes).map(cb => cb.value);
}

// Generate quiz
function generateQuiz() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    quizQuestions.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'mb-5';
        sectionDiv.innerHTML = `<h5 class="fw-bold text-primary mb-3">${section.competency.replace('_', ' ').toUpperCase()}</h5>`;
        
        section.questions.forEach((question, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'mb-4 p-3 border rounded';
            
            let optionsHtml = '';
            question.options.forEach((option, oIndex) => {
                optionsHtml += `
                    <div class="form-check">
                        <input class="form-check-input quiz-option" type="radio" 
                            name="q_${sectionIndex}_${qIndex}" 
                            value="${oIndex}" 
                            id="q_${sectionIndex}_${qIndex}_o${oIndex}">
                        <label class="form-check-label" for="q_${sectionIndex}_${qIndex}_o${oIndex}">${option}</label>
                    </div>
                `;
            });
            
            questionDiv.innerHTML = `
                <p class="fw-bold mb-2">${qIndex + 1}. ${question.text}</p>
                ${optionsHtml}
            `;
            
            sectionDiv.appendChild(questionDiv);
        });
        
        container.appendChild(sectionDiv);
    });
}

// Calculate results
function calculateResults() {
    const allAnswered = document.querySelectorAll('.quiz-option:checked');
    const totalQuestions = document.querySelectorAll('.quiz-option').length / 4; // 4 options per question
    
    if (allAnswered.length < totalQuestions) {
        alert(`Has respondido ${allAnswered.length} de ${totalQuestions} preguntas. Por favor responde todas las preguntas.`);
        return;
    }
    
    // Calculate scores for each competency
    const scores = {};
    
    quizQuestions.forEach((section, sectionIndex) => {
        let totalScore = 0;
        section.questions.forEach((question, qIndex) => {
            const selected = document.querySelector(`input[name="q_${sectionIndex}_${qIndex}"]:checked`);
            if (selected) {
                totalScore += parseInt(selected.value); // 0-3 points
            }
        });
        
        // Normalize to 0-10 scale
        const maxScore = section.questions.length * 3;
        scores[section.competency] = Math.round((totalScore / maxScore) * 10);
    });
    
    state.testResults = scores;
    
    // Generate recommendations
    generateRecommendations();
    
    // Display results
    displayResults();
    
    // Navigate to results page
    showPage('results');
}

// Generate recommendations based on lowest scores
function generateRecommendations() {
    const sortedCompetencies = Object.entries(state.testResults)
        .sort((a, b) => a[1] - b[1]);
    
    // Get bottom 3 competencies for recommendations
    const bottomThree = sortedCompetencies.slice(0, 3);
    
    state.recommendations = bottomThree.map(([compId, score]) => ({
        competency: compId,
        score: score,
        ...recommendationsDB[compId]
    }));
}

// Display results with radar chart
function displayResults() {
    // Create radar chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    // Destroy existing chart if any
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }
    
    const labels = competencies.map(c => c.name);
    const data = competencies.map(c => state.testResults[c.id] || 0);
    
    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tus Resultados',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
    
    // Display improvement areas (scores < 6)
    const improvementContainer = document.getElementById('improvementAreas');
    improvementContainer.innerHTML = '';
    
    const improvements = Object.entries(state.testResults)
        .filter(([_, score]) => score < 6)
        .sort((a, b) => a[1] - b[1]);
    
    if (improvements.length === 0) {
        improvementContainer.innerHTML = '<p class="text-muted">¡Excelente! No tienes áreas críticas que mejorar.</p>';
    } else {
        improvements.forEach(([compId, score]) => {
            const comp = competencies.find(c => c.id === compId);
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card border-danger h-100">
                    <div class="card-body">
                        <h6 class="fw-bold text-danger">${comp?.name || compId}</h6>
                        <div class="progress mb-2">
                            <div class="progress-bar bg-danger" role="progressbar" style="width: ${score * 10}%"></div>
                        </div>
                        <p class="mb-0 small">Puntuación: ${score}/10</p>
                    </div>
                </div>
            `;
            improvementContainer.appendChild(col);
        });
    }
    
    // Display strengths (scores >= 7)
    const strengthsContainer = document.getElementById('strengths');
    strengthsContainer.innerHTML = '';
    
    const strengths = Object.entries(state.testResults)
        .filter(([_, score]) => score >= 7)
        .sort((a, b) => b[1] - a[1]);
    
    if (strengths.length === 0) {
        strengthsContainer.innerHTML = '<p class="text-muted">Sigue practicando para desarrollar tus fortalezas.</p>';
    } else {
        strengths.forEach(([compId, score]) => {
            const comp = competencies.find(c => c.id === compId);
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card border-success h-100">
                    <div class="card-body">
                        <h6 class="fw-bold text-success">${comp?.name || compId}</h6>
                        <div class="progress mb-2">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${score * 10}%"></div>
                        </div>
                        <p class="mb-0 small">Puntuación: ${score}/10</p>
                    </div>
                </div>
            `;
            strengthsContainer.appendChild(col);
        });
    }
    
    // Role suggestion based on highest scores
    suggestRole();
}

// Suggest role based on competencies
function suggestRole() {
    const roleSuggestions = {
        lider: ['liderazgo', 'comunicacion', 'trabajo_equipo'],
        comunicador: ['comunicacion', 'creatividad', 'adaptabilidad'],
        innovador: ['creatividad', 'pensamiento_critico', 'resolucion_problemas'],
        organizador: ['gestion_tiempo', 'trabajo_equipo', 'liderazgo'],
        creativo: ['creatividad', 'adaptabilidad', 'pensamiento_critico'],
        analitico: ['pensamiento_critico', 'resolucion_problemas', 'gestion_tiempo'],
        emprendedor: ['liderazgo', 'adaptabilidad', 'resolucion_problemas'],
        colaborador: ['trabajo_equipo', 'comunicacion', 'adaptabilidad']
    };
    
    const sortedScores = Object.entries(state.testResults).sort((a, b) => b[1] - a[1]);
    const topThree = sortedScores.slice(0, 3).map(([id]) => id);
    
    let bestRole = null;
    let bestMatch = 0;
    
    Object.entries(roleSuggestions).forEach(([role, requiredComps]) => {
        const matchCount = requiredComps.filter(comp => topThree.includes(comp)).length;
        if (matchCount > bestMatch) {
            bestMatch = matchCount;
            bestRole = role;
        }
    });
    
    const roleSuggestionDiv = document.getElementById('roleSuggestion');
    const roleSuggestionText = document.getElementById('roleSuggestionText');
    
    if (bestRole && bestMatch >= 2) {
        roleSuggestionText.textContent = `Basado en tus fortalezas, podrías destacar como ${bestRole.toUpperCase()}. Tus competencias principales se alinean bien con este rol.`;
        roleSuggestionDiv.classList.remove('d-none');
    } else {
        roleSuggestionDiv.classList.add('d-none');
    }
}

// Display recommendations
function displayRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    container.innerHTML = '';
    
    state.recommendations.forEach((rec, index) => {
        const comp = competencies.find(c => c.id === rec.competency);
        const col = document.createElement('div');
        col.className = 'col-lg-4';
        
        // Format webs with names and objectives
        let websHtml = '';
        if (rec.webs && Array.isArray(rec.webs)) {
            websHtml = rec.webs.map(w => 
                `<li class="mb-2 ps-3">
                    <a href="${w.url}" target="_blank" class="text-decoration-none fw-bold">➡️ ${w.name}</a>
                    <br><small class="text-muted">📌 ${w.objective}</small>
                </li>`
            ).join('');
        }
        
        // Format apps with names and objectives
        let appsHtml = '';
        if (rec.apps && Array.isArray(rec.apps)) {
            appsHtml = rec.apps.map(a => 
                `<li class="mb-2 ps-3">
                    <a href="${a.url || '#'}" target="_blank" class="text-decoration-none fw-bold">📲 ${a.name}</a>
                    <br><small class="text-muted">📌 ${a.objective}</small>
                </li>`
            ).join('');
        }
        
        // Format videos with names and objectives
        let videosHtml = '';
        if (rec.videos && Array.isArray(rec.videos)) {
            videosHtml = rec.videos.map(v => 
                `<li class="mb-2 ps-3">
                    <a href="${v.url}" target="_blank" class="text-decoration-none fw-bold">▶️ ${v.name}</a>
                    <br><small class="text-muted">📌 ${v.objective}</small>
                </li>`
            ).join('');
        }
        
        // Format trabajos with names and objectives
        let trabajosHtml = '';
        if (rec.trabajos && Array.isArray(rec.trabajos)) {
            trabajosHtml = rec.trabajos.map(t => 
                `<li class="mb-2 ps-3">
                    <strong>💼 ${t.name}</strong>
                    <br><small class="text-muted">📌 ${t.objective}</small>
                </li>`
            ).join('');
        }
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-warning">
                <div class="card-header bg-warning">
                    <h5 class="mb-0 fw-bold">💡 ${comp?.name || rec.competency}</h5>
                    <small>Puntuación: ${rec.score}/10</small>
                </div>
                <div class="card-body">
                    <h6 class="fw-bold">🌐 Páginas Web:</h6>
                    <ul class="list-unstyled">${websHtml || '<li class="text-muted">No hay recursos web disponibles</li>'}</ul>
                    
                    <h6 class="fw-bold mt-3">📱 Aplicaciones:</h6>
                    <ul class="list-unstyled">${appsHtml || '<li class="text-muted">No hay aplicaciones disponibles</li>'}</ul>
                    
                    <h6 class="fw-bold mt-3">🎥 Videos:</h6>
                    <ul class="list-unstyled">${videosHtml || '<li class="text-muted">No hay videos disponibles</li>'}</ul>
                    
                    <h6 class="fw-bold mt-3">💼 Trabajos Temporales:</h6>
                    <ul class="list-unstyled">${trabajosHtml || '<li class="text-muted">No hay trabajos sugeridos</li>'}</ul>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Generate PDF
function generatePDF() {
    if (Object.keys(state.testResults).length === 0) {
        alert('⚠️ ADVERTENCIA: Primero debes completar todo el test para generar el PDF.\n\nSi no descargas tu PDF ahora, perderás toda tu información al salir de la página.');
        return;
    }
    
    // Show warning to user
    const confirmed = confirm('⚠️ IMPORTANTE: Descarga tu PDF ahora para guardar tus resultados y recomendaciones.\n\nSi no lo haces, perderás toda tu información al cerrar esta página.\n\n¿Deseas continuar con la descarga?');
    if (!confirmed) {
        return;
    }
    
    // Ensure recommendations are displayed
    displayRecommendations();
    
    // Create a clone of the content for PDF
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.background = 'white';
    element.style.width = '800px';
    
    // Header
    element.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 28px;">🚀 Desarrollo Personal - Alcanzando Metas 2026</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Reporte de Resultados</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px;">👤 Datos del Participante</h2>
            <p><strong>Nombre:</strong> ${state.personalData.name}</p>
            <p><strong>Edad:</strong> ${state.personalData.age} años</p>
            <p><strong>Metas de Vida:</strong> ${state.goals.lifeGoals}</p>
            <p><strong>Pasiones:</strong> ${state.goals.passions}</p>
            <p><strong>Áreas de Mejora:</strong> ${state.goals.personalGoals}</p>
            <p><strong>Roles:</strong> ${state.goals.roles.join(', ')}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px;">📊 Resultados del Test</h2>
            <div style="margin: 20px 0;">
                ${Object.entries(state.testResults).map(([compId, score]) => {
                    const comp = competencies.find(c => c.id === compId);
                    const color = score < 6 ? '#dc3545' : score >= 7 ? '#28a745' : '#ffc107';
                    return `
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <strong>${comp?.name || compId}</strong>
                                <strong style="color: ${color};">${score}/10</strong>
                            </div>
                            <div style="background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden;">
                                <div style="background: ${color}; height: 100%; width: ${score * 10}%; transition: width 0.3s;"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    // Add chart canvas for PDF
    const chartContainer = document.createElement('div');
    chartContainer.style.marginBottom = '20px';
    chartContainer.style.background = '#f8f9fa';
    chartContainer.style.padding = '20px';
    chartContainer.style.borderRadius = '10px';
    
    const chartTitle = document.createElement('h2');
    chartTitle.style.color = '#667eea';
    chartTitle.style.borderBottom = '3px solid #667eea';
    chartTitle.style.paddingBottom = '10px';
    chartTitle.style.marginBottom = '20px';
    chartTitle.textContent = '📈 Gráfico de Competencias';
    chartContainer.appendChild(chartTitle);
    
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'pdfRadarChart';
    chartCanvas.width = 600;
    chartCanvas.height = 400;
    chartContainer.appendChild(chartCanvas);
    
    element.appendChild(chartContainer);
    
    // Append element to body temporarily to ensure chart renders
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';
    document.body.appendChild(element);
    
    // Create PDF chart with delay to ensure DOM is ready
    setTimeout(() => {
        const pdfCtx = document.getElementById('pdfRadarChart').getContext('2d');
        new Chart(pdfCtx, {
            type: 'radar',
            data: {
                labels: competencies.map(c => c.name),
                datasets: [{
                    label: 'Tus Resultados',
                    data: competencies.map(c => state.testResults[c.id] || 0),
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)'
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 10,
                        ticks: { stepSize: 2 }
                    }
                }
            }
        });
    }, 100);
    
    // Add recommendations with complete format after a delay
    setTimeout(() => {
        element.innerHTML += `
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #856404; border-bottom: 3px solid #856404; padding-bottom: 10px;">💡 Plan de Acción Personalizado</h2>
                <p style="margin-bottom: 20px;"><strong>Enfoque:</strong> Mejorar las siguientes competencias clave para alcanzar tus metas</p>
                
                ${state.recommendations.map(rec => {
                    const comp = competencies.find(c => c.id === rec.competency);
                    
                    // Format webs for PDF
                    let websHtml = '';
                    if (rec.webs && Array.isArray(rec.webs)) {
                        websHtml = rec.webs.map(w => 
                            `<li style="margin-bottom: 5px;">
                                <a href="${w.url}" style="color: #667eea;">${w.name}</a> - ${w.objective}
                            </li>`
                        ).join('');
                    }
                    
                    // Format apps for PDF
                    let appsHtml = '';
                    if (rec.apps && Array.isArray(rec.apps)) {
                        appsHtml = rec.apps.map(a => 
                            `<li style="margin-bottom: 5px;">
                                ${a.name} - ${a.objective}
                            </li>`
                        ).join('');
                    }
                    
                    // Format videos for PDF
                    let videosHtml = '';
                    if (rec.videos && Array.isArray(rec.videos)) {
                        videosHtml = rec.videos.map(v => 
                            `<li style="margin-bottom: 5px;">
                                <a href="${v.url}" style="color: #667eea;">${v.name}</a> - ${v.objective}
                            </li>`
                        ).join('');
                    }
                    
                    // Format trabajos for PDF
                    let trabajosHtml = '';
                    if (rec.trabajos && Array.isArray(rec.trabajos)) {
                        trabajosHtml = rec.trabajos.map(t => 
                            `<li style="margin-bottom: 5px;">
                                💼 ${t.name} - ${t.objective}
                            </li>`
                        ).join('');
                    }
                    
                    return `
                        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ffc107;">
                            <h3 style="color: #856404; margin: 0 0 10px 0;">${comp?.name || rec.competency}</h3>
                            <p style="margin: 0 0 10px 0;"><strong>Puntuación Actual:</strong> ${rec.score}/10</p>
                            
                            <h4 style="margin: 15px 0 10px 0; color: #667eea;">🌐 Recursos Web Recomendados:</h4>
                            <ul style="margin: 0 0 10px 0;">${websHtml || '<li>No disponible</li>'}</ul>
                            
                            <h4 style="margin: 15px 0 10px 0; color: #667eea;">📱 Aplicaciones Útiles:</h4>
                            <ul style="margin: 0 0 10px 0;">${appsHtml || '<li>No disponible</li>'}</ul>
                            
                            <h4 style="margin: 15px 0 10px 0; color: #667eea;">🎥 Videos Educativos:</h4>
                            <ul style="margin: 0 0 10px 0;">${videosHtml || '<li>No disponible</li>'}</ul>
                            
                            <h4 style="margin: 15px 0 10px 0; color: #667eea;">💼 Trabajos Temporales:</h4>
                            <ul style="margin: 0;">${trabajosHtml || '<li>No disponible</li>'}</ul>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
                <h3 style="margin: 0;">¡Tu futuro comienza hoy!</h3>
                <p style="margin: 10px 0 0 0;">Usa estos recursos para desarrollar tus competencias y alcanzar tus metas.</p>
                <p style="margin: 10px 0 0 0; font-size: 12px;">Generado el ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        `;
        
        // Generate PDF with html2pdf
        const opt = {
            margin: 10,
            filename: `Resultados_${state.personalData.name.replace(/\s+/g, '_')}_2026.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        // Show loading message
        const btn = document.getElementById('generatePdfBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Generando PDF...';
        btn.disabled = true;
        
        // Wait for chart to render then generate PDF
        setTimeout(() => {
            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    document.body.removeChild(element);
                    alert('✅ ¡PDF generado exitosamente! Recuerda guardarlo en un lugar seguro.');
                })
                .catch(err => {
                    console.error('Error generating PDF:', err);
                    alert('❌ Error al generar el PDF. Por favor intenta nuevamente.');
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    document.body.removeChild(element);
                });
        }, 1000);
    }, 500);
}

// Override showPage to also display recommendations when navigating there
const originalShowPage = showPage;
showPage = function(pageName) {
    if (pageName === 'recommendations' && state.recommendations.length > 0) {
        displayRecommendations();
    }
    originalShowPage(pageName);
};
