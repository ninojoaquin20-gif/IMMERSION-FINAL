// ── QR CODE GENERATION ──────────────────────────────────────────────

/**
 * Generate (or regenerate) a QR code inside the given element.
 * @param {string} elementId - The id of the container div.
 * @param {string} url       - The URL to encode.
 */
function generateQR(elementId, url) {
  const el = document.getElementById(elementId);
  el.innerHTML = '';
  new QRCode(el, {
    text: url,
    width: 140,
    height: 140,
    colorDark: '#1a1714',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

/**
 * Read the URL from the matching input and refresh the QR code.
 * @param {string} type - 'portfolio' or 'resume'.
 */
function updateQR(type) {
  const url = document.getElementById(type + 'Url').value.trim();
  if (!url) {
    alert('Please enter a URL first.');
    return;
  }
  // Save URL to localStorage
  localStorage.setItem('qr_' + type, url);
  generateQR('qr-' + type, url);
}

document.addEventListener('DOMContentLoaded', function () {
  // Restore saved QR URLs or fall back to defaults
  const portfolioUrl = localStorage.getItem('qr_portfolio') || 'https://example.com/portfolio.pdf';
  const resumeUrl    = localStorage.getItem('qr_resume')    || 'https://example.com/resume.pdf';

  // Also restore the input field values
  document.getElementById('portfolioUrl').value = portfolioUrl;
  document.getElementById('resumeUrl').value    = resumeUrl;

  generateQR('qr-portfolio', portfolioUrl);
  generateQR('qr-resume',    resumeUrl);
});

// ── IMAGE LOADER ─────────────────────────────────────────────────────

function loadImage(event, containerId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;

    // Save to localStorage so it survives page refreshes
    localStorage.setItem('img_' + containerId, imageData);

    // Display the image
    setImage(containerId, imageData);
  };
  reader.readAsDataURL(file);
}

function setImage(containerId, src) {
  const container = document.getElementById(containerId);
  container.innerHTML =
    '<img src="' + src +
    '" alt="photo" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
}

// ── RESTORE SAVED IMAGES ON PAGE LOAD ────────────────────────────────

const imageSlots = ['profileImgWrap', 'aboutPhoto1', 'aboutPhoto2', 'aboutPhoto3'];

imageSlots.forEach(function (id) {
  const saved = localStorage.getItem('img_' + id);
  if (saved) {
    setImage(id, saved);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  generateQR('qr-portfolio', 'https://example.com/portfolio.pdf');
  generateQR('qr-resume',    'https://example.com/resume.pdf');
});