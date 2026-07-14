const SITE_CONTENT = {
  hero: {
    title: 'Wynajem Domków w Sadzie',
    subtitle: 'Odkryj uroki wypoczynku w naszych przytulnych domkach',
    btn1: 'Zobacz Galerię',
    btn2: 'Skontaktuj się'
  },
  about: {
    heading: 'O Naszych Domkach',
    text: `<p>Nowe Domki położone są na ogrodzonym, oświetlonym i monitorowanym terenie sadu, co zapewnia bezpieczeństwo oraz komfort wypoczynku. To idealne miejsce na relaks, odpoczynek oraz kontakt z naturą.</p>
<p>Do dyspozycji gości oferujemy:</p>
<p>Domki letniskowe (2 domki po 35 m²):</p>
<p>• Sypialnia z dwoma łóżkami</p>
<p>• Salon z rozkładaną sofą i aneksem kuchennym</p>
<p>• Łazienka</p>
<p>• Prywatny taras z meblami ogrodowymi</p>
<p>Udogodnienia na terenie posesji:</p>
<p>• Duża chata grillowa z letnią kuchnią i pralką automatyczną – idealna na wspólne biesiadowanie do późnego wieczora</p>
<p>• Strefa SPA: sauna, basen i prysznic solarny</p>
<p>• Plac zabaw dla dzieci</p>
<p>• Strefa relaksu: huśtawka do obserwacji zachodów słońca i hamak</p>
<p>• Miejsce na ognisko z ławkami</p>
<p>• Duży teren rekreacyjny do biegania i zabaw</p>
<p>Dla podróżujących kamperem</p>
<p>Na terenie sadu przygotowaliśmy bezpieczne miejsce postojowe z dostępem do prądu, wody i kanalizacji.</p>`,
    image: '/Users/7st7/cabin-rental-website/project/images/wnetrze.jpg',
    imageAlt: 'Wnętrze jednego z naszych domków'
  },
  gallery: {
    heading: 'Galerię Zdjęć',
    images: [
      {
        src: 'domki-z-gory.jpg',
        alt: 'Domki z góry',
        title: 'Widok na domki z góry',
        desc: 'Nasze domki od góry'
      },
      {
        src: 'domki-z-przodu.jpg',
        alt: 'Widok z przodó na domki',
        title: 'Widok na domki z przodó',
        desc: 'Ladny widok na domki z przodó'
      },
      {
        src: 'miejsce-na-ognisko.jpg',
        alt: 'Wieczór przy ognisku',
        title: 'Wieczór przy Ognisku',
        desc: 'Wieczorne spotkania przy ognisku pod gwiazdami'
      },
      {
        src: 'jezioro.jpg',
        alt: 'Jezioro w okolicah domków',
        title: 'Widok na jezioro w okolice domków',
        desc: ''
      },
      {
        src: 'basen.jpg',
        alt: 'Basen',
        title: 'Basen',
        desc: 'Relaks w basenie w upalne dni'
      },
      {
        src: 'jezioro-2.jpg',
        alt: 'Jezioro w okolicah domków',
        title: 'Widok na jezioro',
        desc: 'Jezioro w okolicy domków'
      },
      {
        src: 'domki-z-gory-2.jpg',
        alt: 'Domki z góry',
        title: 'Widok na domki z góry',
        desc: ''
      },
      {
        src: 'domki-z-gory-3.jpg',
        alt: 'Domki z góry',
        title: 'Widok na domki z góry',
        desc: ''
      },
      {
        src: 'ognisko.jpg',
        alt: 'Ognisko',
        title: 'Wieczór przy Ognisku',
        desc: 'Wieczorne spotkania przy ognisku pod gwiazdami'
      },
      {
        src: 'grill.jpg',
        alt: 'Grill',
        title: 'Chata grillowa',
        desc: 'Wspólne biesiadowanie'
      }
    ]
  },
  gallery2: {
    heading: 'Domki w środku',
    images: [
      {
        src: 'pokoj-1.jpg',
        alt: 'Pokój',
        title: 'Pokój',
        desc: 'Przyjemna przestrzeń do odpoczynku'
      },
      {
        src: 'pokoj-2.jpg',
        alt: 'Pokój',
        title: 'Pokój',
        desc: 'Przyjemna przestrzeń do odpoczynku'
      },
      {
        src: 'pokoj-3.jpg',
        alt: 'Pokój',
        title: 'Pokój',
        desc: 'Przyjemna przestrzeń do odpoczynku'
      },
      {
        src: 'kuchnia.jpg',
        alt: 'Kuchnia',
        title: 'Kuchnia',
        desc: 'Przyjemna przestrzeń do gotowania'
      },
      {
        src: 'lazienka-1.jpg',
        alt: 'Łazienka',
        title: 'Łazienka',
        desc: 'Przyjemna przestrzeń do relaksu'
      },
      {
        src: 'lazienka-2.jpg',
        alt: 'Łazienka',
        title: 'Łazienka',
        desc: 'Przyjemna przestrzeń do relaksu'
      }
    ]
  },
  contact: {
    heading: 'Skontaktuj się z Nami',
    address: 'Mała 1C 72-500 Wapnica',
    phone: '+48 453 120 272',
    email: 'arebek@wp.pl',
    instagram: 'https://www.instagram.com/domki_w_sadzie?fbclid=IwY2xjawStFuBleHRuA2FlbQIxMABzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe4qrFsPQS4N6BnQbpfrwHGKBuYoYPPOG-l3OF74tYbCAS5DniwZJvzqpz-FU_aem_mLErAXBiUC2bqcrOLYRYHA',
    facebook: 'https://www.facebook.com/profile.php?id=61577277519600&locale=pl_PL'
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

let savedContent = null;
try {
  const stored = localStorage.getItem('SITE_CONTENT');
  if (stored) {
    savedContent = JSON.parse(stored);
  }
} catch (e) {}

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
