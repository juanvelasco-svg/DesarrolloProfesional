from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'youth-dev-2026-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///youth_dev.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# ==================== MODELOS DE BASE DE DATOS ====================

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # admin, instructor, participant
    full_name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relación para participantes - instructor asignado
    assigned_instructor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class ParticipantProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='profile')
    
    # Metas y sueños
    dreams = db.Column(db.Text)
    personal_goals = db.Column(db.Text)
    development_goals = db.Column(db.Text)
    selected_role = db.Column(db.String(50))  # Rol de la matriz 2.2
    
    # Resultados del test
    test_results = db.Column(db.Text)  # JSON con resultados de competencias
    
    # Análisis de brechas
    gap_analysis = db.Column(db.Text)  # JSON con análisis de brechas
    
    # Recomendaciones
    recommendations = db.Column(db.Text)  # JSON con recomendaciones
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Competency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))  # Cognitivas, Sociales, Éticas, etc.
    description = db.Column(db.Text)

class Recommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    competency = db.Column(db.String(100), nullable=False)
    resource_type = db.Column(db.String(50))  # web, app, video, job
    title = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(500))
    description = db.Column(db.Text)
    objective = db.Column(db.Text)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ==================== MATRIZ DE COMPETENCIAS 2.2 ====================

ROLES_MATRIX = {
    'alta_gerencia': {
        'name': 'Alta Gerencia',
        'competencies': {
            'cognitivas': 'E', 'sociales': 'E', 'eticas': 'E', 'liderazgo': 'E',
            'crisis': 'E', 'negociacion': 'E', 'resiliencia': 'E', 'emocional': 'E', 'estrategico': 'E'
        }
    },
    'emprendedor': {
        'name': 'Emprendedor',
        'competencies': {
            'cognitivas': 'A', 'sociales': 'A', 'eticas': 'A', 'liderazgo': 'A',
            'crisis': 'A', 'negociacion': 'A', 'resiliencia': 'E', 'emocional': 'A', 'estrategico': 'A'
        }
    },
    'investigador': {
        'name': 'Investigador',
        'competencies': {
            'cognitivas': 'E', 'sociales': 'I', 'eticas': 'A', 'liderazgo': 'I',
            'crisis': 'I', 'negociacion': 'I', 'resiliencia': 'A', 'emocional': 'A', 'estrategico': 'E'
        }
    },
    'gestion_publica': {
        'name': 'Gestión Pública',
        'competencies': {
            'cognitivas': 'A', 'sociales': 'A', 'eticas': 'E', 'liderazgo': 'A',
            'crisis': 'E', 'negociacion': 'A', 'resiliencia': 'A', 'emocional': 'A', 'estrategico': 'A'
        }
    },
    'educacion': {
        'name': 'Educación',
        'competencies': {
            'cognitivas': 'A', 'sociales': 'E', 'eticas': 'A', 'liderazgo': 'A',
            'crisis': 'I', 'negociacion': 'A', 'resiliencia': 'A', 'emocional': 'A', 'estrategico': 'I'
        }
    },
    'salud': {
        'name': 'Salud',
        'competencies': {
            'cognitivas': 'E', 'sociales': 'E', 'eticas': 'A', 'liderazgo': 'A',
            'crisis': 'E', 'negociacion': 'I', 'resiliencia': 'A', 'emocional': 'A', 'estrategico': 'I'
        }
    },
    'impacto_social': {
        'name': 'Impacto Social',
        'competencies': {
            'cognitivas': 'I', 'sociales': 'A', 'eticas': 'E', 'liderazgo': 'A',
            'crisis': 'A', 'negociacion': 'A', 'resiliencia': 'E', 'emocional': 'A', 'estrategico': 'I'
        }
    },
    'sostenibilidad': {
        'name': 'Sostenibilidad',
        'competencies': {
            'cognitivas': 'A', 'sociales': 'A', 'eticas': 'E', 'liderazgo': 'I',
            'crisis': 'A', 'negociacion': 'A', 'resiliencia': 'A', 'emocional': 'A', 'estrategico': 'E'
        }
    }
}

