import type { PageData } from '../data/pages';

interface MobileMenuProps {
  pages: PageData[];
  current: number;
  onNavigate: (i: number) => void;
  open: boolean;
}

export function MobileMenu({ pages, current, onNavigate, open }: MobileMenuProps) {
  let lastGroup = '';

  return (
    <nav className={'mobile-menu' + (open ? ' open' : '')}>
      <div className="mobile-menu-body">
        {pages.flatMap((page, i) => {
          const nodes: React.ReactElement[] = [];
          if (page.group !== lastGroup) {
            nodes.push(<div key={'g-' + i} className="toc-group-label">{page.group}</div>);
            lastGroup = page.group;
          }
          nodes.push(
            <a
              key={i}
              className={'toc-item' + (i === current ? ' active' : '')}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate(i)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(i); } }}
            >
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {page.title}
            </a>
          );
          return nodes;
        })}
      </div>
    </nav>
  );
}
