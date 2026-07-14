document.addEventListener('DOMContentLoaded', function () {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  renderContent();
  initContactForm();
  initReviewSystem();
  initAdminPanel();
  initVideoPlayer();
});

function renderContent() {
  const c = getContent();
  document.querySelector('.hero-content h1').textContent = c.hero.title;
  document.querySelector('.hero-content p').textContent = c.hero.subtitle;
  const heroBtns = document.querySelectorAll('.hero-content .btn');
  if (heroBtns[0]) heroBtns[0].textContent = c.hero.btn1;
  if (heroBtns[1]) heroBtns[1].textContent = c.hero.btn2;
  document.querySelector('#about h2').textContent = c.about.heading;
  document.querySelector('.about-text').innerHTML = c.about.text;
  const aboutImg = document.querySelector('.about-image img');
  if (aboutImg) {
    aboutImg.src = c.about.image;
    aboutImg.alt = c.about.imageAlt;
  }
  document.querySelector('#gallery h2').textContent = c.gallery.heading;
  renderGallery('.gallery-grid:first-of-type', c.gallery.images);
  var g2heading = document.querySelector('#gallery-interior h2');
  if (g2heading && c.gallery2) g2heading.textContent = c.gallery2.heading;
  if (c.gallery2) {
    var grids = document.querySelectorAll('.gallery-grid');
    if (grids.length > 1) renderGalleryGrid(grids[1], c.gallery2.images);
  }
  document.querySelector('#contact h2').textContent = c.contact.heading;
  document.querySelector('.contact-info p:nth-of-type(1)').innerHTML = '<strong>Adres:</strong> ' + c.contact.address;
  document.querySelector('.contact-info p:nth-of-type(2)').innerHTML = '<strong>Telefon:</strong> ' + c.contact.phone;
  document.querySelector('.contact-info p:nth-of-type(3)').innerHTML = '<strong>Email:</strong> ' + c.contact.email;
  document.querySelector('.footer-logo h3').textContent = c.footer.brand;
  document.querySelector('.footer-logo p').textContent = c.footer.tagline;
  document.querySelector('.footer-bottom p').innerHTML = '&copy; <span id="year"></span> ' + c.footer.copyright + '. Wszystkie prawa zastrzeżone.';
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function renderGallery(selector, images) {
  var grid = document.querySelector(selector);
  if (grid) renderGalleryGrid(grid, images);
}

function renderGalleryGrid(grid, images) {
  grid.innerHTML = '';
  images.forEach(function (img) {
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '">' +
      '<div class="gallery-overlay">' +
      (img.title ? '<h3>' + img.title + '</h3>' : '') +
      (img.desc ? '<p>' + img.desc + '</p>' : '') +
      '</div>';
    grid.appendChild(item);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showStatus('Proszę wypełnić wszystkie pola.', 'error', status);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Proszę podać poprawny adres email.', 'error', status);
      return;
    }
    showStatus('Dziękujemy! Twoja wiadomość została wysłana.', 'success', status);
    form.reset();
    setTimeout(function () { status.style.display = 'none'; }, 5000);
  });
}

function initReviewSystem() {
  const form = document.getElementById('addReviewForm');
  const status = document.getElementById('reviewStatus');
  const slider = document.querySelector('.reviews-slider');
  if (!form || !slider) return;

  loadReviews();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.reviewName.value.trim();
    const text = form.reviewText.value.trim();
    if (!name || !text) {
      showStatus('Proszę wypełnić oba pola.', 'error', status);
      return;
    }
    addReview(name, text, slider, status);
    form.reset();
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
      const adminToggle = document.getElementById('adminToggle');
      if (!adminToggle || !adminToggle.checked) {
        showStatus('Musisz włączyć tryb admin, aby usuwać opinie.', 'error', status);
        return;
      }
      const item = e.target.closest('.review-item');
      if (item) {
        item.remove();
        saveReviewList(slider);
        showStatus('Opinia została usunięta.', 'success', status);
        setTimeout(function () { status.style.display = 'none'; }, 3000);
      }
    }
  });
}

