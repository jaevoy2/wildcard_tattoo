/** Tells the server about this visit (once per browser session). The server adds IP + location. */
export function notifyVisit() {
  try {
    if (sessionStorage.getItem('wc-visit-sent')) return;
    sessionStorage.setItem('wc-visit-sent', '1');
  } catch {
    /* storage blocked — still send once per page load */
  }
  fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      page: location.pathname + location.search,
      referrer: document.referrer,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  }).catch(() => {
    /* never affect the visitor's experience */
  });
}
