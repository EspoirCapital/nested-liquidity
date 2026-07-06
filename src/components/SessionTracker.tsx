import { useState, useEffect } from 'react';

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function pad2(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

function formatTime24(h: number): string {
  let hours = Math.floor(h);
  let mins = Math.round((h - hours) * 60);
  if (mins >= 60) { hours++; mins -= 60; }
  if (hours < 0) hours += 24;
  if (hours >= 24) hours -= 24;
  return pad2(hours) + ':' + pad2(mins);
}

function getOffsetHours(tz: string): number {
  try {
    const now = new Date();
    const tzStr = now.toLocaleString('en-US', { timeZone: tz });
    const utcStr = now.toLocaleString('en-US', { timeZone: 'UTC' });
    return (new Date(tzStr).getTime() - new Date(utcStr).getTime()) / 3600000;
  } catch { return 0; }
}

function getTZAbbr(tz: string): string {
  try {
    return new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ').pop() || '';
  } catch { return ''; }
}

function getTimeInTZ(tz: string): { hour: number; display: string } {
  const d = new Date();
  const display = d.toLocaleString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true });
  const hour = parseInt(d.toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false }));
  return { hour, display };
}

interface SessionDef {
  id: string;
  name: string;
  tz: string;
  open: number;
  close: number;
}

const SESSIONS: SessionDef[] = [
  { id: 'tokyo',   name: 'Tokyo',   tz: 'Asia/Tokyo',        open: 9,  close: 18 },
  { id: 'london',  name: 'London',  tz: 'Europe/London',     open: 8,  close: 17 },
  { id: 'newyork', name: 'New York', tz: 'America/New_York', open: 8,  close: 17 },
];

/* ─── Sub-components ──────────────────────────────────────────────────── */

function Timeline({ sessions }: { sessions: SessionDef[] }) {
  const userOffset = -new Date().getTimezoneOffset() / 60;
  const now = new Date();
  const localH = now.getHours() + now.getMinutes() / 60;

  return (
    <div className="st-canvas">
      <div className="st-timeline" id="stTimeline">
        <div className="st-now" id="stNow" style={{ left: (localH / 24 * 100) + '%' }} />
        {sessions.map(s => {
          const sOffset = getOffsetHours(s.tz);
          const openUtc = s.open - sOffset;
          const closeUtc = s.close - sOffset;
          const userOpen = ((openUtc + userOffset) % 24 + 24) % 24;
          const userClose = ((closeUtc + userOffset) % 24 + 24) % 24;

          if (userClose >= userOpen && userClose - userOpen < 24) {
            return (
              <div
                key={s.id}
                className={`st-block st-${s.id}`}
                style={{
                  left: `${userOpen / 24 * 100}%`,
                  width: `${(userClose - userOpen) / 24 * 100}%`,
                }}
              >
                {s.name} {formatTime24(userOpen)} – {formatTime24(userClose)}
              </div>
            );
          }
          // Wrapping case
          return (
            <span key={s.id}>
              <div
                className={`st-block st-${s.id}`}
                style={{
                  left: `${userOpen / 24 * 100}%`,
                  width: `${(24 - userOpen) / 24 * 100}%`,
                }}
              >
                {s.name} {formatTime24(userOpen)} – 24:00
              </div>
              <div
                className={`st-block st-${s.id}`}
                style={{ left: '0', width: `${userClose / 24 * 100}%` }}
              >
                {s.name} 00:00 – {formatTime24(userClose)}
              </div>
            </span>
          );
        })}
      </div>
      <div className="st-axis" id="stAxis">
        {[0, 6, 12, 18, 24].map(t => (
          <span key={t}>{t === 24 ? '24:00' : formatTime24(t)}</span>
        ))}
      </div>
    </div>
  );
}