function loadReviews() {
  const slider = document.querySelector('.reviews-slider');
  if (!slider) return;
  try {
    const stored = localStorage.getItem('REVIEWS');
    if (stored) {
      const reviews = JSON.parse(stored);
      slider.innerHTML = '';
      reviews.forEach(function (r) {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = '<p>"' + r.text + '"</p><p class="author">— ' + r.name + '</p><button class="btn-delete btn">Usuń</button>';
        slider.appendChild(div);
      });
    }
  } catch (e) { }
  const adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    const delBtns = slider.querySelectorAll('.btn-delete');
    delBtns.forEach(function (btn) { btn.style.display = adminToggle.checked ? 'inline-block' : 'none'; });
  } else {
    const delBtns = slider.querySelectorAll('.btn-delete');
    delBtns.forEach(function (btn) { btn.style.display = 'none'; });
  }
}

function addReview(name, text, slider, statusEl) {
  const div = document.createElement('div');
  div.className = 'review-item';
  div.innerHTML = '<p>"' + text + '"</p><p class="author">— ' + name + '</p><button class="btn-delete btn">Usuń</button>';
  const adminToggle = document.getElementById('adminToggle');
  if (!adminToggle || !adminToggle.checked) {
    div.querySelector('.btn-delete').style.display = 'none';
  }
  slider.appendChild(div);
  saveReviewList(slider);
  showStatus('Dziękujemy za opinię!', 'success', statusEl);
  setTimeout(function () { statusEl.style.display = 'none'; }, 3000);
}

function saveReviewList(slider) {
  const items = slider.querySelectorAll('.review-item');
  const reviews = [];
  items.forEach(function (item) {
    const p = item.querySelector('p');
    const author = item.querySelector('.author');
    if (p && author) {
      reviews.push({
        text: p.textContent.replace(/^"|"$/g, ''),
        name: author.textContent.replace('— ', '')
      });
    }
  });
  localStorage.setItem('REVIEWS', JSON.stringify(reviews));
}

function initAdminPanel() {
  const adminPanel = document.getElementById('adminPanel');
  const adminPassword = document.getElementById('adminPassword');
  const adminSubmit = document.getElementById('adminSubmit');
  const adminStatus = document.getElementById('adminStatus');
  const adminToggle = document.getElementById('adminToggle');

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      if (adminPanel) {
        adminPanel.classList.toggle('hidden');
        if (!adminPanel.classList.contains('hidden')) {
          adminPassword.value = '';
          adminStatus.textContent = '';
          adminStatus.style.display = 'none';
          adminPassword.focus();
        }
      }
    }
  });

  if (adminSubmit) {
    adminSubmit.addEventListener('click', function () {
      const pw = adminPassword.value.trim();
      if (pw === getContent().admin.password) {
        adminToggle.checked = true;
        adminToggle.dispatchEvent(new Event('change'));
        adminStatus.textContent = 'Hasło poprawne! Tryb admin aktywowany.';
        adminStatus.className = 'form-status success';
        adminStatus.style.display = 'block';
        adminPanel.classList.add('hidden');
        initAdminEditor();
        setTimeout(function () { adminStatus.style.display = 'none'; }, 2000);
      } else {
        adminStatus.textContent = 'Nieprawidłowe hasło.';
        adminStatus.className = 'form-status error';
        adminStatus.style.display = 'block';
        adminPassword.value = '';
        adminPassword.focus();
      }
    });
  }

  if (adminToggle) {
    adminToggle.addEventListener('change', function () {
      const delBtns = document.querySelectorAll('.btn-delete');
      delBtns.forEach(function (btn) { btn.style.display = adminToggle.checked ? 'inline-block' : 'none'; });
    });
  }
}

