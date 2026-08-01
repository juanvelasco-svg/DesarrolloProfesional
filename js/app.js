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

// Matrix 2.2 - Roles and Competencies with youth language
const MATRIX_2_2 = {
    ALTA_GERENCIA: {
        name: 'Alta Gerencia',
        emoji: '👔',
        youthName: 'Manager exitoso',
        youthDescription: 'Lideras la empresa, tomas las decisiones importantes y gestionas equipos grandes',
        competencies: {
            cognitivas: 5, sociales: 5, eticas: 5, liderazgo: 5,
            crisis: 5, negociacion: 5, resiliencia: 5, emocional: 5, estrategico: 5
        },
        top3: ['Análisis Estratégico', 'Liderazgo', 'Manejo de Crisis']
    },
    EMPRENDEDOR: {
        name: 'Emprendedor',
        emoji: '💡',
        youthName: 'Emprender',
        youthDescription: 'Creas tu propio negocio, innovas y haces realidad tus ideas locas',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 4, liderazgo: 4,
            crisis: 4, negociacion: 4, resiliencia: 5, emocional: 4, estrategico: 4
        },
        top3: ['Resiliencia', 'Negociación', 'Análisis Estratégico']
    },
    INVESTIGADOR: {
        name: 'Investigador',
        emoji: '🔬',
        youthName: 'Científico/a',
        youthDescription: 'Descubres cosas nuevas, investigas a fondo y eres un crack resolviendo misterios',
        competencies: {
            cognitivas: 5, sociales: 2, eticas: 4, liderazgo: 2,
            crisis: 2, negociacion: 2, resiliencia: 4, emocional: 4, estrategico: 5
        },
        top3: ['Competencias Cognitivas', 'Análisis Estratégico', 'Resiliencia']
    },
    GESTION_PUBLICA: {
        name: 'Gestión Pública',
        emoji: '🏛️',
        youthName: 'Servidor/a Público valioso',
        youthDescription: 'Trabajas para el gobierno ayudando a la gente y mejorando tu comunidad',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 5, liderazgo: 4,
            crisis: 5, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 4
        },
        top3: ['Competencias Éticas', 'Manejo de Crisis', 'Liderazgo']
    },
    EDUCACION: {
        name: 'Educación',
        emoji: '📚',
        youthName: 'El/La Profe',
        youthDescription: 'Enseñas a otros, compartes conocimiento y ayudas a crecer a más personas',
        competencies: {
            cognitivas: 4, sociales: 5, eticas: 4, liderazgo: 4,
            crisis: 2, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Sociales', 'Equilibrio Emocional', 'Liderazgo']
    },
    SALUD: {
        name: 'Salud',
        emoji: '🏥',
        youthName: 'Medico/a excepcional',
        youthDescription: 'Cuidas de la salud de las personas, salvas vidas y haces que otros se sientan mejor',
        competencies: {
            cognitivas: 5, sociales: 5, eticas: 4, liderazgo: 4,
            crisis: 5, negociacion: 2, resiliencia: 4, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Sociales', 'Manejo de Crisis', 'Equilibrio Emocional']
    },
    IMPACTO_SOCIAL: {
        name: 'Impacto Social',
        emoji: '🌍',
        youthName: 'Activista para crecer',
        youthDescription: 'Luchas por un mundo mejor, ayudas a los demás y cambias la sociedad',
        competencies: {
            cognitivas: 2, sociales: 4, eticas: 5, liderazgo: 4,
            crisis: 4, negociacion: 4, resiliencia: 5, emocional: 4, estrategico: 2
        },
        top3: ['Competencias Éticas', 'Resiliencia', 'Competencias Sociales']
    },
    SOSTENIBILIDAD: {
        name: 'Sostenibilidad',
        emoji: '♻️',
        youthName: 'Eco-Guerrero/a',
        youthDescription: 'Proteges el planeta, promueves el reciclaje y cuidas el medio ambiente',
        competencies: {
            cognitivas: 4, sociales: 4, eticas: 5, liderazgo: 2,
            crisis: 4, negociacion: 4, resiliencia: 4, emocional: 4, estrategico: 5
        },
        top3: ['Competencias Éticas', 'Análisis Estratégico', 'Competencias Cognitivas']
    }
};

// Competencies with youth language
const COMPETENCIES_YOUTH = {
    cognitivas: {
        name: 'Competencias Cognitivas',
        youthName: '🧠 Tu Cerebro Potente',
        youthDescription: 'Eres bueno/a pensando, analizando problemas y encontrando soluciones inteligentes'
    },
    sociales: {
        name: 'Competencias Sociales',
        youthName: '🤝 Tu Superpoder Social',
        youthDescription: 'Te llevas bien con todos, sabes escuchar y te expresas de manera clara'
    },
    eticas: {
        name: 'Competencias Éticas',
        youthName: '⭐ Tu Brújula Moral',
        youthDescription: 'Actúas con honestidad, respetas a los demás y haces lo correcto siempre'
    },
    liderazgo: {
        name: 'Liderazgo',
        youthName: '🚀 Tu Capacidad de Liderar',
        youthDescription: 'Tomas la iniciativa, motivas a otros y guías al equipo hacia el éxito'
    },
    crisis: {
        name: 'Manejo de Crisis',
        youthName: '🔥 Tu Calma Bajo Presión',
        youthDescription: 'Mantienes la calma cuando todo es un caos y tomas decisiones rápidas'
    },
    negociacion: {
        name: 'Negociación',
        youthName: '💬 Tu Habilidad para Negociar',
        youthDescription: 'Logras acuerdos donde todos ganan y convences con buenos argumentos'
    },
    resiliencia: {
        name: 'Resiliencia',
        youthName: '💪 Tu Fuerza Interior',
        youthDescription: 'Te levantas después de caer, aprendes de tus errores y no te rindes'
    },
    emocional: {
        name: 'Equilibrio Emocional',
        youthName: '😌 Tu Paz Interior',
        youthDescription: 'Controlas tus emociones, manejas el estrés y mantienes el equilibrio'
    },
    estrategico: {
        name: 'Análisis Estratégico',
        youthName: '♟️ Tu Visión de Futuro',
        youthDescription: 'Planeas a largo plazo, anticipas problemas y piensas como un estratega'
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
            { name: 'Harvard Online - edX', url: 'https://harvardonline.harvard.edu/course/structure-function-argument-introduction-critical-thinking-0', objective: 'Introducción al pensamiento crítico (gratis sin certificado)' },
            { name: 'Oxford Home Study', url: 'https://www.oxfordhomestudy.com/courses/online-management-courses/critical-thinking-free-online-course', objective: 'Pensamiento Critico' },
            { name: 'Coursera - Pensamiento Crítico', url: 'https://coursera.org', objective: 'Desarrollar habilidades de análisis crítico' },
            { name: 'Khan Academy', url: 'https://khanacademy.org', objective: 'Fortalecer razonamiento lógico-matemático' }
        ],
        apps: [
            { name: 'BrainHQ', url: 'https://play.google.com/store/apps/details/BrainHQ?id=com.positscience.brainhq.app&hl=es_PE', objective: 'Velocidad Mental y Atención' },
            { name: 'CogniFit', url: 'https://play.google.com/store/apps/details?id=com.cognifit.app&hl=es_PE', objective: 'Retos Cognitivos' },
            { name: 'Elevate', url: 'https://play.google.com/store/apps/details?id=com.wonder&hl=es_PE', objective: 'Mejorar procesamiento mental' }
        ],
        videos: [
            { name: 'TED - 5 consejos para mejorar su pensamiento crítico - Samantha Agoos', url: 'https://www.youtube.com/watch?v=YO4pwpaH8Fo', objective: 'Mejora tu análisis' },
            { name: 'TED - Esta herramienta te ayudará a mejorar tu pensamiento crítico - Erick Wilberding', url: 'https://www.youtube.com/watch?v=7C3XUy3BYug', objective: 'Herramienta valiosa' }
        ],
        trabajos: [
            { name: 'Asistente de investigación', objective: 'Practicar análisis de datos' },
            { name: 'Tutor académico', objective: 'Desarrollar explicación de conceptos complejos' }
        ]
    },
    sociales: {
        webs: [
            { name: 'Harvard Online - edX', url: 'https://harvardonline.harvard.edu/program/leadership-and-communication', objective: 'Liderazgo y Comunicación (gratis sin certificado)' },
            { name: 'LinkedIn Learning - Comunicación', url: 'https://es.linkedin.com/learning/topics/comunicacion', objective: 'Mejorar habilidades comunicativas' },
            { name: 'Oxford Home Study', url: 'https://www.oxfordhomestudy.com/courses/customer-service-courses-online/free-communication-skills-courses', objective: 'Habilidades de Comunicación' },
            { name: 'Meetup', url: 'https://meetup.com', objective: 'Practicar networking social (siempre se PRUDENTE)' }
        ],
        apps: [
            { name: 'Habilidades Sociales', url: 'https://play.google.com/store/apps/details/Habilidades_Sociales?id=com.fasabeteam.habilidadessociales&hl=es_PE', objective: 'Conceptos Actuales' },
            { name: 'Social Skills', url: 'https://play.google.com/store/apps/details?id=in.softecks.socialskills&hl=es_PE', objective: 'Aprendizaje Completo' }
        ],
        videos: [
            { name: 'TED - El poder de la vulnerabilidad', url: 'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability', objective: 'Comprender conexión humana' }
        ],
        trabajos: [
            { name: 'Voluntariado comunitario', objective: 'Practicar empatía y trabajo en equipo' },
            { name: 'Atención al cliente', objective: 'Desarrollar comunicación asertiva' }
        ]
    },
    eticas: {
        webs: [
            { name: 'Harvard - Centro de Ética', url: 'https://www.ethics.harvard.edu/what-practical-ethics', objective: 'Ética IA para Lideres de Negocios' },
            { name: 'Harvard Justice', url: 'https://www.edx.org/learn/justice/harvard-university-justice', objective: 'Reflexionar sobre justicia moral (gratis como "Audit course"' }
        ],
        apps: [
            { name: 'Ethics', url: 'https://play.google.com/store/apps/details?id=com.sqstech.ethics&hl=es_PE',  objective: 'Aprender conceptos éticos' }
        ],
        videos: [
            { name: 'Documental - The Social Dilemma', url: 'https://www.documaniatv.com/ciencia-y-tecnologia/redes-sociales-el-dilema-social-video_e125dff9a.html', objective: 'Reflexionar sobre ética tecnológica' }
        ],
        trabajos: [
            { name: 'Organización sin fines de lucro', objective: 'Servicio con propósito social' },
            { name: 'Comité de ética estudiantil', objective: 'Practicar toma de decisiones éticas' }
        ]
    },
    liderazgo: {
        webs: [
            { name: 'BusinessBalls - Liderazgo y Gerencia', url: 'https://www.businessballs.com/', objective: 'Artículos ligeros de liderazgo' },
            { name: 'Ejerciendo Liderazgo', url: 'https://harvardonline.harvard.edu/course/exercising-leadership-foundational-principles', objective: 'Principios Fundamentales' },
            { name: 'Liderazgo sin temor', url: 'https://www.edx.org/learn/business-management/harvard-university-purpose-perspective-and-persuasion', objective: 'Proposito, Perspectiva y Persuación' },
            { name: 'Oxford - Cualidades de Liderazgo', url: 'https://www.oxfordhomestudy.com/courses/leadership-courses-online/certification-in-leadership-and-management', objective: 'Cualidaes de un lider' },
            { name: 'Business Simulations', url: 'https://businesssimulations.com/insights/articles/five-great-mobile-phone-apps-for-leadership-development-all-free-too/', objective: 'Desarrollo de Liderazgo' }
        ],
        apps: [
            { name: 'Bunch', url: 'https://www.bunch.ai/blog/improve-leadership-skills-app',  objective: 'Desarrollo de habilidades de Liderazgo' }
        ],
        videos: [
            { name: 'TED - Líderes que inspiran', url: 'https://www.youtube.com/watch?v=4bcB5FJq80Q', objective: 'Observar estilos de liderazgo efectivo' }
        ],
        trabajos: [
            { name: 'Líder de proyecto universitario', objective: 'Practicar gestión de equipos' },
            { name: 'Coordinador de evento', objective: 'Desarrollar organización y delegación' }
        ]
    },
    crisis: {
        webs: [
            { name: 'AnahucX', url: 'https://www.edx.org/learn/leadership/universidades-anahuac-inteligencia-emocional-para-el-liderazgo-efectivo-y-colaboracion', objective: 'Inteligencia Emocional para el Liderazgo' },
            { name: 'Oxford Home Study', url: 'https://www.oxfordhomestudy.com/courses/online-management-courses/crisis-management-courses', objective: 'Manejo Gerencial de Crisis' },
            { name: 'Psychology Today - Stress Management', url: 'https://www.psychologytoday.com/us/basics/stress', objective: 'Técnicas de manejo de crisis' }
        ],
        apps: [
            { name: 'Insight Timer', url: 'https://insighttimer.com/', objective: 'Mantener calma' },
            { name: 'Medito Foundation', url: 'https://meditofoundation.org/', objective: 'Construeyendo Conscientemente' }
        ],
        videos: [
            { name: 'TED - Trabajar bajo presión', url: 'https://www.ted.com/talks/andrea_dinardo_thriving_under_pressure', objective: 'Estrategias para crisis' },
            { name: 'TED - El estres tu amigo', url: 'https://www.youtube.com/watch?v=RcGyVTAoXEU', objective: 'Convierte el estres en tu amigo' }
        ],
        trabajos: [
            { name: 'Brigadista universitario', objective: 'Practicar respuesta a emergencias' },
            { name: 'Voluntario en cruz roja', objective: 'Desarrollar manejo de situaciones críticas' }
        ]
    },
    negociacion: {
        webs: [
            { name: 'Harvard Negotiation Project', url: 'https://www.pon.harvard.edu/free-reports/', objective: 'Aprender método Harvard' },
            { name: 'edX - Cursos de Negociación', url: 'https://www.edx.org/es/aprende/negociacion', objective: 'Aprende Habilidades Blandas Imprescindibles' },
            { name: 'HarvardX', url: 'https://www.edx.org/learn/business-management/harvard-university-purpose-perspective-and-persuasion', objective: 'Proposito, Perspectiva y Persuación' },
            { name: 'Introducción a la Negociación - Yale >University', url: 'https://www.coursera.org/learn/negotiation', objective: 'Coursera' }
        ],
        apps: [
            { name: 'Negotiation Skills 101', url: 'https://play.google.com/store/apps/details?id=com.negotiation.skills101', objective: 'Practicar escenarios de negociación' }
        ],
        videos: [
            { name: 'TED - El arte de negociar', url: 'https://www.ted.com/talks/sudeep_sharma_why_should_you_master_the_art_of_negotiation', objective: 'Estrategias win-win' }
        ],
        trabajos: [
            { name: 'Ventas part-time', objective: 'Practicar persuasión y cierre' },
            { name: 'Mediador estudiantil', objective: 'Resolver conflictos entre pares' }
        ]
    },
    resiliencia: {
        webs: [
            { name: 'La Ciencia harvard de la Felicidad', url: 'https://www.edx.org/learn/happiness/university-of-california-berkeley-the-science-of-happiness', objective: 'Principios de Vida Feliz' },
            { name: 'Resilience Builder', url: 'https://www.teachresilience.org/resilience-builder-program-universal/', objective: 'Herramientas de resiliencia' }
        ],
        apps: [
            { name: 'Yana', url: 'https://www.teachresilience.org/resilience-builder-program-universal/', objective: 'Soporte emocional AI' }
        ],
        videos: [
            { name: 'TED - El poder de creer que puedes mejorar', url: 'https://www.youtube.com/watch?v=WiS0waTjeTE', objective: 'Fortalecer autoeficacia' },
            { name: 'TED - El poder de creer en ti', url: 'https://www.ted.com/talks/ceci_wallace_el_poder_de_creer_en_ti', objective: 'Cambia tu vida' }
        ],
        trabajos: [
            { name: 'Deportes competitivos', objective: 'Aprender a manejar victorias y derrotas' },
            { name: 'Emprendimiento estudiantil', objective: 'Desarrollar perseverancia' }
        ]
    },
    emocional: {
        webs: [
            { name: 'Greater Good Science Center', url: 'https://greatergood.berkeley.edu', objective: 'Ciencia del bienestar emocional' },
            { name: 'Salud y Bienestrar Mental', url: 'https://www.helpguide.org/es', objective: 'Desarrollar IE' }
        ],
        apps: [
            { name: 'Journey', url: 'https://journey.cloud/es/downloads', objective: 'Gestión de ansiedad y estrés' }
        ],
        videos: [
            { name: 'TED - Inteligencia Emocional', url: 'https://www.youtube.com/watch?v=6IhuTOYCg-A', objective: 'Daniel Goleman' },
            { name: 'TED - Inteligencia Emocional en el Trabajo', url: 'https://www.ted.com/talks/gabriel_rodriguez_gonzalez_la_inteligencia_emocional_en_el_trabajo', objective: 'Gabriel Rodriguez' }
        ],
        trabajos: [
            { name: 'Peer counselor', objective: 'Apoyo emocional a compañeros' },
            { name: 'Instructor de yoga/meditación', objective: 'Practicar equilibrio interior' }
        ]
    },
    estrategico: {
        webs: [
            { name: 'Strategic Thinking Institute', url: 'https://www.strategyskills.com/', objective: 'Desarrollar pensamiento estratégico' },
            { name: 'MIT OpenCourseWare - Advance Strategy', url: 'https://ocw.mit.edu/courses/15-963-advanced-strategy-spring-2008/', objective: 'Estrategia Avanzada' },
            { name: 'MIT OpenCourseWare - Strategic Management', url: 'https://ocw.mit.edu/courses/15-902-strategic-management-i-fall-2006/', objective: 'Estudiar estrategia formal' },
            { name: 'Harvard edX', url: 'https://www.edx.org/es/aprende/estrategia', objective: 'Cursos de estratégia' }
        ],
        apps: [
            { name: 'Business strategy 2', url:'https://play.google.com/store/apps/details?id=com.DefaultCompany.businessstrategy2', objective: 'Juegos de Negocios' },
            { name: 'Business strategy 3', url:'https://play.google.com/store/apps/details?id=com.Izygames.BusinessStrategy3', objective: 'Juegos de Negocios' },
            { name: 'SimCompanies', url:'https://www.simcompanies.com/', objective: 'Practicar planificación a largo plazo' }
        ],
        videos: [
            { name: 'TED - Pensamiento sistémico', url: 'hhttps://www.youtube.com/watch?v=ElVNiDis1DA', objective: 'Ver el panorama completo' }
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
    
    // Verificar si hay sesión almacenada (útil en móviles para no perder login)
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            currentUser = user;
            currentRole = user.role;
            
            // Restaurar sesión
            document.getElementById('loginPage').classList.add('d-none');
            document.getElementById('mainApp').classList.remove('d-none');
            document.getElementById('userName').textContent = user.fullName;
            
            // Setup navigation based on role
            document.getElementById('participantNav').classList.toggle('d-none', user.role !== 'participante');
            document.getElementById('instructorNav').classList.toggle('d-none', user.role !== 'instructor');
            document.getElementById('adminNav').classList.toggle('d-none', user.role !== 'admin');

            // En móviles, expandir automáticamente el menú de navegación para que el usuario vea las opciones
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && !navbarCollapse.classList.contains('show')) {
                // Usar Bootstrap Collapse para mostrar sin toggle manual
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.show();
            }
            
                    // Load appropriate page
        if (user.role === 'participante') {
            navigateTo('goals');
            loadInstructors();
            // Scroll al contenido principal en móviles
            document.getElementById('goalsPage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (user.role === 'instructor') {
            navigateTo('instructor-dashboard');
            loadInstructorDashboard();
            document.getElementById('instructorDashboardPage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (user.role === 'admin') {
            navigateTo('admin-dashboard');
            loadAdminDashboard();
            document.getElementById('adminDashboardPage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        } catch (e) {
            console.error('Error restaurando sesión:', e);
            sessionStorage.removeItem('currentUser');
        }
    }
});

function setupEventListeners() {
    // Login form
    .getElementById('loginForm').addEventListener('submit', handleLogin);
    
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
    
    // Load edit users modal when it's shown (Admin)
    document.getElementById('editUserModal')?.addEventListener('show.bs.modal', function() {
        if (typeof window.loadEditUsersModal === 'function') {
            window.loadEditUsersModal();
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    // Obtener valores y normalizar (trim para evitar espacios accidentales)
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    let password = passwordInput.value.trim(); // Eliminar espacios al inicio/fin
    
    // LOG DETALLADO PARA DEBUGGING EN MÓVIL
    console.log('=== INTENTO DE LOGIN ===');
    console.log('Username input value:', JSON.stringify(usernameInput.value));
    console.log('Username after trim:', JSON.stringify(username));
    console.log('Password input value:', JSON.stringify(passwordInput.value));
    console.log('Password length:', password.length);
    console.log('Password after trim:', JSON.stringify(password.trim()));
    console.log('Username bytes:', new TextEncoder().encode(username));
    console.log('Password bytes:', new TextEncoder().encode(password));
    
    // Validación básica antes de buscar
    if (!username || !password) {
        console.log('ERROR: Campos vacíos');
        alert('⚠️ Por favor ingresa usuario y contraseña.');
        return;
    }
    
    const users = DB.getUsers();
    
    console.log('Usuarios en la base de datos:', users);
    console.log('Número de usuarios:', users.length);
    
    // Búsqueda case-insensitive para el usuario, exacta para password
    let foundUser = null;
    let matchReason = '';
    
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        console.log(`Comparando con usuario ${i + 1}:`, { 
            storedUsername: u.username, 
            storedPassword: u.password,
            usernameMatch: u.username.toLowerCase() === username.toLowerCase(),
            passwordMatch: u.password === password,
            passwordTrimMatch: u.password === password.trim()
        });
        
                if (u.username.toLowerCase() === username.toLowerCase()) {
            // Comparar contraseñas normalizando espacios
            if (u.password.trim() === password) {
                foundUser = u;
                matchReason = 'coincidencia exacta (normalizada)';
                break;
            }
        }
    }
    
    const user = foundUser;
    
    if (user) {
        console.log('LOGIN EXITOSO:', { user: user.username, reason: matchReason });
        currentUser = user;
        currentRole = user.role;
        
        // Guardar sesión en localStorage para mejor experiencia móvil
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        document.getElementById('loginPage').classList.add('d-none');
        document.getElementById('mainApp').classList.remove('d-none');
        document.getElementById('userName').textContent = user.fullName;
        
        // Setup navigation based on role
        document.getElementById('participantNav').classList.toggle('d-none', user.role !== 'participante');
        document.getElementById('instructorNav').classList.toggle('d-none', user.role !== 'instructor');
        document.getElementById('adminNav').classList.toggle('d-none', user.role !== 'admin');
        
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
        // Mensaje más claro para debugging
        console.log('=== LOGIN FALLIDO ===');
        console.log('Username buscado:', JSON.stringify(username));
        console.log('Password buscado:', JSON.stringify(password));
        console.log('Total usuarios:', users.length);
        console.log('Usuarios disponibles:', users.map(u => u.username));
        alert('❌ Credenciales incorrectas. Revisa la consola del navegador para más detalles.');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    // Normalizar username (trim y case-insensitive check)
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const fullName = document.getElementById('regFullName').value;
    const role = document.getElementById('regRole').value;
    
    // Validaciones básicas
    if (!username || !password || !fullName || !role) {
        alert('⚠️ Por favor completa todos los campos.');
        return;
    }
    
    if (password.length < 4) {
        alert('⚠️ La contraseña debe tener al menos 4 caracteres.');
        return;
    }
    
    const users = DB.getUsers();
    
    // Check if username already exists (case-insensitive)
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
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
    // Limpiar sesión almacenada
    sessionStorage.removeItem('currentUser');
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
    
        // Load roles and competencies for the goals page
    try {
        loadRolesAndCompetencies();
    } catch (e) {
        console.error('Error cargando roles y competencias:', e);
        alert('Ocurrió un error al cargar la página. Por favor recarga.');
    }
}

function loadRolesAndCompetencies() {
    // Load roles selection
    const rolesContainer = document.getElementById('rolesSelection');
    if (rolesContainer) {
        rolesContainer.innerHTML = '';
        Object.keys(MATRIX_2_2).forEach(roleKey => {
            const role = MATRIX_2_2[roleKey];
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4';
            col.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input role-checkbox" type="checkbox" value="${roleKey}" id="role_${roleKey}">
                    <label class="form-check-label" for="role_${roleKey}">
                        <strong>${role.emoji} ${role.youthName}</strong>
                        <small class="d-block text-muted">${role.youthDescription}</small>
                    </label>
                </div>
            `;
            rolesContainer.appendChild(col);
        });
        
        // Add event listeners for role checkboxes
        document.querySelectorAll('.role-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const checked = document.querySelectorAll('.role-checkbox:checked');
                if (checked.length > 3) {
                    this.checked = false;
                    alert('⚠️ Solo puedes seleccionar hasta 3 roles');
                }
                updateRolesCount();
                updateRoleComparison();
            });
        });
    }
    
    // Load competencies selection
    const competenciesContainer = document.getElementById('competenciesSelection');
    if (competenciesContainer) {
        competenciesContainer.innerHTML = '';
        Object.keys(COMPETENCIES_YOUTH).forEach(compKey => {
            const comp = COMPETENCIES_YOUTH[compKey];
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4';
            col.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input competency-checkbox" type="checkbox" value="${compKey}" id="comp_${compKey}">
                    <label class="form-check-label" for="comp_${compKey}">
                        <strong>${comp.youthName}</strong>
                        <small class="d-block text-muted">${comp.youthDescription}</small>
                    </label>
                </div>
            `;
            competenciesContainer.appendChild(col);
        });
        
        // Add event listeners for competency checkboxes
        document.querySelectorAll('.competency-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const checked = document.querySelectorAll('.competency-checkbox:checked');
                if (checked.length > 3) {
                    this.checked = false;
                    alert('⚠️ Solo puedes seleccionar hasta 3 competencias');
                }
                updateCompetenciesCount();
                updateRoleComparison();
            });
        });
    }
}

function updateRolesCount() {
    const count = document.querySelectorAll('.role-checkbox:checked').length;
    document.getElementById('rolesCount').textContent = count;
}

function updateCompetenciesCount() {
    const count = document.querySelectorAll('.competency-checkbox:checked').length;
    document.getElementById('competenciesCount').textContent = count;
}

function updateRoleComparison() {
    const selectedRoles = Array.from(document.querySelectorAll('.role-checkbox:checked')).map(cb => cb.value);
    const selectedCompetencies = Array.from(document.querySelectorAll('.competency-checkbox:checked')).map(cb => cb.value);
    const comparisonDiv = document.getElementById('roleComparison');
    const comparisonContent = document.getElementById('comparisonContent');
    
    if (selectedRoles.length === 0 || selectedCompetencies.length === 0) {
        comparisonDiv.classList.add('d-none');
        return;
    }
    
    comparisonDiv.classList.remove('d-none');
    let html = '<div class="row g-3">';
    
    selectedRoles.forEach(roleKey => {
        const role = MATRIX_2_2[roleKey];
        html += `
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <h6>${role.emoji} ${role.youthName}</h6>
                    </div>
                    <div class="card-body">
                        <p class="small mb-2">${role.youthDescription}</p>
                        <h6 class="fw-bold small">Competencias clave que necesita:</h6>
                        <ul class="list-unstyled small">
        `;
        
        // Get top competencies for this role
        const sortedComps = Object.entries(role.competencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        sortedComps.forEach(([compKey, level]) => {
            const compYouth = COMPETENCIES_YOUTH[compKey];
            const isSelected = selectedCompetencies.includes(compKey);
            const matchClass = isSelected ? 'text-success fw-bold' : 'text-muted';
            const matchIcon = isSelected ? '✅' : '⚠️';
            html += `<li class="${matchClass}">${matchIcon} ${compYouth.youthName} (Nivel: ${level}/5)</li>`;
        });
        
        html += '</ul></div></div></div>';
    });
    
    html += '</div>';
    
    // Add summary
    html += '<div class="mt-3 p-3 bg-warning rounded"><h6 class="fw-bold">💡 Tu situación actual:</h6><p class="small mb-1">Has seleccionado las competencias: <strong>' + 
        selectedCompetencies.map(c => COMPETENCIES_YOUTH[c].youthName).join(', ') + '</strong></p>';
    
    // Check matches
    let matchCount = 0;
    selectedRoles.forEach(roleKey => {
        const roleTopComps = Object.entries(MATRIX_2_2[roleKey].competencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([k, _]) => k);
        
        selectedCompetencies.forEach(compKey => {
            if (roleTopComps.includes(compKey)) {
                matchCount++;
            }
        });
    });
    
    if (matchCount > 0) {
        html += `<p class="small text-success fw-bold mb-0">¡Genial! Tienes ${matchCount} coincidencias con los roles que te interesan. ¡Sigue desarrollándolas!</p>`;
    } else {
        html += `<p class="small text-danger mb-0">Para los roles que seleccionaste, deberías considerar desarrollar otras competencias. Revisa la tabla de arriba.</p>`;
    }
    
    html += '</div>';
    comparisonContent.innerHTML = html;
}

function handleGoalsSubmit(e) {
    e.preventDefault();
    
    // Get selected roles (up to 3)
    const selectedRoles = Array.from(document.querySelectorAll('.role-checkbox:checked')).map(cb => cb.value);
    
    // Get selected competencies (up to 3)
    const selectedCompetencies = Array.from(document.querySelectorAll('.competency-checkbox:checked')).map(cb => cb.value);
    
    const profile = {
        userId: currentUser.id,
        lifeGoals: document.getElementById('lifeGoals').value,
        passions: document.getElementById('passions').value,
        personalGoals: document.getElementById('personalGoals').value,
        selectedRoles: selectedRoles,
        selectedCompetencies: selectedCompetencies,
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
        
        const compData = COMPETENCIES_YOUTH[compKey];
        const compEmoji = compData ? compData.youthName.split(' ')[0] : '📚';
        const compName = compData ? compData.youthName : compKey;
        
        const card = document.createElement('div');
        card.className = 'col-lg-6';
        card.innerHTML = `
            <div class="card recommendation-card h-100">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">${compEmoji} ${compName}</h5>
                </div>
                <div class="card-body">
                    <h6 class="fw-bold">🌐 Páginas Web</h6>
                    <ul class="list-unstyled">
                        ${recs.webs.map(w => `<li class="mb-2 ps-3"><a href="${w.url}" target="_blank" class="text-decoration-none fw-bold">➡️ ${w.name}</a><br><small class="text-muted">📌 ${w.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">📱 Aplicaciones</h6>
                    <ul class="list-unstyled">
                        ${recs.apps.map(a => `<li class="mb-2 ps-3"><a href="${a.url}" target="_blank" class="text-decoration-none fw-bold">📲 ${a.name}</a><br><small class="text-muted">📌 ${a.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">🎥 Videos</h6>
                    <ul class="list-unstyled">
                        ${recs.videos.map(v => `<li class="mb-2 ps-3"><a href="${v.url}" target="_blank" class="text-decoration-none fw-bold">▶️ ${v.name}</a><br><small class="text-muted">📌 ${v.objective}</small></li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mt-3">💼 Trabajos Temporales</h6>
                    <ul class="list-unstyled">
                        ${recs.trabajos.map(t => `<li class="mb-2 ps-3"><strong>💼 ${t.name}</strong><br><small class="text-muted">📌 ${t.objective}</small></li>`).join('')}
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
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay participantes registrados</td></tr>';
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
    const users = DB.getUsers();
    const profiles = DB.getProfiles();
    const results = DB.getResults();
    
    const participant = users.find(u => u.id === userId);
    const profile = profiles.find(p => p.userId === userId);
    const result = results.find(r => r.userId === userId);
    
    if (!participant) {
        alert('Participante no encontrado');
        return;
    }
    
    // Build modal content with participant info, results and recommendations
    let content = `
        <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">📋 Resultados de ${participant.fullName}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
    `;
    
    // Participant basic info
    content += `
        <div class="card mb-3">
            <div class="card-header bg-info text-white">
                <h6 class="mb-0">👤 Información del Participante</h6>
            </div>
            <div class="card-body">
                <p><strong>Nombre:</strong> ${participant.fullName}</p>
                <p><strong>Rol seleccionado:</strong> ${MATRIX_2_2[profile?.selectedRole]?.emoji || ''} ${MATRIX_2_2[profile?.selectedRole]?.name || 'No definido'}</p>
                <p><strong>Metas de vida:</strong> ${profile?.lifeGoals || 'No especificadas'}</p>
            </div>
        </div>
    `;
    
    if (!result) {
        content += `<div class="alert alert-warning">⚠️ Este participante aún no ha completado la evaluación.</div>`;
    } else {
        // Results summary
        content += `
            <div class="card mb-3">
                <div class="card-header bg-success text-white">
                    <h6 class="mb-0">✅ Resultados de la Evaluación</h6>
                </div>
                <div class="card-body">
                    <h6>Puntajes por competencia:</h6>
                    <div class="row">
        `;
        
        Object.entries(result.scores).forEach(([compKey, score]) => {
            const compName = COMPETENCIES_YOUTH[compKey]?.youthName || compKey;
            const badgeClass = score >= 4 ? 'bg-success' : score >= 3 ? 'bg-warning' : 'bg-danger';
            content += `
                <div class="col-md-6 mb-2">
                    <span class="badge ${badgeClass}">${compName}: ${score.toFixed(2)}</span>
                </div>
            `;
        });
        
        content += `</div>`;
        
        // Strengths and improvements
        const strongComps = Object.entries(result.scores)
            .filter(([_, s]) => s >= 4)
            .map(([k, _]) => k);
        
        const weakComps = Object.entries(result.scores)
            .filter(([_, s]) => s < 3.5)
            .map(([k, _]) => k);
        
        if (strongComps.length > 0) {
            content += `<p class="mt-3"><strong>💪 Fortalezas:</strong> ${strongComps.map(c => COMPETENCIES_YOUTH[c]?.youthName || c).join(', ')}</p>`;
        }
        
        if (weakComps.length > 0) {
            content += `<p class="text-danger"><strong>📈 Áreas a mejorar:</strong> ${weakComps.map(c => COMPETENCIES_YOUTH[c]?.youthName || c).join(', ')}</p>`;
        }
        
        content += `</div></div>`;
        
        // Recommendations
        if (weakComps.length > 0) {
            content += `
                <div class="card mb-3">
                    <div class="card-header bg-warning text-dark">
                        <h6 class="mb-0">📚 Recomendaciones Personalizadas</h6>
                    </div>
                    <div class="card-body">
            `;
            
            weakComps.forEach(compKey => {
                const recs = RECOMMENDATIONS[compKey];
                if (!recs) return;
                
                const compName = COMPETENCIES_YOUTH[compKey]?.youthName || compKey;
                
                content += `
                    <div class="recommendation-section mb-4 p-3 border rounded bg-light">
                        <h6 class="fw-bold text-primary mb-3">🎯 ${compName}</h6>
                        
                        <div class="mb-3">
                            <h6 class="fw-bold">🌐 Páginas Web</h6>
                            <ul class="list-unstyled">
                                ${recs.webs.map(w => `
                                    <li class="mb-2 ps-3">
                                        <a href="${w.url}" target="_blank" class="text-decoration-none fw-bold">➡️ ${w.name}</a>
                                        <br><small class="text-muted">📌 ${w.objective}</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="fw-bold">📱 Aplicaciones</h6>
                            <ul class="list-unstyled">
                                ${recs.apps.map(a => `
                                    <li class="mb-2 ps-3">
                                        <a href="${a.url}" target="_blank" class="text-decoration-none fw-bold">📲 ${a.name}</a>
                                        <br><small class="text-muted">📌 ${a.objective}</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="fw-bold">🎥 Videos</h6>
                            <ul class="list-unstyled">
                                ${recs.videos.map(v => `
                                    <li class="mb-2 ps-3">
                                        <a href="${v.url}" target="_blank" class="text-decoration-none fw-bold">▶️ ${v.name}</a>
                                        <br><small class="text-muted">📌 ${v.objective}</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="fw-bold">💼 Trabajos Temporales</h6>
                            <ul class="list-unstyled">
                                ${recs.trabajos.map(t => `
                                    <li class="mb-2 ps-3">
                                        <strong>💼 ${t.name}</strong>
                                        <br><small class="text-muted">📌 ${t.objective}</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            });
            
            content += `</div></div>`;
        }
    }
    
    content += `</div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
    `;
    
    document.getElementById('participantDetailsModalContent').innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById('participantDetailsModal'));
    modal.show();
};

// Admin: Load edit users modal
window.loadEditUsersModal = function() {
    const users = DB.getUsers();
    const tbody = document.getElementById('editUsersTable');
    tbody.innerHTML = '';
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>';
        return;
    }
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td><span class="badge bg-${user.role === 'admin' ? 'danger' : user.role === 'instructor' ? 'primary' : 'success'}">${user.role}</span></td>
            <td>
                <select class="form-select form-select-sm" id="new-role-${user.id}">
                    <option value="participante" ${user.role === 'participante' ? 'selected' : ''}>Participante</option>
                    <option value="instructor" ${user.role === 'instructor' ? 'selected' : ''}>Instructor</option>
                    ${user.role !== 'admin' ? '<option value="admin">Administrador</option>' : ''}
                </select>
            </td>
            <td>
                ${user.role !== 'admin' ? `<button class="btn btn-sm btn-primary" onclick="updateUserRole(${user.id})">💾 Guardar</button>` : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Admin: Update user role
window.updateUserRole = function(userId) {
    const newRole = document.getElementById(`new-role-${userId}`).value;
    
    const users = DB.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex >= 0 && users[userIndex].role !== 'admin') {
        users[userIndex].role = newRole;
        DB.setUsers(users);
        
        alert('✅ Rol de usuario actualizado exitosamente');
        
        // Refresh the modal
        loadEditUsersModal();
        
        // Refresh the main dashboard table
        loadAdminDashboard();
    } else {
        alert('⚠️ No se puede modificar el rol de un administrador');
    }
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
                ${user.role !== 'admin' ? `<button class="btn btn-sm btn-warning" onclick="openEditUserModal(${user.id})">✏️ Editar</button> <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">🗑️ Eliminar</button>` : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open edit user modal for specific user
window.openEditUserModal = function(userId) {
    const users = DB.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user || user.role === 'admin') {
        alert('⚠️ No se puede editar este usuario');
        return;
    }
    
    document.getElementById('newUsername').value = user.username;
    document.getElementById('newPassword').value = user.password;
    document.getElementById('newFullName').value = user.fullName;
    document.getElementById('newRole').value = user.role;
    
    // Store the user ID being edited
    window.editingUserId = userId;
    
    const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
    modal.show();
    
    // Change modal title
    document.querySelector('#addUserModal .modal-title').textContent = 'Editar Usuario';
    
    // Change form behavior
    const form = document.getElementById('addUserForm');
    
    form.onsubmit = function(e) {
        e.preventDefault();
        handleEditUser();
    };
};

function handleEditUser() {
    if (!window.editingUserId) return;
    
    const users = DB.getUsers();
    const userIndex = users.findIndex(u => u.id === window.editingUserId);
    
    if (userIndex >= 0 && users[userIndex].role !== 'admin') {
        users[userIndex].username = document.getElementById('newUsername').value;
        users[userIndex].password = document.getElementById('newPassword').value;
        users[userIndex].fullName = document.getElementById('newFullName').value;
        users[userIndex].role = document.getElementById('newRole').value;
        
        DB.setUsers(users);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        
        // Refresh dashboard
        loadAdminDashboard();
        
        alert('✅ Usuario actualizado exitosamente');
        
        // Reset form and handlers
        document.getElementById('addUserForm').reset();
        document.getElementById('addUserForm').onsubmit = handleAddUser;
        document.querySelector('#addUserModal .modal-title').textContent = 'Agregar Usuario';
        
        window.editingUserId = null;
    }
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
