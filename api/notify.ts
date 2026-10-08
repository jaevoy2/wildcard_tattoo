/**
 * Visit notification — Vercel Function (POST /api/notify).
 *
 * The browser pings this once per session. The server (not the browser) reads the visitor's
 * IP and approximate location from the platform's request headers, parses the user agent,
 * and emails a summary through Resend.
 *
 * Env vars (see .env.example): RESEND_API_KEY, NOTIFY_TO, NOTIFY_FROM
 */

const DEFAULT_TO = 'francis@creativedevlabs.com';
const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pingdom|uptime|monitor|preview|facebookexternalhit|curl|wget|python-requests/i;

// best-effort, per-instance throttle so a script can't flood the inbox
const recent = new Map<string, number>();
const THROTTLE_MS = 30 * 60 * 1000;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const clip = (v: unknown, n = 120) => (typeof v === 'string' ? v.slice(0, n) : '');
const dec = (v: string | null) => {
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

function parseUA(ua: string) {
  const browser =
    /Edg\/([\d.]+)/.exec(ua)?.[0].replace('Edg/', 'Edge ') ??
    /OPR\/([\d.]+)/.exec(ua)?.[0].replace('OPR/', 'Opera ') ??
    /Firefox\/([\d.]+)/.exec(ua)?.[0].replace('/', ' ') ??
    /Chrome\/([\d.]+)/.exec(ua)?.[0].replace('/', ' ') ??
    (/Safari\//.test(ua) && /Version\/([\d.]+)/.exec(ua)?.[0].replace('Version/', 'Safari ')) ??
    'Unknown';
  const os =
    /Windows NT 10|Windows NT 11/.test(ua) ? 'Windows' :
    /Android ([\d.]+)/.exec(ua)?.[0] ??
    /iPhone OS ([\d_]+)/.exec(ua)?.[0].replace(/_/g, '.') ??
    /iPad.*OS ([\d_]+)/.exec(ua)?.[0].replace(/_/g, '.') ??
    (/Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : /CrOS/.test(ua) ? 'ChromeOS' : 'Unknown');
  const type = /iPad|Tablet/.test(ua) ? 'Tablet' : /Mobi|iPhone|Android/.test(ua) ? 'Mobile' : 'Desktop';
  return { browser: browser || 'Unknown', os, type };
}

function clientIp(h: Headers) {
  return (
    h.get('x-vercel-forwarded-for') ||
    h.get('cf-connecting-ip') ||
    h.get('x-real-ip') ||
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    'Unknown'
  );
}

export async function POST(request: Request): Promise<Response> {
  const json = (body: object, status = 200) => Response.json(body, { status });
  const h = request.headers;
  const ua = h.get('user-agent') ?? '';

  if (!ua || BOT_RE.test(ua)) return json({ ok: true, skipped: 'bot' });

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* body is optional */
  }

  const ip = clientIp(h);
  const last = recent.get(ip);
  if (last && Date.now() - last < THROTTLE_MS) return json({ ok: true, skipped: 'throttled' });
  recent.set(ip, Date.now());

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[notify] RESEND_API_KEY is not set — visit not emailed');
    return json({ ok: false, reason: 'not configured' }, 500);
  }

  const city = dec(h.get('x-vercel-ip-city'));
  const region = h.get('x-vercel-ip-country-region') ?? '';
  const country = h.get('x-vercel-ip-country') ?? h.get('cf-ipcountry') ?? '';
  const location = [city, region, country].filter(Boolean).join(', ') || 'Unknown (no geo headers on this host)';
  const { browser, os, type } = parseUA(ua);
  const tz = clip(body.timezone, 60) || h.get('x-vercel-ip-timezone') || 'UTC';
  const now = new Date();
  let local = now.toUTCString();
  try {
    local = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: tz }).format(now);
  } catch {
    /* unknown tz string — keep UTC */
  }

  const rows: [string, string][] = [
    ['IP Address', ip],
    ['Location', location],
    ['Device', `${type} · ${os}${body.screen ? ` · ${clip(body.screen, 20)}` : ''}`],
    ['Browser', browser],
    ['Date/Time', `${local} (${tz})`],
    ['UTC', now.toISOString()],
    ['Page', clip(body.page, 200) || '/'],
    ['Referrer', clip(body.referrer, 200) || 'Direct'],
  ];

  const html = `<div style="font-family:system-ui,sans-serif;max-width:520px">
    <h2 style="margin:0 0 12px">New visitor on Wildcard Studios</h2>
    <table style="border-collapse:collapse;width:100%">${rows
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
      .join('')}</table></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'Wildcard Site <onboarding@resend.dev>',
      to: [process.env.NOTIFY_TO || DEFAULT_TO],
      subject: `New site visit — ${location}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[notify] Resend error', res.status, await res.text());
    return json({ ok: false }, 502);
  }
  return json({ ok: true });
}