function initAdminEditor() {
  let existing = document.getElementById('adminEditor');
  if (existing) {
    existing.style.display = 'block';
    return;
  }

  const c = getContent();
  const editor = document.createElement('div');
  editor.id = 'adminEditor';
  editor.innerHTML = `
    <div id="adminEditorOverlay"></div>
    <div id="adminEditorPanel">
      <div id="adminEditorHeader">
        <h2>Panel zarządzania treścią</h2>
        <button id="adminEditorClose" class="btn btn-secondary">Zamknij</button>
      </div>
      <div id="adminEditorTabs">
        <button class="tab-btn active" data-tab="hero">Nagłówek</button>
        <button class="tab-btn" data-tab="about">O nas</button>
        <button class="tab-btn" data-tab="gallery">Galeria</button>
        <button class="tab-btn" data-tab="gallery2">Wnętrza</button>
        <button class="tab-btn" data-tab="contact">Kontakt</button>
        <button class="tab-btn" data-tab="footer">Stopka</button>
        <button class="tab-btn" data-tab="settings">Ustawienia</button>
      </div>
      <div id="adminEditorContent">
        ${renderHeroTab(c)}
        ${renderAboutTab(c)}
        ${renderGalleryTab(c, 'gallery', 'Galeria zewnętrzna')}
        ${renderGalleryTab(c, 'gallery2', 'Galeria wnętrz')}
        ${renderContactTab(c)}
        ${renderFooterTab(c)}
        ${renderSettingsTab(c)}
      </div>
      <div id="adminEditorFooter">
        <button id="adminSaveBtn" class="btn">Zapisz zmiany</button>
        <button id="adminResetBtn" class="btn btn-secondary">Przywróć domyślne</button>
        <span id="adminEditorStatus" class="form-status" style="display:none"></span>
      </div>
    </div>`;
  document.body.appendChild(editor);

  document.getElementById('adminEditorClose').addEventListener('click', function () {
    editor.style.display = 'none';
  });

  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.editor-tab').forEach(function (t) { t.classList.remove('active'); });
      btn.classList.add('active');
      var tabId = btn.getAttribute('data-tab');
      var tab = document.getElementById('tab-' + tabId);
      if (tab) tab.classList.add('active');
    });
  });

  document.getElementById('adminSaveBtn').addEventListener('click', function () {
    saveEditorContent();
  });

  document.getElementById('adminResetBtn').addEventListener('click', function () {
    if (confirm('Przywrócić domyślne ustawienia? Stracisz wszystkie swoje zmiany.')) {
      resetContent();
      renderContent();
      location.reload();
    }
  });
}

function renderHeroTab(c) {
  return '<div id="tab-hero" class="editor-tab active">' +
    '<div class="form-group"><label>Tytuł</label><input type="text" id="edit-hero-title" value="' + escHtml(c.hero.title) + '"></div>' +
    '<div class="form-group"><label>Podtytuł</label><input type="text" id="edit-hero-subtitle" value="' + escHtml(c.hero.subtitle) + '"></div>' +
    '<div class="form-group"><label>Przycisk 1</label><input type="text" id="edit-hero-btn1" value="' + escHtml(c.hero.btn1) + '"></div>' +
    '<div class="form-group"><label>Przycisk 2</label><input type="text" id="edit-hero-btn2" value="' + escHtml(c.hero.btn2) + '"></div>' +
    '</div>';
}

function renderAboutTab(c) {
  return '<div id="tab-about" class="editor-tab">' +
    '<div class="form-group"><label>Nagłówek</label><input type="text" id="edit-about-heading" value="' + escHtml(c.about.heading) + '"></div>' +
    '<div class="form-group"><label>Treść (HTML)</label><textarea id="edit-about-text" rows="10">' + escHtml(c.about.text) + '</textarea></div>' +
    '<div class="form-group"><label>Ścieżka zdjęcia</label><input type="text" id="edit-about-image" value="' + escHtml(c.about.image) + '"></div>' +
    '<div class="form-group"><label>Alt zdjęcia</label><input type="text" id="edit-about-imageAlt" value="' + escHtml(c.about.imageAlt) + '"></div>' +
    '</div>';
}

