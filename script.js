// script.js — vanilla JS timeline + modal
document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('timeline');
  const modal = document.getElementById('modal');

  // create a container for JS-generated markers (placed right after the <h2>)
  const markersContainer = document.createElement('div');
  markersContainer.id = 'timeline-markers';
  const heading = timeline.querySelector('h2');
  if (heading && heading.parentNode) heading.parentNode.insertBefore(markersContainer, heading.nextSibling);
  else timeline.prepend(markersContainer);

  // fetch events
  fetch('events.json')
    .then(res => {
      if (!res.ok) throw new Error('Could not load events.json');
      return res.json();
    })
    .then(events => {
      events.forEach((ev, i) => {
        const btn = document.createElement('button');
        btn.className = 'timeline-js-marker';
        btn.type = 'button';
        btn.title = `${ev.year} — ${ev.title}`;
        btn.innerHTML = `<strong>${escapeHtml(ev.year)}</strong>`;
        btn.addEventListener('click', () => openModal(ev));
        markersContainer.appendChild(btn);
      });
    })
    .catch(err => {
      console.error('Error loading events:', err);
      // optional: show a simple message in markersContainer
      markersContainer.textContent = 'Failed to load timeline events.';
    });

  // open modal with event data
  function openModal(ev) {
    modal.innerHTML = ''; // clear previous
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');

    const inner = document.createElement('div');
    inner.className = 'modal-inner';
    inner.innerHTML = `
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-body">
        <img class="modal-image" src="${escapeHtml(ev.imageURL)}" alt="${escapeHtml(ev.title)}">
        <div class="modal-text">
          <h2 class="modal-title">${escapeHtml(ev.title)}</h2>
          <p class="modal-year">${escapeHtml(ev.year)} · <em>${escapeHtml(ev.category)}</em></p>
          <p class="modal-desc">${escapeHtml(ev.description)}</p>
        </div>
      </div>
    `;

    modal.appendChild(inner);

    // close handlers
    inner.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '';
  }

  // click outside modal-inner closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });

  // tiny helper to avoid injecting unescaped HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