COMPETENCY_QUESTIONS = [
    {'id': 'cognitivas', 'name': 'Competencias Cognitivas', 'questions': [
        '¿Te gusta analizar problemas complejos y encontrar soluciones creativas?',
        '¿Puedes pensar en el "panorama completo" al tomar decisiones?',
        '¿Aprendes rápido nuevas habilidades y conceptos?',
        '¿Disfrutas investigando y descubriendo nueva información?',
        '¿Eres bueno identificando patrones y tendencias?'
    ]},
    {'id': 'sociales', 'name': 'Competencias Sociales', 'questions': [
        '¿Te sientes cómodo trabajando en equipo?',
        '¿Escuchas activamente a los demás?',
        '¿Puedes comunicar tus ideas claramente?',
        '¿Muestras empatía hacia los demás?',
        '¿Construyes relaciones positivas fácilmente?'
    ]},
    {'id': 'eticas', 'name': 'Competencias Éticas', 'questions': [
        '¿Actúas con integridad incluso cuando es difícil?',
        '¿Te preocupa el impacto social de tus acciones?',
        '¿Respetas las diferencias culturales y personales?',
        '¿Eres transparente y honesto en tus relaciones?',
        '¿Consideras las consecuencias éticas de tus decisiones?'
    ]},
    {'id': 'liderazgo', 'name': 'Liderazgo', 'questions': [
        '¿Inspiras y motivas a otros?',
        '¿Tomas iniciativa en proyectos grupales?',
        '¿Delegas tareas efectivamente?',
        '¿Tomas decisiones oportunas bajo presión?',
        '¿Creas una visión que otros quieren seguir?'
    ]},
    {'id': 'crisis', 'name': 'Manejo de Crisis', 'questions': [
        '¿Mantienes la calma en situaciones de estrés?',
        '¿Tomas decisiones efectivas bajo presión?',
        '¿Te adaptas rápidamente a cambios inesperados?',
        '¿Comunicas claramente en situaciones críticas?',
        '¿Aprendes de las experiencias difíciles?'
    ]},
    {'id': 'negociacion', 'name': 'Negociación', 'questions': [
        '¿Buscas soluciones donde todos ganan (win-win)?',
        '¿Puedes identificar los intereses detrás de las posiciones?',
        '¿Creas valor en las negociaciones?',
        '¿Manejas conflictos de manera constructiva?',
        '¿Persuades e influyes positivamente?'
    ]},
    {'id': 'resiliencia', 'name': 'Resiliencia', 'questions': [
        '¿Te recuperas rápidamente de los fracasos?',
        '¿Ves los desafíos como oportunidades de crecimiento?',
        '¿Mantienes la perseverancia ante obstáculos?',
        '¿Te adaptas bien a los cambios?',
        '¿Mantienes una actitud positiva en tiempos difíciles?'
    ]},
    {'id': 'emocional', 'name': 'Equilibrio Emocional', 'questions': [
        '¿Reconoces y gestionas tus emociones?',
        '¿Mantienes el equilibrio entre vida personal y estudios/trabajo?',
        '¿Practicas el autocuidado regularmente?',
        '¿Manejas el estrés de manera saludable?',
        '¿Previenes el agotamiento (burnout)?'
    ]},
    {'id': 'estrategico', 'name': 'Análisis Estratégico', 'questions': [
        '¿Planificas a largo plazo?',
        '¿Analizas el entorno y la competencia?',
        '¿Identificas oportunidades y amenazas?',
        '¿Desarrollas estrategias para alcanzar metas?',
        '¿Evalúas el progreso y ajustas planes?'
    ]}
]

LEVELS = {'B': 'Básico', 'I': 'Intermedio', 'A': 'Avanzado', 'E': 'Estratégico'}

# ==================== RUTAS ====================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role')
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password) and user.role == role:
            login_user(user)
            next_page = request.args.get('next')
            
            if role == 'admin':
                return redirect(next_page or url_for('admin_dashboard'))
            elif role == 'instructor':
                return redirect(next_page or url_for('instructor_dashboard'))
            else:
                return redirect(next_page or url_for('participant_dashboard'))
        
        flash('Credenciales inválidas o rol incorrecto', 'error')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role')
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        instructor_id = request.form.get('instructor_id') if role == 'participant' else None
        
        if User.query.filter_by(username=username).first():
            flash('El usuario ya existe', 'error')
            return redirect(url_for('register'))
        
        user = User(username=username, role=role, full_name=full_name, email=email)
        user.set_password(password)
        
        if role == 'participant' and instructor_id:
            user.assigned_instructor_id = int(instructor_id)
        
        db.session.add(user)
        db.session.commit()
        
        flash('Registro exitoso. Ahora puedes iniciar sesión', 'success')
        return redirect(url_for('login'))
    
    instructors = User.query.filter_by(role='instructor').all()
    return render_template('register.html', instructors=instructors)