function renderGalleryTab(c, key, label) {
  var suffix = key === 'gallery' ? '' : '2';
  var data = c[key] || { heading: '', images: [] };
  var html = '<div id="tab-' + key + '" class="editor-tab">' +
    '<div class="form-group"><label>Nagłówek (' + label + ')</label><input type="text" id="edit-' + key + '-heading" value="' + escHtml(data.heading) + '"></div>' +
    '<h3 style="margin-top:1rem">Zdjęcia – ' + label + '</h3>' +
    '<div id="gallery-items-editor' + suffix + '">';
  data.images.forEach(function (img, i) {
    html += '<div class="gallery-edit-item" data-index="' + i + '">' +
      '<div class="form-group"><label>Ścieżka zdjęcia ' + (i + 1) + '</label><input type="text" class="edit-' + key + '-src" value="' + escHtml(img.src) + '"></div>' +
      '<div class="form-group"><label>Alt tekst</label><input type="text" class="edit-' + key + '-alt" value="' + escHtml(img.alt) + '"></div>' +
      '<div class="form-group"><label>Tytuł (nad zdjęciem)</label><input type="text" class="edit-' + key + '-title" value="' + escHtml(img.title || '') + '"></div>' +
      '<div class="form-group"><label>Opis</label><input type="text" class="edit-' + key + '-desc" value="' + escHtml(img.desc || '') + '"></div>' +
      '<button class="btn btn-secondary btn-sm gallery-remove-btn" data-gallery="' + key + '">Usuń zdjęcie</button>' +
      '<hr></div>';
  });
  html += '</div>' +
    '<button id="gallery-add-btn' + suffix + '" class="btn gallery-add-btn" data-gallery="' + key + '" style="margin-top:0.5rem">+ Dodaj zdjęcie</button>' +
    '</div>';
  return html;
}

function renderContactTab(c) {
  return '<div id="tab-contact" class="editor-tab">' +
    '<div class="form-group"><label>Nagłówek</label><input type="text" id="edit-contact-heading" value="' + escHtml(c.contact.heading) + '"></div>' +
    '<div class="form-group"><label>Adres</label><input type="text" id="edit-contact-address" value="' + escHtml(c.contact.address) + '"></div>' +
    '<div class="form-group"><label>Telefon</label><input type="text" id="edit-contact-phone" value="' + escHtml(c.contact.phone) + '"></div>' +
    '<div class="form-group"><label>Email</label><input type="text" id="edit-contact-email" value="' + escHtml(c.contact.email) + '"></div>' +
    '<div class="form-group"><label>Instagram URL</label><input type="text" id="edit-contact-instagram" value="' + escHtml(c.contact.instagram) + '"></div>' +
    '<div class="form-group"><label>Facebook URL</label><input type="text" id="edit-contact-facebook" value="' + escHtml(c.contact.facebook) + '"></div>' +
    '</div>';
}

function renderFooterTab(c) {
  return '<div id="tab-footer" class="editor-tab">' +
    '<div class="form-group"><label>Nazwa</label><input type="text" id="edit-footer-brand" value="' + escHtml(c.footer.brand) + '"></div>' +
    '<div class="form-group"><label>Podtytuł</label><input type="text" id="edit-footer-tagline" value="' + escHtml(c.footer.tagline) + '"></div>' +
    '<div class="form-group"><label>Copyright (nazwa)</label><input type="text" id="edit-footer-copyright" value="' + escHtml(c.footer.copyright) + '"></div>' +
    '</div>';
}

function renderSettingsTab(c) {
  return '<div id="tab-settings" class="editor-tab">' +
    '<div class="form-group"><label>Hasło admina</label><input type="text" id="edit-admin-password" value="' + escHtml(c.admin.password) + '"></div>' +
    '</div>';
}