function ConvertedHours({ sessions }: { sessions: SessionDef[] }) {
  const userOffset = -new Date().getTimezoneOffset() / 60;
  let userTZName = '';
  try { userTZName = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}

  return (
    <div className="st-converted" id="stConverted">
      <div className="st-conv-label">Session hours (your timezone)</div>
      <div className="st-conv-rows" id="stConvRows">
        {sessions.map(s => {
          const sOffset = getOffsetHours(s.tz);
          const sAbbr = getTZAbbr(s.tz);
          const openUtc = s.open - sOffset;
          const closeUtc = s.close - sOffset;
          const userOpen = openUtc + userOffset;
          const userClose = closeUtc + userOffset;
          return (
            <div key={s.id} className="st-conv-row">
              <span className="st-conv-name">{s.name}</span>
              <span className="st-conv-range">{formatTime24(userOpen)} – {formatTime24(userClose)}</span>
              <span className="st-conv-label-tag">{sAbbr}</span>
            </div>
          );
        })}
        <div style={{ fontSize: '10.5px', color: 'var(--ink-faint)', fontFamily: "'IBM Plex Mono', monospace", paddingTop: '4px', borderTop: '1px solid var(--line)', marginTop: '6px' }}>
          Your offset: UTC{userOffset >= 0 ? '+' : ''}{userOffset % 1 === 0 ? userOffset.toFixed(0) : userOffset.toFixed(1)} · {userTZName || 'detected'}
        </div>
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: SessionDef }) {
  const tzInfo = getTimeInTZ(session.tz);
  const isOpen = tzInfo.hour >= session.open && tzInfo.hour < session.close;
  const statusLabel = isOpen ? 'Open' : 'Closed';

  return (
    <div className="st-row" data-session={session.id}>
      <div className={`st-indicator ${isOpen ? 'open' : ''}`} id={`stInd${capitalize(session.id)}`} />
      <div className="st-name">{session.name}</div>
      <div className="st-local">{tzInfo.display}</div>
      <div className={`st-status ${isOpen ? 'open' : 'closed'}`}>{statusLabel}</div>
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export function SessionTracker() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const tokyo = getTimeInTZ('Asia/Tokyo');
  const london = getTimeInTZ('Europe/London');
  const ny = getTimeInTZ('America/New_York');

  const openTokyo = tokyo.hour >= 9 && tokyo.hour < 18;
  const openLondon = london.hour >= 8 && london.hour < 17;
  const openNy = ny.hour >= 8 && ny.hour < 17;

  let footnote = '';
  if (openLondon && openNy) {
    footnote = `London / NY overlap — LBMA + COMEX both active. London is currently ${getTZAbbr('Europe/London')}.`;
  } else if (openTokyo && openLondon) {
    footnote = `Tokyo / London overlap — Asian gold markets meet LBMA open. London is currently ${getTZAbbr('Europe/London')}.`;
  } else if (openTokyo) {
    footnote = 'Tokyo session — Asian gold markets active.';
  } else if (openLondon) {
    footnote = `London session — LBMA gold fix windows at 10:30 and 15:00 London time. London is currently ${getTZAbbr('Europe/London')}.`;
  } else if (openNy) {
    footnote = 'New York session — COMEX futures and US data releases.';
  } else {
    footnote = 'All sessions closed — weekend or inter-session gap.';
  }

  const userOffset = -now.getTimezoneOffset();
  const offH = Math.floor(Math.abs(userOffset) / 60);
  const offM = Math.abs(userOffset) % 60;
  const sign = userOffset >= 0 ? '+' : '-';

  let userTZName = '';
  try { userTZName = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}

  return (
    <div className="session-tracker" id="sessionTracker">
      <Timeline sessions={SESSIONS} />
      <ConvertedHours sessions={SESSIONS} />

      <div className="st-details" id="stDetails">
        <div className="st-header">
          <span style={{ width: '22px' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>Session</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>Current Time</span>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)' }}>Status</span>
        </div>
        {SESSIONS.map(s => <SessionRow key={s.id} session={s} />)}
        <div className="st-row" style={{ borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>
          <div style={{ background: 'var(--ink)', width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 }} />
          <div className="st-name" style={{ color: 'var(--accent)' }}>Your time</div>
          <div className="st-local" style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            {'  '}UTC{sign}{String(offH).padStart(2, '0')}:{String(offM).padStart(2, '0')}
          </div>
          <div className="st-status" style={{ color: 'var(--ink-faint)', fontSize: '10px' }}>{userTZName || 'detected'}</div>
        </div>
      </div>
      <div className="st-footnote" id="stFootnote">{footnote}</div>
    </div>
  );
}
