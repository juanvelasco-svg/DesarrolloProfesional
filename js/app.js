// YouthDev 2026 - Main Application Logic

// Data Store (simulating database with localStorage)
const DB = {
    getUsers: () => JSON.parse(localStorage.getItem('users') || '[]'),
    setUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),
    
    getProfiles: () => JSON.parse(localStorage.getItem('profiles') || '[]'),
    setProfiles: (profiles) => localStorage.setItem('profiles', JSON.stringify(profiles)),
    
    getResults: () => JSON.parse(localStorage.getItem('results') || '[]'),
    setResults: (results) => localStorage.setItem('results', JSON.stringify(results)),
    
    initialize: function() {
        // Initialize default users if not exists
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                { id: 1, username: 'admin', password: 'admin123', fullName: 'Administrador', role: 'admin' }
            ];
            this.setUsers(defaultUsers);
        }
    }
};

// Matrix 2.2 - Roles and Competencies
const MATRIX_2_2 = {
    ALTA_GERENCIA: {
        name: 'Alta Gerencia',
        emoji: '👔',
        competencies: {
            cognitivas: 5, sociales: 5, eticas: 5, liderazgo: 5,
            crisis: 5, negociacion: 5, resiliencia: 5, emocional: 5, estrategico: 5
        },
        top3: ['Análisis Estratégico', 'Liderazgo', 'Manejo de Crisis']
    },
    EMPRENDEDOR: {
        name: 'Emprendedor',
        emoji: '💡',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 4, liderazgo: 4,
            crisis: 4, negociacion: 4, resiliencia: 5, emocional: 4, estrategico: 4
        },
        top3: ['Resiliencia', 'Negociación', 'Análisis Estratégico']
    },
    INVESTIGADOR: {
        name: 'Investigador',
        emoji: '🔬',
        competencies: {
            cognitivas: 5, sociales: 2, eticas: 4, liderazgo: 2,
            crisis: 2, negociacion: 2, resiliencia: 4, emocional: 4, estrategico: 5
        },
        top3: ['Competencias Cognitivas', 'Análisis Estratégico', 'Resiliencia']
    },
    GESTION_PUBLICA: {
        name: 'Gestión Pública',
        emoji: '🏛️',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 5, liderazgo: 4,
            crisis: 5, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 4
        },
        top3: ['Competencias Éticas', 'Manejo de Crisis', 'Liderazgo']
    },
    EDUCACION: {
        name: 'Educación',
        emoji: '📚',
        competencies: {
            cognitivas: 4, sociales: 5, eticas: 4, liderazgo: 4,
            crisis: 2, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Sociales', 'Equilibrio Emocional', 'Liderazgo']
    },
    SALUD: {
        name: 'Salud',
        emoji: '🏥',
        competencies: {
            cognitivas: 5, sociales: 5, eticas: 4, liderazgo: 4,
            crisis: 5, negociacion: 2, resiliencia: 4, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Sociales', 'Manejo de Crisis', 'Equilibrio Emocional']
    },
    IMPACTO_SOCIAL: {
        name: 'Impacto Social',
        emoji: '🌍',
        competencies: {
            cognitivas: 2, sociales: 4, eticas: 5, liderazgo: 4,
            crisis: 4, negociacion: 4, resiliencia: 5, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Éticas', 'Resiliencia', 'Competencias Sociales']
    },
    SOSTENIBILIDAD: {
        name: 'Sostenibilidad',
        emoji: '♻️',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 5, liderazgo: 2,
            crisis: 4, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 5
        },
        top3: ['Competencias Éticas', 'Análisis Estratégico', 'Competencias Cognitivas']
    }
};

// Test Questions (5 questions per competency = 45 total)
const TEST_QUESTIONS = [
    // Competencias Cognitivas (1-5)
    { id: 1, competency: 'cognitivas', text: 'Disfruto resolviendo problemas complejos y desafiantes' },
    { id: 2, competency: 'cognitivas', text: 'Analizo información antes de tomar decisiones' },
    { id: 3, competency: 'cognitivas', text: 'Me gusta aprender cosas nuevas constantemente' },
    { id: 4, competency: 'cognitivas', text: 'Pienso de manera crítica sobre lo que leo o escucho' },
    { id: 5, competency: 'cognitivas', text: 'Encuentro soluciones creativas a problemas difíciles' },
    
    // Competencias Sociales (6-10)
    { id: 6, competency: 'sociales', text: 'Me siento cómodo trabajando en equipo' },
    { id: 7, competency: 'sociales', text: 'Escucho activamente cuando otros hablan' },
    { id: 8, competency: 'sociales', text: 'Expreso mis ideas de manera clara' },
    { id: 9, competency: 'sociales', text: 'Me relaciono fácilmente con personas nuevas' },
    { id: 10, competency: 'sociales', text: 'Ayudo a otros cuando tienen dificultades' },
    
    // Competencias Éticas (11-15)
    { id: 11, competency: 'eticas', text: 'Actúo con honestidad incluso cuando es difícil' },
    { id: 12, competency: 'eticas', text: 'Cumple con mis compromisos y responsabilidades' },
    { id: 13, competency: 'eticas', text: 'Respeto las opiniones diferentes a las mías' },
    { id: 14, competency: 'eticas', text: 'Me preocupa el impacto de mis acciones en otros' },
    { id: 15, competency: 'eticas', text: 'Defiendo lo que creo que es correcto' },
    
    // Liderazgo (16-20)
    { id: 16, competency: 'liderazgo', text: 'Tomo la iniciativa en proyectos grupales' },
    { id: 17, competency: 'liderazgo', text: 'Motivo e inspiro a otros' },
    { id: 18, competency: 'liderazgo', text: 'Delego tareas efectivamente' },
    { id: 19, competency: 'liderazgo', text: 'Guío a otros hacia metas comunes' },
    { id: 20, competency: 'liderazgo', text: 'Asumo responsabilidad por mis decisiones' },
    
    // Manejo de Crisis (21-25)
    { id: 21, competency: 'crisis', text: 'Mantengo la calma en situaciones de presión' },
    { id: 22, competency: 'crisis', text: 'Tomo decisiones rápidas cuando es necesario' },
    { id: 23, competency: 'crisis', text: 'Me adapto bien a cambios inesperados' },
    { id: 24, competency: 'crisis', text: 'Busco soluciones en momentos difíciles' },
    { id: 25, competency: 'crisis', text: 'Manejo bien el estrés en emergencias' },
    
    // Negociación (26-30)
    { id: 26, competency: 'negociacion', text: 'Encuentro acuerdos beneficiosos para todos' },
    { id: 27, competency: 'negociacion', text: 'Persuado a otros con argumentos sólidos' },
    { id: 28, competency: 'negociacion', text: 'Medio conflictos entre personas' },
    { id: 29, competency: 'negociacion', text: 'Negocio condiciones favorables' },
    { id: 30, competency: 'negociacion', text: 'Construyo consensos en grupos' },
    
    // Resiliencia (31-35)
    { id: 31, competency: 'resiliencia', text: 'Me recupero rápidamente de fracasos' },
    { id: 32, competency: 'resiliencia', text: 'Aprendo de mis errores' },
    { id: 33, competency: 'resiliencia', text: 'Persisto ante obstáculos difíciles' },
    { id: 34, competency: 'resiliencia', text: 'Mantengo optimismo en situaciones adversas' },
    { id: 35, competency: 'resiliencia', text: 'Veo los desafíos como oportunidades' },
    
    // Equilibrio Emocional (36-40)
    { id: 36, competency: 'emocional', text: 'Reconozco y manejo mis emociones' },
    { id: 37, competency: 'emocional', text: 'Mantengo equilibrio emocional bajo estrés' },
    { id: 38, competency: 'emocional', text: 'Practico autocuidado regularmente' },
    { id: 39, competency: 'emocional', text: 'Evito el agotamiento (burnout)' },
    { id: 40, competency: 'emocional', text: 'Gestiono bien mi tiempo y energía' },
    
    // Análisis Estratégico (41-45)
    { id: 41, competency: 'estrategico', text: 'Planifico a largo plazo' },
    { id: 42, competency: 'estrategico', text: 'Analizo tendencias y patrones' },
    { id: 43, competency: 'estrategico', text: 'Anticipo posibles problemas futuros' },
    { id: 44, competency: 'estrategico', text: 'Desarrollo estrategias efectivas' },
    { id: 45, competency: 'estrategico', text: 'Evalúo riesgos antes de actuar' }
];

// Recommendations Database
const RECOMMENDATIONS = {
    cognitivas: {
        webs: [
            { name: 'Coursera - Pensamiento Crítico', url: 'https://coursera.org', objective: 'Desarrollar habilidades de análisis crítico' },
            { name: 'Khan Academy', url: 'https://khanacademy.org', objective: 'Fortalecer razonamiento lógico-matemático' }
        ],
        apps: [
            { name: 'Lumosity', objective: 'Entrenamiento cognitivo diario' },
            { name: 'Elevate', objective: 'Mejorar procesamiento mental' }
        ],
        videos: [
            { name: 'TED - Cómo pensar críticamente', url: 'https://ted.com', objective: 'Inspirar pensamiento analítico' }
        ],
        trabajos: [
            { name: 'Asistente de investigación', objective: 'Practicar análisis de datos' },
            { name: 'Tutor académico', objective: 'Desarrollar explicación de conceptos complejos' }
        ]
    },
    sociales: {
        webs: [
            { name: 'LinkedIn Learning - Comunicación', url: 'https://linkedin.com/learning', objective: 'Mejorar habilidades comunicativas' },
            { name: 'Meetup', url: 'https://meetup.com', objective: 'Practicar networking social' }
        ],
        apps: [
            { name: 'Toastmasters International', objective: 'Desarrollar oratoria' },
            { name: 'Blinkist', objective: 'Aprender comunicación efectiva' }
        ],
        videos: [
            { name: 'TED - El poder de la vulnerabilidad', url: 'https://ted.com', objective: 'Comprender conexión humana' }
        ],
        trabajos: [
            { name: 'Voluntariado comunitario', objective: 'Practicar empatía y trabajo en equipo' },
            { name: 'Atención al cliente', objective: 'Desarrollar comunicación asertiva' }
        ]
    },
    eticas: {
        webs: [
            { name: 'edX - Ética Profesional', url: 'https://edx.org', objective: 'Estudiar fundamentos éticos' },
            { name: 'Harvard Justice', url: 'https://justiceharvard.org', objective: 'Reflexionar sobre justicia moral' }
        ],
        apps: [
            { name: 'Philosophy Terms', objective: 'Aprender conceptos éticos' }
        ],
        videos: [
            { name: 'Documental - The Social Dilemma', objective: 'Reflexionar sobre ética tecnológica' }
        ],
        trabajos: [
            { name: 'Organización sin fines de lucro', objective: 'Servicio con propósito social' },
            { name: 'Comité de ética estudiantil', objective: 'Practicar toma de decisiones éticas' }
        ]
    },
    liderazgo: {
        webs: [
            { name: 'MindTools - Liderazgo', url: 'https://mindtools.com', objective: 'Aprender técnicas de liderazgo' },
            { name: 'Harvard Business Review', url: 'https://hbr.org', objective: 'Estudiar casos de liderazgo' }
        ],
        apps: [
            { name: 'Leadership Challenge', objective: 'Simular decisiones de liderazgo' }
        ],
        videos: [
            { name: 'TED - Líderes que inspiran', url: 'https://ted.com', objective: 'Observar estilos de liderazgo efectivo' }
        ],
        trabajos: [
            { name: 'Líder de proyecto universitario', objective: 'Practicar gestión de equipos' },
            { name: 'Coordinador de evento', objective: 'Desarrollar organización y delegación' }
        ]
    },
    crisis: {
        webs: [
            { name: ' FEMA Training', url: 'https://training.fema.gov', objective: 'Aprender gestión de emergencias' },
            { name: 'Psychology Today - Stress Management', url: 'https://psychologytoday.com', objective: 'Técnicas de manejo de crisis' }
        ],
        apps: [
            { name: 'Calm', objective: 'Mantener calma bajo presión' },
            { name: 'Headspace', objective: 'Meditación para claridad mental' }
        ],
        videos: [
            { name: 'TED - Trabajar bajo presión', url: 'https://ted.com', objective: 'Estrategias para crisis' }
        ],
        trabajos: [
            { name: 'Brigadista universitario', objective: 'Practicar respuesta a emergencias' },
            { name: 'Voluntario en cruz roja', objective: 'Desarrollar manejo de situaciones críticas' }
        ]
    },
    negociacion: {
        webs: [
            { name: 'Harvard Negotiation Project', url: 'https://pon.harvard.edu', objective: 'Aprender método Harvard' },
            { name: 'Negotiation Mastery Online', url: 'https://online.hbs.edu', objective: 'Técnicas avanzadas de negociación' }
        ],
        apps: [
            { name: 'Negotiation Simulator', objective: 'Practicar escenarios de negociación' }
        ],
        videos: [
            { name: 'TED - El arte de negociar', url: 'https://ted.com', objective: 'Estrategias win-win' }
        ],
        trabajos: [
            { name: 'Ventas part-time', objective: 'Practicar persuasión y cierre' },
            { name: 'Mediador estudiantil', objective: 'Resolver conflictos entre pares' }
        ]
    },
    resiliencia: {
        webs: [
            { name: 'Positive Psychology Program', url: 'https://positivepsychology.com', objective: 'Desarrollar mentalidad de crecimiento' },
            { name: 'Resilience Builder', url: 'https://resiliencebuilder.com', objective: 'Herramientas de resiliencia' }
        ],
        apps: [
            { name: 'Woebot', objective: 'Soporte emocional AI' },
            { name: 'Moodpath', objective: 'Seguimiento emocional' }
        ],
        videos: [
            { name: 'TED - El poder de creer', url: 'https://ted.com', objective: 'Fortalecer autoeficacia' }
        ],
        trabajos: [
            { name: 'Deportes competitivos', objective: 'Aprender a manejar victorias y derrotas' },
            { name: 'Emprendimiento estudiantil', objective: 'Desarrollar perseverancia' }
        ]
    },
    emocional: {
        webs: [
            { name: 'Greater Good Science Center', url: 'https://greatergood.berkeley.edu', objective: 'Ciencia del bienestar emocional' },
            { name: 'Emotional Intelligence 2.0', url: 'https://talentsmart.com', objective: 'Desarrollar IE' }
        ],
        apps: [
            { name: 'Daylio', objective: 'Diario emocional' },
            { name: 'Sanvello', objective: 'Gestión de ansiedad y estrés' }
        ],
        videos: [
            { name: 'TED - Inteligencia Emocional', url: 'https://ted.com', objective: 'Comprender y regular emociones' }
        ],
        trabajos: [
            { name: 'Peer counselor', objective: 'Apoyo emocional a compañeros' },
            { name: 'Instructor de yoga/meditación', objective: 'Practicar equilibrio interior' }
        ]
    },
    estrategico: {
        webs: [
            { name: 'Strategic Thinking Institute', url: 'https://strategicthinkinginstitute.com', objective: 'Desarrollar pensamiento estratégico' },
            { name: 'MIT OpenCourseWare - Strategy', url: 'https://ocw.mit.edu', objective: 'Estudiar estrategia formal' }
        ],
        apps: [
            { name: 'Chess.com', objective: 'Desarrollar pensamiento táctico' },
            { name: 'Strategy Games', objective: 'Practicar planificación a largo plazo' }
        ],
        videos: [
            { name: 'TED - Pensamiento sistémico', url: 'https://ted.com', objective: 'Ver el panorama completo' }
        ],
        trabajos: [
            { name: 'Analista de datos junior', objective: 'Identificar patrones y tendencias' },
            { name: 'Planificador de eventos', objective: 'Desarrollar visión integral' }
        ]
    }
};

// Current user state
let currentUser = null;
let currentRole = null;
let radarChart = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    DB.initialize();
    setupEventListeners();
});

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Go to register page
    document.getElementById('goToRegisterBtn')?.addEventListener('click', () => {
        document.getElementById('loginPage').classList.add('d-none');
        document.getElementById('registerPage').classList.remove('d-none');
    });
    
    // Go to login page
    document.getElementById('goToLoginBtn')?.addEventListener('click', () => {
        document.getElementById('registerPage').classList.add('d-none');
        document.getElementById('loginPage').classList.remove('d-none');
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.dataset.page);
        });
    });
    
    // Goals form
    document.getElementById('goalsForm').addEventListener('submit', handleGoalsSubmit);
    
    // Test submission
    document.getElementById('submitTest').addEventListener('click', submitTest);
    
    // Admin: Add user
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
    
    // Admin: Clear data
    document.getElementById('clearDataBtn').addEventListener('click', clearDatabase);
    
    // Load edit participants modal when it's shown
    document.getElementById('editParticipantModal')?.addEventListener('show.bs.modal', function() {
        if (typeof window.loadEditParticipantsModal === 'function') {
            window.loadEditParticipantsModal();
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = DB.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        currentRole = user.role;
        
        document.getElementById('loginPage').classList.add('d-none');
        document.getElementById('mainApp').classList.remove('d-none');
        document.getElementById('userName').textContent = user.fullName;
        
        // Setup navigation based on role
        document.getElementById('participantNav').style.display = user.role === 'participante' ? 'flex' : 'none';
        document.getElementById('instructorNav').style.display = user.role === 'instructor' ? 'flex' : 'none';
        document.getElementById('adminNav').style.display = user.role === 'admin' ? 'flex' : 'none';
        
        // Load appropriate page
        if (user.role === 'participante') {
            navigateTo('goals');
            loadInstructors();
        } else if (user.role === 'instructor') {
            navigateTo('instructor-dashboard');
            loadInstructorDashboard();
        } else if (user.role === 'admin') {
            navigateTo('admin-dashboard');
            loadAdminDashboard();
        }
    } else {
        alert('❌ Credenciales incorrectas. Intenta de nuevo.');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const fullName = document.getElementById('regFullName').value;
    const role = document.getElementById('regRole').value;
    
    const users = DB.getUsers();
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert('⚠️ El nombre de usuario ya existe. Por favor elige otro.');
        return;
    }
    
    const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: username,
        password: password,
        fullName: fullName,
        role: role
    };
    
    users.push(newUser);
    DB.setUsers(users);
    
    alert('✅ Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
    
    // Go back to login page
    document.getElementById('registerPage').classList.add('d-none');
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('registerForm').reset();
}

function handleLogout() {
    currentUser = null;
    currentRole = null;
    document.getElementById('mainApp').classList.add('d-none');
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('loginForm').reset();
}

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.content-page').forEach(p => p.classList.add('d-none'));
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // Show selected page
    const pageMap = {
        'goals': 'goalsPage',
        'test': 'testPage',
        'results': 'resultsPage',
        'recommendations': 'recommendationsPage',
        'instructor-dashboard': 'instructorDashboardPage',
        'admin-dashboard': 'adminDashboardPage'
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        document.getElementById(pageId).classList.remove('d-none');
    }
    
    // Set active nav link
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
    
    // Load page-specific content
    if (page === 'test' && currentUser) {
        loadTest();
    } else if (page === 'results' && currentUser) {
        loadResults();
    } else if (page === 'recommendations' && currentUser) {
        loadRecommendations();
    }
}