# ==================== PARTICIPANTE ====================

@app.route('/participant/dashboard')
@login_required
def participant_dashboard():
    if current_user.role != 'participant':
        flash('Acceso no autorizado', 'error')
        return redirect(url_for('index'))
    
    profile = ParticipantProfile.query.filter_by(user_id=current_user.id).first()
    progress = {
        'goals': bool(profile and profile.dreams),
        'test': bool(profile and profile.test_results),
        'analysis': bool(profile and profile.gap_analysis),
        'recommendations': bool(profile and profile.recommendations)
    }
    
    return render_template('participant/dashboard.html', profile=profile, progress=progress)

@app.route('/participant/goals', methods=['GET', 'POST'])
@login_required
def participant_goals():
    if current_user.role != 'participant':
        return redirect(url_for('index'))
    
    profile = ParticipantProfile.query.filter_by(user_id=current_user.id).first()
    
    if request.method == 'POST':
        if not profile:
            profile = ParticipantProfile(user_id=current_user.id)
            db.session.add(profile)
        
        profile.dreams = request.form.get('dreams')
        profile.personal_goals = request.form.get('personal_goals')
        profile.development_goals = request.form.get('development_goals')
        profile.selected_role = request.form.get('selected_role')
        
        db.session.commit()
        flash('¡Metas guardadas exitosamente! 🎯', 'success')
        return redirect(url_for('participant_test'))
    
    return render_template('participant/goals.html', roles=ROLES_MATRIX, profile=profile)

@app.route('/participant/test', methods=['GET', 'POST'])
@login_required
def participant_test():
    if current_user.role != 'participant':
        return redirect(url_for('index'))
    
    profile = ParticipantProfile.query.filter_by(user_id=current_user.id).first()
    
    if not profile or not profile.selected_role:
        flash('Primero completa tus metas y selecciona un rol', 'warning')
        return redirect(url_for('participant_goals'))
    
    if request.method == 'POST':
        results = {}
        for comp in COMPETENCY_QUESTIONS:
            score = 0
            count = 0
            for i, q in enumerate(comp['questions']):
                val = request.form.get(f"{comp['id']}_{i}")
                if val:
                    score += int(val)
                    count += 1
            
            avg = score / count if count > 0 else 0
            # Convertir a nivel (1-2: B, 3: I, 4: A, 5: E)
            if avg <= 2:
                level = 'B'
            elif avg <= 3:
                level = 'I'
            elif avg <= 4:
                level = 'A'
            else:
                level = 'E'
            
            results[comp['id']] = {'score': round(avg, 1), 'level': level}
        
        profile.test_results = json.dumps(results)
        db.session.commit()
        
        # Generar análisis automáticamente
        return redirect(url_for('participant_analysis'))
    
    return render_template('participant/test.html', questions=COMPETENCY_QUESTIONS, profile=profile)

@app.route('/participant/analysis')
@login_required
def participant_analysis():
    if current_user.role != 'participant':
        return redirect(url_for('index'))
    
    profile = ParticipantProfile.query.filter_by(user_id=current_user.id).first()
    
    if not profile or not profile.test_results:
        flash('Primero completa el test de competencias', 'warning')
        return redirect(url_for('participant_test'))
    
    test_results = json.loads(profile.test_results)
    role_data = ROLES_MATRIX.get(profile.selected_role, {})
    required_competencies = role_data.get('competencies', {})
    
    # Análisis de brechas
    gaps = []
    strengths = []
    
    for comp_id, result in test_results.items():
        required_level = required_competencies.get(comp_id, 'I')
        current_level = result['level']
        
        level_order = {'B': 0, 'I': 1, 'A': 2, 'E': 3}
        
        if level_order[current_level] < level_order[required_level]:
            gaps.append({
                'competency': next((c['name'] for c in COMPETENCY_QUESTIONS if c['id'] == comp_id), comp_id),
                'current': current_level,
                'required': required_level,
                'gap': level_order[required_level] - level_order[current_level]
            })
        elif level_order[current_level] >= level_order[required_level]:
            strengths.append({
                'competency': next((c['name'] for c in COMPETENCY_QUESTIONS if c['id'] == comp_id), comp_id),
                'level': current_level
            })
    
    gap_analysis = {'gaps': gaps, 'strengths': strengths}
    profile.gap_analysis = json.dumps(gap_analysis)
    db.session.commit()
    
    # Generar recomendaciones
    recommendations_list = []
    for gap in gaps:
        recs = Recommendation.query.filter_by(competency=gap['competency']).all()
        for rec in recs[:3]:  # Máximo 3 recomendaciones por competencia
            recommendations_list.append({
                'competency': gap['competency'],
                'resource_type': rec.resource_type,
                'title': rec.title,
                'url': rec.url,
                'description': rec.description,
                'objective': rec.objective
            })
    
    profile.recommendations = json.dumps(recommendations_list)
    db.session.commit()
    
    return render_template('participant/analysis.html', 
                         gaps=gaps, strengths=strengths, 
                         role=role_data.get('name', ''), profile=profile)

