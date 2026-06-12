
(function(){
  // Helper: find elements by visible text
  function findByText(root, selector, regex) {
    const out = [];
    root.querySelectorAll(selector).forEach(el => {
      const txt = (el.innerText || el.textContent || "").trim();
      if (regex.test(txt)) out.push(el);
    });
    return out;
  }

  function hide(el){ if (el) el.style.display = 'none'; }

  function hideTuristPriser(root=document){
    // Only hide exact UI bits; never remove containers.
    findByText(root, 'button, a, [role="button"]', /turistpriser/i).forEach(hide);
    // Hide obvious class/id matches
    root.querySelectorAll('[id^="turist"], [id*="turist"], [class*="turist"]').forEach(hide);
    // Hide any modal by title text
    findByText(root, '.modal, [role="dialog"], .dialog, .react-modal, .card', /turistpriser/i).forEach(hide);
  }

  function tweakSummary(){
    // Title -> "Estimat med takstendringer"; hide Avstand/Tid label rows (not the table body)
    const cards = Array.from(document.querySelectorAll('.map-aside, .card')).filter(c => {
      const t = (c.querySelector('.map-title, .card-title') || {}).textContent || '';
      return /oppsummer|oppsummert|estimat/i.test(t);
    });
    cards.forEach(card => {
      const titleEl = card.querySelector('.map-title, .card-title');
      if (titleEl) titleEl.textContent = 'Estimat med takstendringer';

      // Hide rows that are label-value pairs for Avstand/Tid (not tables)
      card.querySelectorAll('div').forEach(div => {
        const t = (div.innerText || '').trim().toLowerCase();
        if ((t === 'avstand' || t === 'tid') && div.parentElement && div.parentElement.children.length === 2) {
          // Hide the label row and its value sibling
          hide(div.parentElement);
        }
      });
    });
  }

  function equalizeHeights(){
    const row = document.querySelector('.layout-2col');
    if (!row) return;
    const left = row.querySelector('.table-card');
    const right = row.querySelector('.map-aside') || row.children[1];
    if (!left || !right) return;
    left.style.minHeight = right.style.minHeight = 'auto';
    // Use requestAnimationFrame to wait for layout
    requestAnimationFrame(() => {
      const h = Math.max(left.offsetHeight, right.offsetHeight);
      left.style.minHeight = right.style.minHeight = h + 'px';
    });
  }

  function ensureDisclaimer(){
    if (document.getElementById('vt-disclaimer')) return;
    const host = document.querySelector('.page') || document.body;
    const foot = document.createElement('footer');
    foot.id = 'vt-disclaimer';
    foot.style.marginTop = '24px';
    foot.style.color = '#8a8a8a';
    foot.style.fontSize = '12px';
    foot.style.textAlign = 'center';
    foot.style.position = 'static';
    foot.style.zIndex = '0';
    foot.innerHTML = 'Estimatene er veiledende. Endelig pris kan variere i bilen basert på forhold som venting, trafikk, omkjøringer/stengte veier, værforhold m.m.' +
                     '<div style="margin-top:6px">Laget av <strong>Toni Kolve</strong>.</div>';
    host.appendChild(foot);
  }

  function run(){
    hideTuristPriser();
    tweakSummary();
    equalizeHeights();
    ensureDisclaimer();
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  window.addEventListener('resize', equalizeHeights);

  // Observe React renders but throttle via rAF
  let scheduled = false;
  const mo = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; run(); });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