function loadInstructors() {
    const users = DB.getUsers();
    const instructors = users.filter(u => u.role === 'instructor');
    
    const select = document.getElementById('selectedInstructor');
    select.innerHTML = '<option value="">Selecciona un instructor...</option>';
    
    instructors.forEach(inst => {
        const option = document.createElement('option');
        option.value = inst.id;
        option.textContent = inst.fullName;
        select.appendChild(option);
    });
}

function handleGoalsSubmit(e) {
    e.preventDefault();
    
    const profile = {
        userId: currentUser.id,
        lifeGoals: document.getElementById('lifeGoals').value,
        passions: document.getElementById('passions').value,
        personalGoals: document.getElementById('personalGoals').value,
        selectedRole: document.getElementById('selectedRole').value,
        selectedInstructor: document.getElementById('selectedInstructor').value,
        timestamp: new Date().toISOString()
    };
    
    const profiles = DB.getProfiles();
    const existingIndex = profiles.findIndex(p => p.userId === currentUser.id);
    
    if (existingIndex >= 0) {
        profiles[existingIndex] = profile;
    } else {
        profiles.push(profile);
    }
    
    DB.setProfiles(profiles);
    
    alert('✅ ¡Metas guardadas exitosamente! Ahora completa el test de competencias.');
    navigateTo('test');
}

