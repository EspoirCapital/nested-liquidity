import type { PageData } from '../data/pages';

interface SidebarProps {
  pages: PageData[];
  current: number;
  onNavigate: (i: number) => void;
}

export function Sidebar({ pages, current, onNavigate }: SidebarProps) {
  let lastGroup = '';

  return (
    <>
      <div className="sidebar-header">
        <div className="sidebar-title">Nested <em>Liquidity</em></div>
        <div className="sidebar-sub">Strategy Documentation</div>
      </div>
      <nav id="toc">
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
              id={'toc-' + i}
              onClick={() => onNavigate(i)}
            >
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {page.title}
            </a>
          );
          return nodes;
        })}
      </nav>
    </>
  );
}
