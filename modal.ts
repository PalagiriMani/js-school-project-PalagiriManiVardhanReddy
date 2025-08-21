import { EventData } from "./types";

/**
 * Escapes HTML characters to prevent cross-site scripting (XSS) attacks
 * and ensures safe rendering of dynamic content.
 * @param str The string to escape.
 * @returns The escaped string.
 */
function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const modal = document.getElementById('modal');

/**
 * Closes the modal by hiding it and resetting its content.
 */
export function closeModal(): void {
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '';
  }
}

/**
 * Opens the modal and populates it with event data.
 * @param ev The event data object to display in the modal.
 */
export function openModal(ev: EventData): void {
  if (!modal) return;

  // Clear previous content
  modal.innerHTML = ''; 
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

  // Close handlers
  const closeBtn = inner.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Click outside modal-inner closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
}
