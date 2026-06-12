
document.addEventListener('DOMContentLoaded', () => {
  const kill = (el) => el && el.parentNode && el.parentNode.removeChild(el);
  document.querySelectorAll('button, a, [role="button"]').forEach(el => {
    const t = (el.textContent || '').toLowerCase();
    if (t.includes('turist')) kill(el.closest('.card, .modal, .dialog, .tooltip') || el);
  });
  document.querySelectorAll('[id*="turist" i], [class*="turist" i]').forEach(el => kill(el.closest('.card, .modal, .dialog') || el));
});