@app.route('/participant/recommendations')
@login_required
def participant_recommendations():
    if current_user.role != 'participant':
        return redirect(url_for('index'))
    
    profile = ParticipantProfile.query.filter_by(user_id=current_user.id).first()
    
    if not profile or not profile.recommendations:
        flash('Completa el análisis para ver recomendaciones', 'warning')
        return redirect(url_for('participant_analysis'))
    
    recommendations = json.loads(profile.recommendations)
    
    return render_template('participant/recommendations.html', 
                         recommendations=recommendations, profile=profile)

# ==================== INSTRUCTOR ====================

@app.route('/instructor/dashboard')
@login_required
def instructor_dashboard():
    if current_user.role != 'instructor':
        flash('Acceso no autorizado', 'error')
        return redirect(url_for('index'))
    
    # Obtener participantes asignados
    participants = User.query.filter_by(assigned_instructor_id=current_user.id, role='participant').all()
    
    participant_data = []
    for p in participants:
        profile = ParticipantProfile.query.filter_by(user_id=p.id).first()
        data = {
            'id': p.id,
            'name': p.full_name,
            'email': p.email,
            'role': profile.selected_role if profile else None,
            'has_profile': bool(profile and profile.dreams),
            'has_test': bool(profile and profile.test_results),
            'has_analysis': bool(profile and profile.gap_analysis),
            'gaps': json.loads(profile.gap_analysis)['gaps'] if profile and profile.gap_analysis else [],
            'recommendations': json.loads(profile.recommendations) if profile and profile.recommendations else []
        }
        participant_data.append(data)
    
    return render_template('instructor/dashboard.html', participants=participant_data)

@app.route('/instructor/participant/<int:participant_id>')
@login_required
def instructor_participant_detail(participant_id):
    if current_user.role != 'instructor':
        return redirect(url_for('index'))
    
    participant = User.query.get_or_404(participant_id)
    profile = ParticipantProfile.query.filter_by(user_id=participant_id).first()
    
    if not profile:
        flash('El participante aún no ha completado su perfil', 'warning')
        return redirect(url_for('instructor_dashboard'))
    
    test_results = json.loads(profile.test_results) if profile.test_results else {}
    gap_analysis = json.loads(profile.gap_analysis) if profile.gap_analysis else {'gaps': [], 'strengths': []}
    recommendations = json.loads(profile.recommendations) if profile.recommendations else []
    
    return render_template('instructor/participant_detail.html',
                         participant=participant, profile=profile,
                         test_results=test_results, gap_analysis=gap_analysis,
                         recommendations=recommendations, roles=ROLES_MATRIX)

# ==================== ADMINISTRADOR ====================

@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    if current_user.role != 'admin':
        flash('Acceso no autorizado', 'error')
        return redirect(url_for('index'))
    
    users = User.query.all()
    profiles = ParticipantProfile.query.all()
    
    stats = {
        'total_users': len(users),
        'admins': len([u for u in users if u.role == 'admin']),
        'instructors': len([u for u in users if u.role == 'instructor']),
        'participants': len([u for u in users if u.role == 'participant']),
        'completed_profiles': len([p for p in profiles if p.dreams]),
        'completed_tests': len([p for p in profiles if p.test_results])
    }
    
    return render_template('admin/dashboard.html', users=users, stats=stats)

