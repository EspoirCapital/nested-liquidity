import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { PageData } from '../data/pages';
import { SessionTracker } from './SessionTracker';
import { PositionSizeCalc } from './PositionSizeCalc';
import { EVCalculator } from './EVCalculator';
import { LondonWindow } from './LondonWindow';
import { Lightbox } from './Lightbox';

interface PageContentProps {
  page: PageData;
  pageIndex: number;
}

export function PageContent({ page, pageIndex }: PageContentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');

  // EV Calculator renders its own full content (no wrapper class in HTML)
  const isEVPage = page.html.includes('ev-rrChart');

  useEffect(() => {
    if (isEVPage) return;
    const el = wrapperRef.current;
    if (!el) return;

    // Mount widgets via createRoot into existing wrapper elements
    const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLElement }> = [];

    // Session Tracker
    const stContainers = el.querySelectorAll('.session-tracker');
    stContainers.forEach((container) => {
      container.innerHTML = '';
      const root = createRoot(container);
      root.render(<SessionTracker />);
      roots.push({ root, container: container as HTMLElement });
    });

    // Position Size Calculator
    const psContainers = el.querySelectorAll('.ps-calculator');
    psContainers.forEach((container) => {
      container.innerHTML = '';
      const root = createRoot(container);
      root.render(<PositionSizeCalc />);
      roots.push({ root, container: container as HTMLElement });
    });

    // London Window
    const lwContainers = el.querySelectorAll('.london-window');
    lwContainers.forEach((container) => {
      container.innerHTML = '';
      const root = createRoot(container);
      root.render(<LondonWindow />);
      roots.push({ root, container: container as HTMLElement });
    });

    // Color copy buttons
    const handlers: Array<{ el: HTMLElement; handler: () => void }> = [];
    el.querySelectorAll<HTMLElement>('.clr-copy').forEach((btn) => {
      const handler = () => {
        const color = btn.getAttribute('data-clr') || btn.textContent || '';
        navigator.clipboard.writeText(color.trim().toLowerCase()).catch(() => {});
        const orig = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 1200);
      };
      btn.addEventListener('click', handler);
      handlers.push({ el: btn, handler });
    });

    return () => {
      roots.forEach(({ root }) => root.unmount());
      handlers.forEach(({ el, handler }) => el.removeEventListener('click', handler));
    };
  }, [pageIndex, isEVPage]);

  // Lightbox: event delegation on wrapper for image clicks
  useEffect(() => {
    if (isEVPage) return;
    const el = wrapperRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('.page-img')) {
        const img = target as HTMLImageElement;
        setLightboxSrc(img.src);
        setLightboxAlt(img.alt || '');
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [pageIndex, isEVPage]);

  if (isEVPage) {
    return <EVCalculator />;
  }

  const pageId = 'page_' + (pageIndex + 1);
  // Inject `active` class and page id into the markdown's own <div class="page"> tag
  const html = page.html.replace(
    /<div\s+class="page(\s[^"]*)?"/i,
    `<div class="page active$1" id="${pageId}"`,
  );

  return (
    <>
      <div
        key={pageIndex}
        ref={wrapperRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  );
}