function saveEditorContent() {
  var c = {
    hero: {
      title: getVal('edit-hero-title'),
      subtitle: getVal('edit-hero-subtitle'),
      btn1: getVal('edit-hero-btn1'),
      btn2: getVal('edit-hero-btn2')
    },
    about: {
      heading: getVal('edit-about-heading'),
      text: getVal('edit-about-text'),
      image: getVal('edit-about-image'),
      imageAlt: getVal('edit-about-imageAlt')
    },
    gallery: {
      heading: getVal('edit-gallery-heading'),
      images: []
    },
    gallery2: {
      heading: getVal('edit-gallery2-heading') || 'Domki w środku',
      images: []
    },
    contact: {
      heading: getVal('edit-contact-heading'),
      address: getVal('edit-contact-address'),
      phone: getVal('edit-contact-phone'),
      email: getVal('edit-contact-email'),
      instagram: getVal('edit-contact-instagram'),
      facebook: getVal('edit-contact-facebook')
    },
    footer: {
      brand: getVal('edit-footer-brand'),
      tagline: getVal('edit-footer-tagline'),
      copyright: getVal('edit-footer-copyright')
    },
    admin: {
      password: getVal('edit-admin-password')
    }
  };

  ['gallery', 'gallery2'].forEach(function (key) {
    var srcEls = document.querySelectorAll('.edit-' + key + '-src');
    var altEls = document.querySelectorAll('.edit-' + key + '-alt');
    var titleEls = document.querySelectorAll('.edit-' + key + '-title');
    var descEls = document.querySelectorAll('.edit-' + key + '-desc');
    for (var i = 0; i < srcEls.length; i++) {
      c[key].images.push({
        src: srcEls[i].value,
        alt: altEls[i] ? altEls[i].value : '',
        title: titleEls[i] ? titleEls[i].value : '',
        desc: descEls[i] ? descEls[i].value : ''
      });
    }
  });

  saveContent(c);
  renderContent();
  var status = document.getElementById('adminEditorStatus');
  showStatus('Zmiany zapisane! Strona została zaktualizowana.', 'success', status);
  setTimeout(function () { status.style.display = 'none'; }, 3000);
}

function getVal(id) {
  var el = document.getElementById(id);
  if (!el) return '';
  if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') return el.value;
  return el.textContent;
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function initVideoPlayer() {
  var video = document.querySelector('.custom-video');
  var wrapper = document.querySelector('.video-wrapper');
  if (!video || !wrapper) return;

  video.addEventListener('play', function () {
    wrapper.classList.add('played');
  });

  video.addEventListener('pause', function () {
    if (video.currentTime === 0 || video.ended) {
      wrapper.classList.remove('played');
    }
  });

  video.addEventListener('ended', function () {
    wrapper.classList.remove('played');
  });
}

function showStatus(message, type, element) {
  if (element) {
    element.textContent = message;
    element.className = 'form-status ' + type;
    element.style.display = 'block';
  }
}

document.addEventListener('click', function (e) {
  var target = e.target;

  if (target && target.classList.contains('gallery-add-btn')) {
    var key = target.getAttribute('data-gallery') || 'gallery';
    var suffix = key === 'gallery' ? '' : '2';
    var container = document.getElementById('gallery-items-editor' + suffix);
    if (!container) return;
    var count = container.children.length;
    var div = document.createElement('div');
    div.className = 'gallery-edit-item';
    div.innerHTML =
      '<div class="form-group"><label>Ścieżka zdjęcia ' + (count + 1) + '</label><input type="text" class="edit-' + key + '-src" value=""></div>' +
      '<div class="form-group"><label>Alt tekst</label><input type="text" class="edit-' + key + '-alt" value=""></div>' +
      '<div class="form-group"><label>Tytuł</label><input type="text" class="edit-' + key + '-title" value=""></div>' +
      '<div class="form-group"><label>Opis</label><input type="text" class="edit-' + key + '-desc" value=""></div>' +
      '<button class="btn btn-secondary btn-sm gallery-remove-btn">Usuń zdjęcie</button><hr>';
    container.appendChild(div);
  }

  if (target && target.classList.contains('gallery-remove-btn')) {
    if (confirm('Usunąć to zdjęcie z galerii?')) {
      var item = target.closest('.gallery-edit-item');
      if (item) item.remove();
    }
  }
});
