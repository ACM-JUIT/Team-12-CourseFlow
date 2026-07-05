import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CoursePage from "./components/CoursePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HeroVisual />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <header style={s.header}>
      <nav style={s.nav}>
        <a href="/" style={s.logo}>
          <div style={s.logoMark}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={s.logoText}>CourseFlow</span>
        </a>
        <ul style={s.navLinks}>
          <li><a href="#features" style={s.navLink}>Features</a></li>
          <li><a href="#how-it-works" style={s.navLink}>How it works</a></li>
        </ul>
        <div style={s.navCta}>
          <a href="/auth" style={{...s.btn, ...s.btnGhost}}>Sign in</a>
          <a href="/auth" style={{...s.btn, ...s.btnPrimary}}>Get Started Free</a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <div style={s.hero}>
      <h1 style={s.h1}>
        Custom Learning Paths,{' '}
        <em style={s.h1Em}>Built in Minutes</em>
      </h1>
      <p style={s.heroSub}>
        Stop piecing together scattered resources. CourseFlow generates structured, engaging curricula tailored to exactly what you want to learn.
      </p>
      <div style={s.heroActions}>
        <a href="/auth" style={{...s.btn, ...s.btnPrimary, ...s.btnLg}}>
          Start Learning for Free →
        </a>
        <a href="#how-it-works" style={{...s.btn, ...s.btnGhost, ...s.btnLg}}>See how it works</a>
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div style={s.heroVisual}>
      <div style={s.heroVisualInner}>
        <div style={s.cfTopbar}>
          <div style={s.cfTopbarLogo}>
            <div style={s.cfTopbarLm}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            CourseFlow
          </div>
          <div style={s.cfTopbarPill}>✦ Course Generated</div>
        </div>
        <div style={s.cfBody}>
          <div style={s.cfSidebar}>
            {[
              { label: 'Dashboard', active: true },
              { label: 'My Courses', active: false },
              { label: 'Generate', active: false },
              { label: 'Progress', active: false },
            ].map(item => (
              <div key={item.label} style={item.active ? {...s.cfNavItem, ...s.cfNavItemActive} : s.cfNavItem}>
                {item.label}
              </div>
            ))}
          </div>
          <div style={s.cfMain}>
            <div style={s.cfPromptArea}>
              <div style={s.cfPromptInput}>Learn Machine Learning from scratch as a Python developer…</div>
              <button style={s.cfGenBtn}>Generate</button>
            </div>
            <div>
              <div style={s.cfCourseTitle}>Machine Learning Fundamentals</div>
              <div style={s.cfCourseSub}>4 modules · Beginner–Intermediate · Est. 3 weeks</div>
            </div>
            <div style={s.cfModules}>
              {[
                { num: '✓', name: 'Introduction to ML & Python Setup', topics: 'NumPy, Pandas, Jupyter, data types', status: 'Done', type: 'done' },
                { num: '2', name: 'Supervised Learning', topics: 'Linear regression, decision trees, Scikit-learn', status: 'In Progress', type: 'active' },
                { num: '3', name: 'Neural Networks & Deep Learning', topics: 'TensorFlow, Keras, backpropagation', status: 'Locked', type: 'locked' },
                { num: '4', name: 'Model Evaluation & Deployment', topics: 'Metrics, cross-validation, Flask API', status: 'Locked', type: 'locked' },
              ].map((m, i) => (
                <div key={i} style={s.cfModule}>
                  <div style={m.type === 'done' ? {...s.cfModIdx, ...s.cfModIdxDone} : m.type === 'active' ? {...s.cfModIdx, ...s.cfModIdxActive} : s.cfModIdx}>{m.num}</div>
                  <div style={{flex: 1}}>
                    <div style={s.cfModName}>{m.name}</div>
                    <div style={s.cfModTopics}>{m.topics}</div>
                  </div>
                  <span style={m.type === 'done' ? {...s.cfModStatus, ...s.cfModStatusDone} : m.type === 'active' ? {...s.cfModStatus, ...s.cfModStatusActive} : {...s.cfModStatus, ...s.cfModStatusLocked}}>{m.status}</span>
                </div>
              ))}
            </div>
            <div style={s.cfTags}>
              {['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'Data Viz'].map(t => (
                <span key={t} style={s.cfTag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Instant Course Generation',
    desc: 'Type any topic and get a fully structured course with modules, subtopics, and recommended resources — all in seconds.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  },
  {
    title: 'Personalized Curriculum',
    desc: "Your learning path adapts to your skill level, learning style, and goals — so you never wade through content you don't need.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Smart Resource Curation',
    desc: 'Stop searching endlessly. CourseFlow surfaces the right articles, videos, and documentation for every topic in your course.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  },
  {
    title: 'Structured Modules',
    desc: "Each course is broken into clear, digestible modules — making complex topics approachable even if you're starting from zero.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
]

function Features() {
  return (
    <section id="features" style={s.featuresSection}>
      <div style={s.sectionInner}>
        <div style={s.featuresHeader}>
          <div style={s.sectionLabel}>Features</div>
          <h2 style={s.h2}>Everything you need to learn faster</h2>
          <p style={{...s.sectionDesc, margin: '0 auto'}}>CourseFlow removes the friction between wanting to learn something and actually learning it.</p>
        </div>
        <div style={s.featuresGrid}>
          {features.map(f => (
            <div key={f.title} style={s.featureCard}>
              <div style={s.featureIcon}>{f.icon}</div>
              <div style={s.featureTitle}>{f.title}</div>
              <p style={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { n: '1', title: 'Tell CourseFlow what you want to learn', desc: 'Enter any subject — from "machine learning" to "Byzantine history" to "playing jazz piano." Be as broad or as specific as you like.' },
  { n: '2', title: 'AI builds your personalized path', desc: "CourseFlow's AI generates a structured curriculum with ordered modules, key concepts, and curated resources tailored to your level." },
  { n: '3', title: 'Learn at your own pace', desc: 'Work through your course at your own pace. Mark modules complete, revisit concepts, and keep moving forward.' },
]

const chatModules = [
  { label: 'Module 1 — JavaScript for Python Devs', badge: 'Start', active: true },
  { label: 'Module 2 — React Fundamentals & JSX', badge: 'Next', active: true },
  { label: 'Module 3 — State Management with Hooks', badge: 'Locked', active: false },
  { label: 'Module 4 — Building a Full React App', badge: 'Locked', active: false },
]

function HowItWorks() {
  return (
    <section id="how-it-works" style={{padding: '80px 24px'}}>
      <div style={s.sectionInner}>
        <div style={s.howGrid}>
          <div>
            <div style={s.sectionLabel}>How it works</div>
            <h2 style={s.h2}>From topic to structured course in three steps</h2>
            <p style={{...s.sectionDesc, marginBottom: 48}}>CourseFlow handles the hard part — figuring out what to learn, in what order, and where to find it.</p>
            <div style={s.howSteps}>
              {steps.map(step => (
                <div key={step.n} style={s.step}>
                  <div style={s.stepNum}>{step.n}</div>
                  <div>
                    <div style={s.stepTitle}>{step.title}</div>
                    <p style={s.stepDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={s.howVisual}>
            <div style={s.chatMsg}>
              <div style={{...s.avatar, ...s.avUser}}>You</div>
              <div style={{...s.bubble, ...s.bubbleUser}}>Create a course to help me learn React from scratch as a Python developer.</div>
            </div>
            <div style={s.chatMsg}>
              <div style={{...s.avatar, ...s.avAi}}>CF</div>
              <div style={{...s.bubble, ...s.bubbleAi}}>Got it! Here's your personalized React course built around your Python background:</div>
            </div>
            <div style={s.courseCards}>
              {chatModules.map(m => (
                <div key={m.label} style={s.miniCard}>
                  <div style={{...s.miniDot, background: m.active ? '#3b82f6' : '#cbd5e1'}}></div>
                  <span style={s.miniLabel}>{m.label}</span>
                  <span style={m.active ? {...s.miniBadge, ...s.miniBadgeActive} : {...s.miniBadge, ...s.miniBadgeLocked}}>{m.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{padding: '96px 24px'}}>
      <div style={s.sectionInner}>
        <div style={s.ctaBox}>
          <h2 style={{...s.h2, color: '#fff', fontSize: 'clamp(26px, 4vw, 38px)', letterSpacing: '-.7px', marginBottom: 14}}>Ready to start learning smarter?</h2>
          <p style={{color: 'rgba(255,255,255,.75)', fontSize: 16, marginBottom: 36, lineHeight: 1.65}}>Create your first AI-generated course in under a minute — completely free. No credit card required.</p>
          <a href="/auth" style={{...s.btn, ...s.btnWhite, ...s.btnLg, position: 'relative', zIndex: 1}}>
            Get Started for Free →
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.footerInner}>
        <a href="/" style={{...s.logo, textDecoration: 'none'}}>
          <div style={s.logoMark}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={s.logoText}>CourseFlow</span>
        </a>
        <div style={s.footerLinks}>
          <a href="/privacy-policy" style={s.footerLink}>Privacy Policy</a>
          <a href="/terms" style={s.footerLink}>Terms</a>
          <a href="/contact" style={s.footerLink}>Contact</a>
        </div>
        <p style={s.footerCopy}>© 2026 CourseFlow™. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

const s = {
  header: { position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.85)', backdropFilter:'blur(10px)', borderBottom:'1px solid #e2e8f0' },
  nav: { maxWidth:1120, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' },
  logo: { display:'flex', alignItems:'center', gap:8, textDecoration:'none' },
  logoMark: { width:32, height:32, background:'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' },
  logoText: { fontSize:17, fontWeight:700, color:'#0f172a', letterSpacing:'-0.3px' },
  navLinks: { display:'flex', gap:32, listStyle:'none' },
  navLink: { fontSize:14, fontWeight:500, color:'#475569', textDecoration:'none' },
  navCta: { display:'flex', gap:12, alignItems:'center' },
  btn: { display:'inline-flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600, borderRadius:8, padding:'9px 18px', cursor:'pointer', textDecoration:'none', border:'none', transition:'all .15s' },
  btnGhost: { background:'transparent', color:'#334155' },
  btnPrimary: { background:'#2563eb', color:'#fff', boxShadow:'0 1px 3px rgba(37,99,235,.25)' },
  btnLg: { fontSize:15, padding:'12px 24px', borderRadius:10 },
  btnWhite: { background:'#fff', color:'#1d4ed8', fontWeight:700 },
  hero: { maxWidth:1120, margin:'0 auto', padding:'96px 24px 64px', textAlign:'center' },
  h1: { fontSize:'clamp(38px,6vw,64px)', fontWeight:800, lineHeight:1.08, letterSpacing:'-1.5px', color:'#0f172a', maxWidth:760, margin:'0 auto 20px' },
  h1Em: { fontStyle:'normal', background:'linear-gradient(90deg,#3b82f6,#1d4ed8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' },
  heroSub: { fontSize:18, color:'#475569', maxWidth:520, margin:'0 auto 40px', lineHeight:1.65 },
  heroActions: { display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap' },
  heroVisual: { maxWidth:860, margin:'64px auto 0', padding:'0 24px' },
  heroVisualInner: { background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 8px 40px rgba(15,23,42,.12),0 0 0 1px #e2e8f0' },
  cfTopbar: { background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' },
  cfTopbarLogo: { display:'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:700, color:'#0f172a' },
  cfTopbarLm: { width:26, height:26, background:'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' },
  cfTopbarPill: { fontSize:12, fontWeight:600, background:'#eff6ff', color:'#2563eb', border:'1px solid #dbeafe', borderRadius:100, padding:'4px 12px' },
  cfBody: { display:'grid', gridTemplateColumns:'200px 1fr', minHeight:340 },
  cfSidebar: { borderRight:'1px solid #f1f5f9', padding:'16px 12px', background:'#f8fafc', display:'flex', flexDirection:'column', gap:4 },
  cfNavItem: { display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, fontSize:12, fontWeight:500, color:'#475569', cursor:'pointer' },
  cfNavItemActive: { background:'#2563eb', color:'#fff' },
  cfMain: { padding:'20px 22px', display:'flex', flexDirection:'column', gap:14 },
  cfPromptArea: { background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:10 },
  cfPromptInput: { flex:1, fontSize:13, color:'#64748b', fontFamily:'inherit' },
  cfGenBtn: { background:'#2563eb', color:'#fff', fontSize:12, fontWeight:600, padding:'7px 14px', borderRadius:8, border:'none', cursor:'pointer', whiteSpace:'nowrap' },
  cfCourseTitle: { fontSize:13, fontWeight:700, color:'#0f172a', marginBottom:2 },
  cfCourseSub: { fontSize:11, color:'#94a3b8' },
  cfModules: { display:'flex', flexDirection:'column', gap:7 },
  cfModule: { background:'#fff', border:'1px solid #e2e8f0', borderRadius:9, padding:'10px 14px', display:'flex', alignItems:'center', gap:12 },
  cfModIdx: { width:24, height:24, borderRadius:'50%', background:'#eff6ff', color:'#2563eb', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  cfModIdxDone: { background:'#dcfce7', color:'#16a34a' },
  cfModIdxActive: { background:'#2563eb', color:'#fff' },
  cfModName: { fontSize:12, fontWeight:600, color:'#1e293b' },
  cfModTopics: { fontSize:11, color:'#94a3b8', marginTop:1 },
  cfModStatus: { fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:100 },
  cfModStatusDone: { background:'#dcfce7', color:'#16a34a' },
  cfModStatusActive: { background:'#eff6ff', color:'#2563eb' },
  cfModStatusLocked: { background:'#f1f5f9', color:'#94a3b8' },
  cfTags: { display:'flex', gap:6, flexWrap:'wrap' },
  cfTag: { fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:100, background:'#eff6ff', color:'#2563eb', border:'1px solid #dbeafe' },
  sectionInner: { maxWidth:1120, margin:'0 auto' },
  sectionLabel: { fontSize:13, fontWeight:600, color:'#2563eb', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:12 },
  h2: { fontSize:'clamp(28px,4vw,42px)', fontWeight:800, letterSpacing:'-1px', color:'#0f172a', lineHeight:1.12, marginBottom:16 },
  sectionDesc: { fontSize:17, color:'#475569', maxWidth:520, lineHeight:1.65 },
  featuresSection: { padding:'80px 24px', background:'#f8fafc' },
  featuresHeader: { textAlign:'center', marginBottom:56 },
  featuresGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 },
  featureCard: { background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:28 },
  featureIcon: { width:44, height:44, borderRadius:11, background:'#eff6ff', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 },
  featureTitle: { fontSize:16, fontWeight:700, color:'#0f172a', marginBottom:8 },
  featureDesc: { fontSize:14, color:'#475569', lineHeight:1.65 },
  howGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' },
  howSteps: { display:'flex', flexDirection:'column', gap:32 },
  step: { display:'flex', gap:18 },
  stepNum: { width:36, height:36, borderRadius:'50%', background:'#2563eb', color:'#fff', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 },
  stepTitle: { fontSize:16, fontWeight:700, color:'#0f172a', marginBottom:6 },
  stepDesc: { fontSize:14, color:'#475569', lineHeight:1.65 },
  howVisual: { background:'linear-gradient(135deg,#eff6ff,#f1f5f9)', borderRadius:16, padding:36, border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:16 },
  chatMsg: { display:'flex', gap:10, alignItems:'flex-start' },
  avatar: { width:32, height:32, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 },
  avAi: { background:'#2563eb', color:'#fff' },
  avUser: { background:'#e2e8f0', color:'#334155' },
  bubble: { fontSize:13, lineHeight:1.6, padding:'10px 14px', borderRadius:12, maxWidth:240 },
  bubbleAi: { background:'#fff', color:'#475569', boxShadow:'0 2px 8px rgba(0,0,0,.07)', borderBottomLeftRadius:4 },
  bubbleUser: { background:'#2563eb', color:'#fff', borderBottomRightRadius:4 },
  courseCards: { display:'flex', flexDirection:'column', gap:8 },
  miniCard: { background:'#fff', borderRadius:9, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, border:'1px solid #e2e8f0', fontSize:13 },
  miniDot: { width:8, height:8, borderRadius:'50%', flexShrink:0 },
  miniLabel: { fontWeight:500, color:'#1e293b', flex:1, fontSize:12 },
  miniBadge: { fontSize:11, padding:'2px 8px', borderRadius:100, fontWeight:600 },
  miniBadgeActive: { background:'#eff6ff', color:'#2563eb' },
  miniBadgeLocked: { background:'#f1f5f9', color:'#94a3b8' },
  ctaBox: { maxWidth:700, margin:'0 auto', textAlign:'center', background:'linear-gradient(135deg,#2563eb,#1d4ed8)', borderRadius:20, padding:'64px 48px', boxShadow:'0 20px 60px rgba(37,99,235,.3)', position:'relative', overflow:'hidden' },
  footer: { borderTop:'1px solid #e2e8f0', padding:'40px 24px' },
  footerInner: { maxWidth:1120, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 },
  footerLinks: { display:'flex', gap:24 },
  footerLink: { fontSize:13, color:'#94a3b8', textDecoration:'none' },
  footerCopy: { fontSize:13, color:'#94a3b8' },
}

export default App;