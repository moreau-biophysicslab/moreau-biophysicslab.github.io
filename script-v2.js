const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
const search = document.querySelector('#publication-search');
if (search) {
  const entries = Array.from(document.querySelectorAll('.publication'));
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  let selected = 'all';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filterPublications() {
    const query = normalize(search.value.trim());
    let count = 0;
    entries.forEach(entry => {
      const show = (selected === 'all' || entry.dataset.type === selected) && normalize(entry.textContent).includes(query);
      entry.hidden = !show;
      if (show) count++;
    });
    document.querySelector('#result-count').textContent = `Showing ${count} ${count === 1 ? 'reference' : 'references'}`;
    document.querySelector('#no-results').hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    filterPublications();
  }));
  search.addEventListener('input', filterPublications);
}
