export interface PageManifestEntry {
  group: string;
  title: string;
  file: string;
}

export interface PageData extends PageManifestEntry {
  html: string;
}

import manifestJson from './pages.json';
const manifest = manifestJson as PageManifestEntry[];

// Import all .md files at build time via Vite glob
const mdModules = import.meta.glob('./pages/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export function loadPages(): PageData[] {
  return manifest.map((entry) => {
    const groupFolder = slugify(entry.group);
    const key = `./pages/${groupFolder}/${entry.file}.md`;
    const html = mdModules[key] ?? '<div class="page"><p>Page not found.</p></div>';
    return { ...entry, html: html.trim() };
  });
}

export function slugify(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function buildRouteIndex(pages: PageData[]): Record<string, number> {
  const idx: Record<string, number> = {};
  pages.forEach((p, i) => {
    idx[slugify(p.group) + '/' + p.file] = i;
  });
  return idx;
}
