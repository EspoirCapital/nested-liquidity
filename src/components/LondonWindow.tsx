import { useState, useEffect } from 'react';

function formatTime(h: number): string {
  let hours = Math.floor(h);
  let mins = Math.round((h - hours) * 60);
  if (mins >= 60) { hours++; mins -= 60; }
  if (hours < 0) hours += 24;
  if (hours >= 24) hours -= 24;
  const hh = hours < 10 ? '0' + hours : '' + hours;
  const mm = mins < 10 ? '0' + mins : '' + mins;
  return hh + ':' + mm;
}

function isDST(date: Date, tz: string): boolean {
  const jan = new Date(date.getFullYear(), 0, 1).toLocaleString('en-US', { timeZone: tz, timeZoneName: 'short' });
  const janAbbr = jan.split(' ').pop();
  const current = date.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ').pop();
  return current !== janAbbr;
}

export function LondonWindow() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const userOffset = -now.getTimezoneOffset() / 60;
  const dst = isDST(now, 'Europe/London');

  // London 08:00–13:00 in UTC, then to user local
  const summerOpenUtc = 7;
  const summerCloseUtc = 12;
  const winterOpenUtc = 8;
  const winterCloseUtc = 13;

  const openUtc = dst ? summerOpenUtc : winterOpenUtc;
  const closeUtc = dst ? summerCloseUtc : winterCloseUtc;

  const openLocal = ((openUtc + userOffset) % 24 + 24) % 24;
  const closeLocal = ((closeUtc + userOffset) % 24 + 24) % 24;

  // Check if currently in window
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const inWindow = currentHour >= openLocal && currentHour < closeLocal;

  let userTZ = '';
  try { userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}

  const sign = userOffset >= 0 ? '+' : '';
  const offStr = sign + (userOffset % 1 === 0 ? userOffset.toFixed(0) : userOffset.toFixed(1));

  return (
    <div style={{ background: '#fbfaf7', border: '1px solid #e2e0d8', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
      <div style={{ fontWeight: 700, fontFamily: "'Source Serif 4', serif", fontSize: '15px', marginBottom: '10px' }}>
        Your trading window
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '28px', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: inWindow ? '#1f5c4c' : '#1c1c1a' }}>
          {formatTime(openLocal)} – {formatTime(closeLocal)}
        </span>
        {inWindow && (
          <span style={{ background: '#1f5c4c', color: '#fff', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live
          </span>
        )}
      </div>
      <div style={{ fontSize: '13px', color: '#4a4a45', fontFamily: "'IBM Plex Mono', monospace" }}>
        UTC{offStr} · {userTZ || 'detected'} · London is currently {dst ? 'BST (UTC+1)' : 'GMT (UTC+0)'}
      </div>
      <div style={{ fontSize: '12px', color: '#8a8a85', marginTop: '8px' }}>
        5-hour window · First 5 hours of London session (08:00–13:00 London time)
      </div>
    </div>
  );
}
