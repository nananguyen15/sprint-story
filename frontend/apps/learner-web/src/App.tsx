import { useState } from 'react';

type Page = 'Today' | 'Map' | 'Review' | 'Exams' | 'Profile';

const nav: { page: Page; icon: string }[] = [
  { page: 'Today', icon: '⌂' }, { page: 'Map', icon: '⌖' }, { page: 'Review', icon: '↻' },
  { page: 'Exams', icon: '▤' }, { page: 'Profile', icon: '○' },
];

function SproutMark() {
  return <span className="sprout-mark" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none"><path d="M21.8 36V21.5m0 9.7c-7.4 0-12.6-4.7-12.6-11.6 7.6-.2 12.6 3.5 12.6 11.6Zm.2-8.2c0-7.4 4.9-12.8 12.4-12.9-.1 7.9-4.8 12.9-12.4 12.9Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 37h16" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/></svg></span>;
}

function App() {
  const [page, setPage] = useState<Page>('Today');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const coming = page !== 'Today';

  return <div className="learner-shell">
    <header className="learner-topbar">
      <a className="brand" href="#today" onClick={(e) => { e.preventDefault(); setPage('Today'); }} aria-label="Sprint Story home">
        <SproutMark /><span>Sprint Story</span>
      </a>
      <div className="course-pill"><span className="course-dot" /> PSM I <span className="pill-chevron">⌄</span></div>
      <button className="profile-button" onClick={() => setSettingsOpen(!settingsOpen)} aria-expanded={settingsOpen} aria-label="Open profile and settings">N</button>
    </header>

    {settingsOpen && <aside className="profile-popover" aria-label="Profile menu">
      <strong>Study profile</strong><p>Your progress will sync when your account is connected.</p>
      <button onClick={() => { setPage('Profile'); setSettingsOpen(false); }}>Profile and settings</button>
    </aside>}

    <main className="learner-main">
      <div className="welcome-row">
        <div><p className="eyebrow">YOUR STUDY SPACE</p><h1>{coming ? page : 'A little Scrum, one day at a time.'}</h1>
          <p className="welcome-copy">{coming ? `Your ${page.toLowerCase()} will appear here as the PSM I course is built.` : 'Build a steady rhythm. Understand the rule. Be ready for the exam.'}</p>
        </div>
        <div className="sen-badge" aria-label="Sen the lotus sprout">
          <div className="sen-face"><span className="sen-leaf sen-leaf-a"/><span className="sen-leaf sen-leaf-b"/><span className="sen-eye sen-eye-a"/><span className="sen-eye sen-eye-b"/><span className="sen-smile"/></div>
          <span>Sen</span>
        </div>
      </div>

      {coming ? <section className="empty-workspace" aria-live="polite">
        <span className="empty-symbol">✿</span><h2>{page} is on the path</h2>
        <p>This first build is setting up the course player and saved progress. This section will become available when its learning flow is connected.</p>
        <button className="button-secondary" onClick={() => setPage('Today')}>Back to Today</button>
      </section> : <>
        <section className="progress-strip" aria-label="Study setup status">
          <div className="progress-icon" aria-hidden="true">✦</div>
          <div className="progress-message"><strong>Your PSM I path is ready to grow</strong><span>Course content is being prepared. Account sync is planned, but not connected in this preview.</span></div>
          <span className="status-chip"><i /> Setup</span>
        </section>

        <div className="home-grid">
          <section className="mission-panel">
            <div className="panel-heading"><div><p className="eyebrow">YOUR NEXT MISSION</p><h2>Start with the Scrum Team</h2></div><span className="chapter-count">Chapter 01</span></div>
            <div className="mission-art" aria-hidden="true">
              <div className="sun-disc"/><div className="cloud cloud-one"/><div className="cloud cloud-two"/>
              <div className="garden-path"/><div className="garden-leaf leaf-one"/><div className="garden-leaf leaf-two"/>
              <div className="garden-stem"/><div className="garden-head"><i/><i/><b/></div><div className="garden-pot"/>
              <span className="art-spark spark-one">✦</span><span className="art-spark spark-two">✳</span>
            </div>
            <div className="mission-copy"><div><span className="chapter-tag">CORE KNOWLEDGE</span><h3>Meet the Scrum Team</h3><p>Learn who creates value together—and what each accountability means.</p></div>
              <button className="button-primary" disabled title="Available after the first PSM I content release">Content coming soon <span aria-hidden="true">↗</span></button>
            </div>
          </section>

          <aside className="side-column">
            <section className="today-card"><div className="today-heading"><div><p className="eyebrow">TODAY</p><h2>Your first step</h2></div><span className="today-flower">✿</span></div><div className="today-progress"><span /><span /><span /><span /><span /></div><p className="muted-copy">A short session is enough to begin. Your daily goal can be set when onboarding is ready.</p><div className="goal-caption"><span>Study habit</span><strong>Not started</strong></div></section>
            <section className="inbox-card"><div className="inbox-icon">↻</div><div><h3>Review inbox</h3><p>No review items yet</p></div><span className="inbox-arrow" aria-hidden="true">›</span></section>
          </aside>
        </div>

        <section className="coming-section"><div className="section-title"><div><p className="eyebrow">YOUR LEARNING PATH</p><h2>Four steps toward PSM I</h2></div><button className="text-button" onClick={() => setPage('Map')}>See the map <span aria-hidden="true">↗</span></button></div>
          <div className="path-list">
            <PathStep number="01" title="The foundations" detail="Empiricism, lean thinking and Scrum values" tone="sky" active />
            <PathStep number="02" title="The Scrum Team" detail="Accountabilities, self-management and focus" tone="pink" />
            <PathStep number="03" title="The Sprint" detail="Events, purpose and timeboxes" tone="carrot" />
            <PathStep number="04" title="Artifacts and commitments" detail="Transparency, inspection and adaptation" tone="kiwi" />
          </div>
        </section>
      </>}
      <footer className="learner-footer"><span>Made for learning, not rushing.</span><span>PSM I · Scrum Guide 2020</span></footer>
    </main>

    <nav className="bottom-nav" aria-label="Main navigation">
      {nav.map((item) => <button key={item.page} className={page === item.page ? 'nav-item active' : 'nav-item'} onClick={() => { setPage(item.page); setSettingsOpen(false); }} aria-current={page === item.page ? 'page' : undefined}>
        <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.page}</span>
      </button>)}
    </nav>
  </div>;
}

function PathStep({ number, title, detail, tone, active = false }: { number: string; title: string; detail: string; tone: string; active?: boolean }) {
  return <article className={`path-step ${active ? 'is-active' : ''}`}><span className={`path-number ${tone}`}>{number}</span><div className="path-text"><strong>{title}</strong><span>{detail}</span></div><span className="path-state">{active ? 'Up next' : 'Coming up'}</span></article>;
}

export default App;