function loadTest() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    TEST_QUESTIONS.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-4 p-3 border rounded';
        questionDiv.innerHTML = `
            <p class="fw-bold mb-2">${index + 1}. ${q.text}</p>
            <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" name="q${q.id}" id="q${q.id}_1" value="1" autocomplete="off">
                <label class="btn btn-outline-secondary" for="q${q.id}_1">1 - Nunca</label>
                
                <input type="radio" class="btn-check" name="q${q.id}" id="q${q.id}_2" value="2" autocomplete="off">
                <label class="btn btn-outline-secondary" for="q${q.id}_2">2 - Rara vez</label>
                
                <input type="radio" class="btn-check" name="q${q.id}" id="q${q.id}_3" value="3" autocomplete="off">
                <label class="btn btn-outline-secondary" for="q${q.id}_3">3 - A veces</label>
                
                <input type="radio" class="btn-check" name="q${q.id}" id="q${q.id}_4" value="4" autocomplete="off">
                <label class="btn btn-outline-secondary" for="q${q.id}_4">4 - Frecuentemente</label>
                
                <input type="radio" class="btn-check" name="q${q.id}" id="q${q.id}_5" value="5" autocomplete="off">
                <label class="btn btn-outline-secondary" for="q${q.id}_5">5 - Siempre</label>
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

function submitTest() {
    const answers = {};
    let allAnswered = true;
    
    TEST_QUESTIONS.forEach(q => {
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else {
            answers[q.id] = parseInt(selected.value);
        }
    });
    
    if (!allAnswered) {
        alert('⚠️ Por favor responde todas las preguntas antes de enviar.');
        return;
    }
    
    // Calculate scores by competency
    const scores = {
        cognitivas: 0, sociales: 0, eticas: 0, liderazgo: 0,
        crisis: 0, negociacion: 0, resiliencia: 0, emocional: 0, estrategico: 0
    };
    
    const counts = { ...scores };
    
    TEST_QUESTIONS.forEach(q => {
        scores[q.competency] += answers[q.id];
        counts[q.competency]++;
    });
    
    // Average scores (convert to 1-5 scale)
    Object.keys(scores).forEach(key => {
        scores[key] = Math.round((scores[key] / counts[key]) * 10) / 10;
    });
    
    // Save results
    const result = {
        userId: currentUser.id,
        scores: scores,
        timestamp: new Date().toISOString()
    };
    
    const results = DB.getResults();
    const existingIndex = results.findIndex(r => r.userId === currentUser.id);
    
    if (existingIndex >= 0) {
        results[existingIndex] = result;
    } else {
        results.push(result);
    }
    
    DB.setResults(results);
    
    alert('✅ ¡Test completado! Revisa tus resultados.');
    navigateTo('results');
}

function loadResults() {
    const results = DB.getResults();
    const result = results.find(r => r.userId === currentUser.id);
    
    if (!result) {
        document.getElementById('radarChartContainer').innerHTML = '<p class="text-center">No has completado el test aún.</p>';
        return;
    }
    
    // Get user's selected role
    const profiles = DB.getProfiles();
    const profile = profiles.find(p => p.userId === currentUser.id);
    const selectedRole = profile?.selectedRole;
    
    // Create radar chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    const labels = ['Cognitivas', 'Sociales', 'Éticas', 'Liderazgo', 'Crisis', 'Negociación', 'Resiliencia', 'Emocional', 'Estratégico'];
    const userScores = Object.values(result.scores);
    
    let requiredScores = null;
    if (selectedRole && MATRIX_2_2[selectedRole]) {
        requiredScores = Object.values(MATRIX_2_2[selectedRole].competencies);
    }
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Tu Puntuación',
                    data: userScores,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
    
    // Add required scores if role selected
    if (requiredScores) {
        radarChart.data.datasets.push({
            label: `Requerido (${MATRIX_2_2[selectedRole].name})`,
            data: requiredScores,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
        });
        radarChart.update();
    }
    
    // Identify areas to improve and strengths
    const improvementAreas = document.getElementById('improvementAreas');
    const strengths = document.getElementById('strengths');
    improvementAreas.innerHTML = '';
    strengths.innerHTML = '';
    
    const competencyNames = {
        cognitivas: 'Competencias Cognitivas',
        sociales: 'Competencias Sociales',
        eticas: 'Competencias Éticas',
        liderazgo: 'Liderazgo',
        crisis: 'Manejo de Crisis',
        negociacion: 'Negociación',
        resiliencia: 'Resiliencia',
        emocional: 'Equilibrio Emocional',
        estrategico: 'Análisis Estratégico'
    };
    
    Object.entries(result.scores).forEach(([key, score]) => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        
        let required = 3; // Default medium requirement
        if (selectedRole && MATRIX_2_2[selectedRole]) {
            required = MATRIX_2_2[selectedRole].competencies[key];
        }
        
        const gap = required - score;
        
        if (score < 3) {
            card.innerHTML = `
                <div class="card competency-card low p-3">
                    <h6 class="fw-bold">⚠️ ${competencyNames[key]}</h6>
                    <p class="mb-1">Tu nivel: <strong>${score}/5</strong></p>
                    <p class="mb-1 small text-muted">Necesitas mejorar esta competencia</p>
                </div>
            `;
            improvementAreas.appendChild(card);
        } else if (gap > 1) {
            card.innerHTML = `
                <div class="card competency-card medium p-3">
                    <h6 class="fw-bold">📈 ${competencyNames[key]}</h6>
                    <p class="mb-1">Tu nivel: <strong>${score}/5</strong></p>
                    <p class="mb-1 small text-muted">Requerido para tu rol: ${required}/5 - Puedes mejorar</p>
                </div>
            `;
            improvementAreas.appendChild(card);
        } else if (score >= 4) {
            card.innerHTML = `
                <div class="card competency-card high p-3">
                    <h6 class="fw-bold">✅ ${competencyNames[key]}</h6>
                    <p class="mb-1">Tu nivel: <strong>${score}/5</strong></p>
                    <p class="mb-1 small text-muted">¡Excelente fortaleza!</p>
                </div>
            `;
            strengths.appendChild(card);
        }
    });
    
    // Role suggestion based on strengths
    if (selectedRole) {
        const roleData = MATRIX_2_2[selectedRole];
        const suggestionDiv = document.getElementById('roleSuggestion');
        const suggestionText = document.getElementById('roleSuggestionText');
        
        const highScores = Object.entries(result.scores)
            .filter(([_, score]) => score >= 4)
            .map(([key, _]) => key);
        
        const roleTop3 = Object.entries(roleData.competencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key, _]) => key);
        
        const matches = highScores.filter(h => roleTop3.includes(h));
        
        if (matches.length >= 2) {
            suggestionDiv.classList.remove('d-none');
            suggestionText.innerHTML = `
                Tienes fortalezas en <strong>${matches.join(', ')}</strong> que son clave para el rol de 
                <strong>${roleData.emoji} ${roleData.name}</strong>. 
                ¡Este rol podría ser ideal para ti! Tus competencias principales coinciden con los requisitos.
            `;
        }
    }
}

function loadRecommendations() {
    const results = DB.getResults();
    const result = results.find(r => r.userId === currentUser.id);
    
    if (!result) {
        document.getElementById('recommendationsContainer').innerHTML = '<p>Completa el test primero para ver recomendaciones.</p>';
        return;
    }
    
    const container = document.getElementById('recommendationsContainer');
    container.innerHTML = '';
    
    // Find competencies that need improvement (score < 3.5)
    const needsImprovement = Object.entries(result.scores)
        .filter(([_, score]) => score < 3.5)
        .map(([key, _]) => key);
    
    if (needsImprovement.length === 0) {
        container.innerHTML = '<div class="alert alert-success">¡Felicidades! Todas tus competencias están en buen nivel. Sigue desarrollándote.</div>';
        return;
    }
    
    needsImprovement.forEach(compKey => {
        const recs = RECOMMENDATIONS[compKey];
        if (!recs) return;
        
        const compName = {
            cognitivas: 'Competencias Cognitivas',
            sociales: 'Competencias Sociales',
            eticas: 'Competencias Éticas',
            liderazgo: 'Liderazgo',
            crisis: 'Manejo de Crisis',
            negociacion: 'Negociación',
            resiliencia: 'Resiliencia',
            emocional: 'Equilibrio Emocional',
            estrategico: 'Análisis Estratégico'
        }[compKey];
        
        const card = document.createElement('div');
        card.className = 'col-lg-6';
        card.innerHTML = `
            <div class="card recommendation-card h-100">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">📚 ${compName}</h5>
                </div>
                <div class="card-body">
                    <h6 class="fw-bold">🌐 Páginas Web</h6>
                    <ul class="list-unstyled">
                        ${recs.webs.map(w => `<li class="mb-2"><a href="${w.url}" target="_blank" class="text-decoration-none">➡️ ${w.name}</a><br><small class="text-muted">Objetivo: ${w.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">📱 Aplicaciones</h6>
                    <ul class="list-unstyled">
                        ${recs.apps.map(a => `<li class="mb-2">📲 <strong>${a.name}</strong><br><small class="text-muted">Objetivo: ${a.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">🎥 Videos</h6>
                    <ul class="list-unstyled">
                        ${recs.videos.map(v => `<li class="mb-2"><a href="${v.url}" target="_blank" class="text-decoration-none">▶️ ${v.name}</a><br><small class="text-muted">Objetivo: ${v.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">💼 Trabajos Temporales</h6>
                    <ul class="list-unstyled">
                        ${recs.trabajos.map(t => `<li class="mb-2">💼 <strong>${t.name}</strong><br><small class="text-muted">Objetivo: ${t.objective}</small></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function loadInstructorDashboard() {
    const profiles = DB.getProfiles();
    const results = DB.getResults();
    const users = DB.getUsers();
    
    // Get all participants (users with role 'participante')
    const allParticipants = users.filter(u => u.role === 'participante');
    
    const tbody = document.getElementById('participantsTable');
    tbody.innerHTML = '';
    
    if (allParticipants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay participantes registrados</td></tr>';
        return;
    }
    
    allParticipants.forEach(participant => {
        const profile = profiles.find(p => p.userId === participant.id);
        const result = results.find(r => r.userId === participant.id);
        
        // Find the instructor assigned to this participant
        let instructorName = 'Sin asignar';
        if (profile && profile.selectedInstructor) {
            const instructor = users.find(u => u.id == profile.selectedInstructor);
            instructorName = instructor ? instructor.fullName : 'Sin asignar';
        }
        
        const row = document.createElement('tr');
        
        let strengths = '-';
        let improvements = '-';
        let recommendations = '-';
        
        if (result) {
            const strongComps = Object.entries(result.scores)
                .filter(([_, s]) => s >= 4)
                .map(([k, _]) => k)
                .slice(0, 3);
            
            const weakComps = Object.entries(result.scores)
                .filter(([_, s]) => s < 3.5)
                .map(([k, _]) => k)
                .slice(0, 3);
            
            strengths = strongComps.length > 0 ? strongComps.join(', ') : '-';
            improvements = weakComps.length > 0 ? weakComps.join(', ') : '-';
            recommendations = weakComps.length > 0 ? `${weakComps.length} áreas` : '-';
        }
        
        row.innerHTML = `
            <td>${participant?.fullName || 'N/A'}</td>
            <td>${MATRIX_2_2[profile?.selectedRole]?.emoji || ''} ${MATRIX_2_2[profile?.selectedRole]?.name || profile?.selectedRole || 'No definido'}</td>
            <td>${instructorName}</td>
            <td><small>${profile?.lifeGoals ? profile.lifeGoals.substring(0, 30) + '...' : '-'}</small></td>
            <td>${strengths}</td>
            <td class="text-danger">${improvements}</td>
            <td>${recommendations}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewParticipantDetails(${participant?.id})">👁️ Ver</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Make function globally available for onclick handlers
window.loadEditParticipantsModal = function() {
    const profiles = DB.getProfiles();
    const users = DB.getUsers();
    const instructors = users.filter(u => u.role === 'instructor');
    const participants = users.filter(u => u.role === 'participante');
    
    const tbody = document.getElementById('editParticipantsTable');
    tbody.innerHTML = '';
    
    if (participants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay participantes registrados</td></tr>';
        return;
    }
    
    participants.forEach(participant => {
        const profile = profiles.find(p => p.userId === participant.id);
        let currentInstructorId = profile?.selectedInstructor || '';
        let currentInstructorName = 'Sin asignar';
        
        if (currentInstructorId) {
            const instructor = users.find(u => u.id == currentInstructorId);
            currentInstructorName = instructor ? instructor.fullName : 'Sin asignar';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant.fullName}</td>
            <td id="current-inst-${participant.id}">${currentInstructorName}</td>
            <td>
                <select class="form-select form-select-sm" id="new-inst-${participant.id}">
                    <option value="">Sin asignar</option>
                    ${instructors.map(inst => `<option value="${inst.id}" ${inst.id == currentInstructorId ? 'selected' : ''}>${inst.fullName}</option>`).join('')}
                </select>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="updateParticipantInstructor(${participant.id})">💾 Guardar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Make function globally available for onclick handlers
window.updateParticipantInstructor = function(participantId) {
    const newInstructorId = document.getElementById(`new-inst-${participantId}`).value;
    
    const profiles = DB.getProfiles();
    const profileIndex = profiles.findIndex(p => p.userId === participantId);
    
    if (profileIndex >= 0) {
        profiles[profileIndex].selectedInstructor = newInstructorId || '';
        DB.setProfiles(profiles);
        
        // Update the display
        const users = DB.getUsers();
        const participant = users.find(u => u.id === participantId);
        let newInstructorName = 'Sin asignar';
        if (newInstructorId) {
            const instructor = users.find(u => u.id == newInstructorId);
            newInstructorName = instructor ? instructor.fullName : 'Sin asignar';
        }
        document.getElementById(`current-inst-${participantId}`).textContent = newInstructorName;
        
        alert('✅ Instructor actualizado exitosamente');
        
        // Refresh the main dashboard table
        loadInstructorDashboard();
    } else {
        // Create a new profile if it doesn't exist
        const newProfile = {
            userId: participantId,
            selectedInstructor: newInstructorId || '',
            timestamp: new Date().toISOString()
        };
        profiles.push(newProfile);
        DB.setProfiles(profiles);
        
        alert('✅ Instructor asignado exitosamente');
        loadInstructorDashboard();
    }
};

window.viewParticipantDetails = function(userId) {
    alert('Funcionalidad de detalle en desarrollo para usuario ID: ' + userId);
};

function loadAdminDashboard() {
    const users = DB.getUsers();
    const profiles = DB.getProfiles();
    
    // Update stats
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalParticipants').textContent = users.filter(u => u.role === 'participante').length;
    document.getElementById('totalInstructors').textContent = users.filter(u => u.role === 'instructor').length;
    
    // Load users table
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td><span class="badge bg-${user.role === 'admin' ? 'danger' : user.role === 'instructor' ? 'primary' : 'success'}">${user.role}</span></td>
            <td>
                ${user.role !== 'admin' ? `<button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">🗑️ Eliminar</button>` : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleAddUser(e) {
    e.preventDefault();
    
    const users = DB.getUsers();
    const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: document.getElementById('newUsername').value,
        password: document.getElementById('newPassword').value,
        fullName: document.getElementById('newFullName').value,
        role: document.getElementById('newRole').value
    };
    
    users.push(newUser);
    DB.setUsers(users);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    modal.hide();
    
    // Refresh dashboard
    loadAdminDashboard();
    
    alert('✅ Usuario agregado exitosamente');
    document.getElementById('addUserForm').reset();
}

function deleteUser(userId) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    const users = DB.getUsers().filter(u => u.id !== userId);
    DB.setUsers(users);
    
    loadAdminDashboard();
    alert('✅ Usuario eliminado');
}

function clearDatabase() {
    if (!confirm('⚠️ ¿ESTÁS SEGURO? Esto eliminará TODOS los datos excepto usuarios admin.')) return;
    
    const users = DB.getUsers().filter(u => u.role === 'admin');
    DB.setUsers(users);
    DB.setProfiles([]);
    DB.setResults([]);
    
    loadAdminDashboard();
    alert('✅ Base de datos limpiada (se mantuvieron admins)');
}
