import { useMemo, useState } from 'react';

type Filter = 'All chapters' | 'Drafts' | 'Published';
type Chapter = { id: string; title: string; area: string; detail: string; status: 'Not started' | 'Draft' | 'Published'; color: string };

const starterChapters: Chapter[] = [
  { id: '01', title: 'Why Scrum', area: 'The foundations', detail: 'Empiricism · Lean thinking · Scrum values', status: 'Not started', color: 'sky' },
  { id: '02', title: 'Meet the Scrum Team', area: 'The foundations', detail: 'Accountabilities · Self-management · Focus', status: 'Not started', color: 'pink' },
  { id: '03', title: 'The Sprint rhythm', area: 'The Sprint', detail: 'Events · Purposes · Timeboxes', status: 'Not started', color: 'carrot' },
  { id: '04', title: 'The board', area: 'Artifacts and commitments', detail: 'Product Goal · Sprint Goal · Definition of Done', status: 'Not started', color: 'kiwi' },
  { id: '05', title: 'Bad habits', area: 'Working with Scrum', detail: 'Common misconceptions and anti-patterns', status: 'Not started', color: 'grape' },
  { id: '06', title: 'Your toolkit', area: 'Working with Scrum', detail: 'Servant leadership · Facilitation · Coaching', status: 'Not started', color: 'sunshine' },
];

function App() {
  const [filter, setFilter] = useState<Filter>('All chapters');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Chapter | null>(null);
  const [notice, setNotice] = useState('');
  const chapters = useMemo(() => starterChapters.filter((chapter) => chapter.title.toLowerCase().includes(search.toLowerCase()) && (filter !== 'Drafts' || chapter.status === 'Draft') && (filter !== 'Published' || chapter.status === 'Published')), [filter, search]);

  return <div className="studio-shell">
    <aside className="studio-sidebar">
      <a className="studio-brand" href="#library"><span className="studio-brand-icon">S</span><span>Sprint Story<small>STUDIO</small></span></a>
      <div className="sidebar-label">WORKSPACE</div>
      <button className="sidebar-link active"><span>▦</span> Content library</button>
      <button className="sidebar-link" onClick={() => setNotice('Analytics will be connected after learner sessions are collected.')}><span>◷</span> Content analytics</button>
      <button className="sidebar-link" onClick={() => setNotice('Team management is not needed in solo-owner mode.')}><span>♙</span> Team and access</button>
      <div className="sidebar-bottom"><div className="owner-avatar">N</div><div><strong>Workspace owner</strong><span>Solo authoring</span></div><button aria-label="Workspace options" onClick={() => setNotice('Workspace settings are not connected yet.')}>···</button></div>
    </aside>

    <main className="studio-main">
      <header className="studio-topbar"><div className="crumb">Library <span>/</span> <strong>PSM I</strong></div><div className="studio-top-actions"><span className="api-status"><i/> Preview only</span><button className="help-button" onClick={() => setNotice('Draft locally, validate the source, preview the mission, then publish a version.')}>Help</button></div></header>
      <div className="studio-content">
        <div className="studio-heading-row"><div><p className="studio-eyebrow">CONTENT LIBRARY</p><h1>Build the learning path.</h1><p className="studio-subtitle">Prepare the PSM I chapters and keep each lesson grounded in its source.</p></div><button className="new-version-button" disabled title="Authoring API is not connected yet"><span>＋</span> New chapter</button></div>
        {notice && <div className="studio-notice" role="status"><span>i</span><p>{notice}</p><button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}

        <section className="studio-overview" aria-label="PSM I content status"><div className="overview-title"><span className="exam-mark">P</span><div><strong>Professional Scrum Master I</strong><span>One exam · Six planned chapters</span></div></div><div className="overview-stats"><div><strong>0</strong><span>Drafts</span></div><div><strong>0</strong><span>Published</span></div><div><strong>6</strong><span>Planned</span></div></div></section>

        <div className="library-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filter chapters">{(['All chapters', 'Drafts', 'Published'] as Filter[]).map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a chapter" aria-label="Find a chapter"/></label></div>

        {chapters.length ? <section className="chapter-list" aria-label="PSM I chapters">{chapters.map((chapter) => <button key={chapter.id} className={`chapter-row ${selected?.id === chapter.id ? 'chosen' : ''}`} onClick={() => setSelected(chapter)}><span className={`chapter-symbol ${chapter.color}`}>{chapter.id}</span><span className="chapter-name"><strong>{chapter.title}</strong><small>{chapter.area} <i>·</i> {chapter.detail}</small></span><span className="chapter-status"><i className="status-dot"/>{chapter.status}</span><span className="row-chevron">›</span></button>)}</section> : <div className="library-empty"><span>⌕</span><strong>No chapters match this filter</strong><p>Try another filter or search for a different title.</p></div>}

        <footer className="studio-footer"><span>Sources matter. Every exam item needs a guide and a reference.</span><button onClick={() => setNotice('Content schemas and the source-review workflow are being built first.')}>Read authoring notes <span>↗</span></button></footer>
      </div>
    </main>

    {selected && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside className="chapter-drawer" aria-label={`${selected.title} chapter details`}><button className="drawer-close" onClick={() => setSelected(null)} aria-label="Close chapter details">×</button><span className={`chapter-symbol large ${selected.color}`}>{selected.id}</span><p className="studio-eyebrow">PSM I · {selected.area.toUpperCase()}</p><h2>{selected.title}</h2><p>{selected.detail}</p><div className="drawer-status"><span>Status</span><strong>{selected.status}</strong></div><div className="drawer-empty"><strong>No draft yet</strong><span>When authoring is connected, create a version here to start building the scene, rules, game and exam questions.</span></div><button className="new-version-button full" disabled>New draft version</button></aside></div>}
  </div>;
}

export default App;
