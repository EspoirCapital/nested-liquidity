import { useEffect, useState, useCallback, useRef } from 'react';
import { loadPages, slugify, buildRouteIndex } from '../data/pages';
import { PageContent } from './PageContent';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';

const pages = loadPages();
const routeIndex = buildRouteIndex(pages);

export function Layout() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parse current URL to find page index
  const parsePath = useCallback(() => {
    const path = location.pathname.replace(/^\//, '');
    return routeIndex[path] ?? 0;
  }, []);

  // Initial page load from URL
  useEffect(() => {
    setCurrent(parsePath());
  }, [parsePath]);

  // Listen for back/forward navigation
  useEffect(() => {
    const handler = () => setCurrent(parsePath());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [parsePath]);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= pages.length) return;
    const page = pages[i];
    const route = '/' + slugify(page.group) + '/' + page.file;
    if (location.pathname !== route) {
      history.pushState({ page: i }, '', route);
    }
    setCurrent(i);
    contentRef.current?.scrollTo(0, 0);
    setMenuOpen(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="app">
      <div className="mobile-topbar">
        <div className="mt-brand">
          <span className="brand-n">N</span><span className="brand-l">L</span>
        </div>
        <div className="mt-center" id="pageTitle">{pages[current].title}</div>
        <button
          className={'mt-toggle' + (menuOpen ? ' open' : '')}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <MobileMenu
        pages={pages}
        current={current}
        onNavigate={goTo}
        open={menuOpen}
      />

      <aside className="sidebar">
        <Sidebar
          pages={pages}
          current={current}
          onNavigate={goTo}
        />
      </aside>

      <div className="main">
        <div className="content-scroll" ref={contentRef}>
          <PageContent
            page={pages[current]}
            pageIndex={current}
          />
        </div>
        <div className="page-footer-nav">
          <button
            className="nav-btn"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            &larr; Prev
          </button>
          <div className="page-progress">
            <strong>{current + 1}</strong> / {pages.length}
          </div>
          <button
            className="nav-btn"
            disabled={current === pages.length - 1}
            onClick={() => goTo(current + 1)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
