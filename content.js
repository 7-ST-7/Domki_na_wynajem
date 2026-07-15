var savedContent = null;

var SITE_CONTENT = {
  hero: {
    title: 'Wynajem Domków w Sadzie',
    subtitle: 'Odkryj uroki wypoczynku w naszych przytulnych domkach',
    btn1: 'Zobacz Galerię',
    btn2: 'Skontaktuj się'
  },
  about: {
    heading: 'O Naszych Domkach',
    text: '<p>Nowe Domki położone są na ogrodzonym, oświetlonym i monitorowanym terenie sadu, co zapewnia bezpieczeństwo oraz komfort wypoczynku. To idealne miejsce na relaks, odpoczynek oraz kontakt z naturą.</p><p>Do dyspozycji gości oferujemy:</p><p>Domki letniskowe (2 domki po 35 m²):</p><p>• Sypialnia z dwoma łóżkami</p><p>• Salon z rozkładaną sofą i aneksem kuchennym</p><p>• Łazienka</p><p>• Prywatny taras z meblami ogrodowymi</p><p>Udogodnienia na terenie posesji:</p><p>• Duża chata grillowa z letnią kuchnią i pralką automatyczną</p><p>• Strefa SPA: sauna, basen i prysznic solarny</p><p>• Plac zabaw dla dzieci</p><p>• Miejsce na ognisko z ławkami</p>',
    image: 'images/wnetrze.jpg',
    imageAlt: 'Wnętrze domku'
  },
  gallery: {
    heading: 'Galerię Zdjęć',
    images: [
      { src: 'domki-z-gory.jpg', alt: 'Domki z góry', title: 'Widok na domki z góry', desc: '' },
      { src: 'domki-z-przodu.jpg', alt: 'Widok z przodu', title: 'Widok na domki z przodu', desc: '' },
      { src: 'miejsce-na-ognisko.jpg', alt: 'Ognisko', title: 'Wieczór przy Ognisku', desc: '' },
      { src: 'jezioro.jpg', alt: 'Jezioro', title: 'Widok na jezioro', desc: '' },
      { src: 'basen.jpg', alt: 'Basen', title: 'Basen', desc: 'Relaks w basenie' },
      { src: 'jezioro-2.jpg', alt: 'Jezioro', title: 'Widok na jezioro', desc: '' },
      { src: 'domki-z-gory-2.jpg', alt: 'Domki z góry', title: 'Widok na domki', desc: '' },
      { src: 'domki-z-gory-3.jpg', alt: 'Domki z góry', title: 'Widok na domki', desc: '' },
      { src: 'ognisko.jpg', alt: 'Ognisko', title: 'Wieczór przy Ognisku', desc: '' },
      { src: 'grill.jpg', alt: 'Grill', title: 'Chata grillowa', desc: '' }
    ]
  },
  gallery2: {
    heading: 'Domki w środku',
    images: [
      { src: 'pokoj-1.jpg', alt: 'Pokój', title: 'Pokój', desc: '' },
      { src: 'pokoj-2.jpg', alt: 'Pokój', title: 'Pokój', desc: '' },
      { src: 'pokoj-3.jpg', alt: 'Pokój', title: 'Pokój', desc: '' },
      { src: 'kuchnia.jpg', alt: 'Kuchnia', title: 'Kuchnia', desc: '' },
      { src: 'lazienka-1.jpg', alt: 'Łazienka', title: 'Łazienka', desc: '' },
      { src: 'lazienka-2.jpg', alt: 'Łazienka', title: 'Łazienka', desc: '' }
    ]
  },
  contact: {
    heading: 'Skontaktuj się z Nami',
    address: 'Mała 1C 72-500 Wapnica',
    phone: '+48 453 120 272',
    email: 'arebek@wp.pl',
    instagram: 'https://www.instagram.com/domki_w_sadzie/',
    facebook: 'https://www.facebook.com/profile.php?id=61577277519600'
  },
  footer: {
    brand: 'Domki w Sadzie',
    tagline: 'Wynajem krótkoterminowy',
    copyright: 'Domki nad Jezioro'
  },
  admin: {
    password: 'admin123'
  }
};

function getContent() {
  return savedContent || SITE_CONTENT;
}

function saveContent(newContent) {
  savedContent = newContent;
  localStorage.setItem('SITE_CONTENT', JSON.stringify(newContent));
}

function resetContent() {
  savedContent = null;
  localStorage.removeItem('SITE_CONTENT');
}

function loadSavedContent() {
  try {
    var stored = localStorage.getItem('SITE_CONTENT');
    if (stored) savedContent = JSON.parse(stored);
  } catch (e) {}
}