@app.route('/admin/user/<int:user_id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_user(user_id):
    if current_user.role != 'admin':
        return redirect(url_for('index'))
    
    user = User.query.get_or_404(user_id)
    
    if request.method == 'POST':
        user.full_name = request.form.get('full_name')
        user.email = request.form.get('email')
        new_password = request.form.get('password')
        
        if new_password:
            user.set_password(new_password)
        
        db.session.commit()
        flash('Usuario actualizado', 'success')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('admin/edit_user.html', user=user)

@app.route('/admin/user/<int:user_id>/delete', methods=['POST'])
@login_required
def admin_delete_user(user_id):
    if current_user.role != 'admin':
        return redirect(url_for('index'))
    
    user = User.query.get_or_404(user_id)
    
    if user.id == current_user.id:
        flash('No puedes eliminar tu propia cuenta', 'error')
        return redirect(url_for('admin_dashboard'))
    
    # Eliminar perfil asociado
    profile = ParticipantProfile.query.filter_by(user_id=user_id).first()
    if profile:
        db.session.delete(profile)
    
    db.session.delete(user)
    db.session.commit()
    
    flash('Usuario eliminado', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/clear-data', methods=['POST'])
@login_required
def admin_clear_data():
    if current_user.role != 'admin':
        return redirect(url_for('index'))
    
    action = request.form.get('action')
    
    if action == 'clear_profiles':
        ParticipantProfile.query.delete()
        db.session.commit()
        flash('Perfiles de participantes limpiados', 'warning')
    elif action == 'clear_all':
        ParticipantProfile.query.delete()
        User.query.filter(User.role != 'admin').delete()
        db.session.commit()
        flash('Base de datos limpiada (se mantienen admins)', 'warning')
    
    return redirect(url_for('admin_dashboard'))

# ==================== INICIALIZAR DB ====================

def init_db():
    with app.app_context():
        db.create_all()
        
        # Crear admin por defecto si no existe
        if not User.query.filter_by(username='admin').first():
            admin = User(username='admin', role='admin', full_name='Administrador', email='admin@youthdev.com')
            admin.set_password('admin123')
            db.session.add(admin)
        
        # Crear algunos instructores de ejemplo
        if User.query.filter_by(role='instructor').count() == 0:
            for i in range(1, 4):
                instructor = User(username=f'instructor{i}', role='instructor', 
                                full_name=f'Instructor {i}', email=f'instructor{i}@youthdev.com')
                instructor.set_password('inst123')
                db.session.add(instructor)
        
        # Crear recomendaciones de ejemplo
        if Recommendation.query.count() == 0:
            sample_recs = [
                {'competency': 'Competencias Cognitivas', 'type': 'web', 'title': 'Coursera - Pensamiento Crítico', 
                 'url': 'https://www.coursera.org', 'desc': 'Cursos online sobre pensamiento crítico', 'obj': 'Desarrollar habilidades de análisis'},
                {'competency': 'Competencias Cognitivas', 'type': 'app', 'title': 'Duolingo', 
                 'url': 'https://www.duolingo.com', 'desc': 'Aprende nuevos idiomas', 'obj': 'Estimular neuroplasticidad'},
                {'competency': 'Competencias Sociales', 'type': 'video', 'title': 'TED - Habilidades Sociales', 
                 'url': 'https://www.ted.com', 'desc': 'Charlas sobre comunicación efectiva', 'obj': 'Mejorar interacción social'},
                {'competency': 'Liderazgo', 'type': 'web', 'title': 'LinkedIn Learning - Liderazgo', 
                 'url': 'https://www.linkedin.com/learning', 'desc': 'Cursos de liderazgo práctico', 'obj': 'Desarrollar capacidades de guía'},
                {'competency': 'Resiliencia', 'type': 'app', 'title': 'Headspace', 
                 'url': 'https://www.headspace.com', 'desc': 'Meditación y mindfulness', 'obj': 'Fortalecer salud mental'},
                {'competency': 'Equilibrio Emocional', 'type': 'video', 'title': 'YouTube - Gestión del Estrés', 
                 'url': 'https://www.youtube.com', 'desc': 'Videos sobre técnicas de relajación', 'obj': 'Manejar estrés académico'},
                {'competency': 'Negociación', 'type': 'web', 'title': 'Harvard Negotiation Project', 
                 'url': 'https://www.pon.harvard.edu', 'desc': 'Recursos sobre negociación', 'obj': 'Aprender método Harvard'},
                {'competency': 'Análisis Estratégico', 'type': 'job', 'title': 'Voluntariado en ONGs', 
                 'url': '#', 'desc': 'Participar en proyectos sociales', 'obj': 'Aplicar pensamiento estratégico en contexto real'},
            ]
            
            for rec in sample_recs:
                recommendation = Recommendation(
                    competency=rec['competency'],
                    resource_type=rec['type'],
                    title=rec['title'],
                    url=rec['url'],
                    description=rec['desc'],
                    objective=rec['obj']
                )
                db.session.add(recommendation)
        
        db.session.commit()

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)
