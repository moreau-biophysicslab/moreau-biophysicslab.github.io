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
// Decorative illustration; no scientific data or experimental image is represented.
const particles = document.querySelector('#particles');
if (particles) {
  const ns = 'http://www.w3.org/2000/svg';
  let seed = 29;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 150; i++) {
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random());
    const x = 325 + Math.cos(angle) * radius * 179;
    const y = 260 + Math.sin(angle) * radius * 133;
    const rod = document.createElementNS(ns, 'rect');
    rod.setAttribute('x', x); rod.setAttribute('y', y);
    rod.setAttribute('width', 5 + random() * 4);
    rod.setAttribute('height', 13 + random() * 13);
    rod.setAttribute('rx', 4);
    rod.setAttribute('transform', `rotate(${random() * 180} ${x} ${y})`);
    rod.setAttribute('fill', i % 4 === 0 ? '#d4e5ae' : '#87b297');
    rod.setAttribute('opacity', .25 + random() * .6);
    particles.appendChild(rod);
  }
}
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
