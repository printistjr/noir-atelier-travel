/**
 * Noir Atelier Travel — Page Generator
 * Generates all destination + cruise route HTML pages
 */
const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// ============================================================
// SHARED TEMPLATE HELPERS
// ============================================================

function navHtml(active) {
  return `<script src="js/nav.js"></script>`;
}

function pageHeroHtml(label, title, imgSrc) {
  return `
<div class="page-hero" style="background-image:url('${imgSrc}');">
  <div class="page-hero-content">
    <span class="section-label" style="margin-bottom:12px;">${label}</span>
    <h1 class="page-hero-title">${title}</h1>
  </div>
</div>`;
}

function footerScript() {
  return `<script src="js/nav.js"></script>`;
}

function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} | Noir Atelier Travel</title>
  <meta name="description" content="${desc}"/>
  <link rel="stylesheet" href="css/style.css"/>
</head>`;
}

// ============================================================
// DESTINATION PAGE TEMPLATE
// ============================================================

function destPage(cfg) {
  const {
    filename, pageTitle, heroLabel, heroImg, bodyParagraphs,
    needToKnow, shopEatDrink, transport,
    timeZone, rideShare, electricity, climate, filmTv, phones,
    popularDests  // array of {name, desc, img}
  } = cfg;

  const parasHtml = bodyParagraphs.map(p => `<p>${p}</p>`).join('\n    ');

  const ntkHtml = needToKnow.map((item, i) => `
      <div class="accordion-item">
        <button class="accordion-btn${i===0?' open':''}">
          ${item.title}
          <span class="acc-icon">+</span>
        </button>
        <div class="accordion-body${i===0?' open':''}">
          ${item.content}
        </div>
      </div>`).join('');

  const sedHtml = `
    <div class="sed-grid">
      <div class="sed-item"><h4>Shop</h4><p>${shopEatDrink.shop}</p></div>
      <div class="sed-item"><h4>Eat</h4><p>${shopEatDrink.eat}</p></div>
      <div class="sed-item"><h4>Drink</h4><p>${shopEatDrink.drink}</p></div>
    </div>`;

  const transportHtml = `
    <div class="sed-grid">
      <div class="sed-item"><h4>Cross-Country Travel</h4><p>${transport.crossCountry}</p></div>
      <div class="sed-item"><h4>Within Cities</h4><p>${transport.withinCities}</p></div>
      <div class="sed-item"><h4>Regional Adventures</h4><p>${transport.regional}</p></div>
    </div>`;

  const popHtml = popularDests.map(d => `
      <div class="pop-item">
        <img src="${d.img}" alt="${d.name}" loading="lazy"/>
        <div class="pop-item-overlay">
          <div class="pop-item-name">${d.name}</div>
          <div class="pop-item-desc">${d.desc}</div>
        </div>
      </div>`).join('');

  return `${head(pageTitle, bodyParagraphs[0].substring(0, 150))}
<body data-page="destinations">

${pageHeroHtml(heroLabel, pageTitle.toUpperCase(), heroImg)}

<!-- Body Text -->
<section class="section">
  <div class="container-sm dest-body">
    <div class="rule-gold-left"></div>
    <div class="dest-paragraphs">
    ${parasHtml}
    </div>
  </div>
</section>

<!-- Need To Know -->
<section class="section border-top bg-alt" style="padding-top:72px;padding-bottom:72px;">
  <div class="container-sm">
    <div class="section-head" style="margin-bottom:40px;">
      <span class="section-label">Essential Info</span>
      <div class="rule-gold-left"></div>
      <h2>Need To Know</h2>
    </div>
    <div style="border-top:1px solid var(--border);">
      ${ntkHtml}
    </div>
  </div>
</section>

<!-- Shop, Eat & Drink -->
<section class="section border-top">
  <div class="container">
    <div class="section-head" style="margin-bottom:40px;">
      <span class="section-label">Local Life</span>
      <div class="rule-gold-left"></div>
      <h2>Shop, Eat &amp; Drink</h2>
    </div>
    ${sedHtml}
  </div>
</section>

<!-- Transport & Travel -->
<section class="section border-top bg-alt">
  <div class="container">
    <div class="section-head" style="margin-bottom:40px;">
      <span class="section-label">Getting Around</span>
      <div class="rule-gold-left"></div>
      <h2>Transport &amp; Travel</h2>
    </div>
    ${transportHtml}
  </div>
</section>

<!-- Info Grid -->
<section class="section border-top">
  <div class="container-sm">
    <div class="section-head" style="margin-bottom:40px;">
      <span class="section-label">At a Glance</span>
      <div class="rule-gold-left"></div>
      <h2>Practical Information</h2>
    </div>
    <div class="info-grid" style="border-top:1px solid var(--border);border-left:1px solid var(--border);">
      <div class="info-cell"><h4>Time Zone</h4><p>${timeZone}</p></div>
      <div class="info-cell"><h4>Ride Share &amp; Taxis</h4><p>${rideShare}</p></div>
      <div class="info-cell"><h4>Electricity &amp; Plugs</h4><p>${electricity}</p></div>
      <div class="info-cell"><h4>Climate</h4><p>${climate}</p></div>
      <div class="info-cell" style="grid-column:1/3;border-right:none;"><h4>Film / TV &amp; Famous People</h4><p>${filmTv}</p></div>
      <div class="info-cell" style="grid-column:1/3;border-right:none;border-bottom:none;"><h4>Important Phone Numbers</h4><p class="phones">${phones}</p></div>
    </div>
  </div>
</section>

<!-- Popular Destinations -->
<section class="section border-top" style="padding-top:0;">
  <div class="container" style="padding-top:72px;">
    <div class="section-head center" style="margin-bottom:40px;">
      <span class="section-label">Highlights</span>
      <div class="rule-gold"></div>
      <h2>Popular Destinations</h2>
    </div>
  </div>
  <div class="pop-grid">
    ${popHtml}
  </div>
</section>

${footerScript()}
</body>
</html>`;
}

// ============================================================
// CRUISE ROUTE PAGE TEMPLATE
// ============================================================

function cruisePage(cfg) {
  const { filename, pageTitle, heroLabel, heroImg, regionLabel, itineraries } = cfg;
  // itineraries: array of {title, desc, img}

  const itinHtml = itineraries.map((it, i) => `
    <div class="itinerary-card" style="${i>0?'margin-top:2px;':''}">
      <div class="itinerary-card-img">
        <img src="${it.img}" alt="${it.title}" loading="${i===0?'eager':'lazy'}"/>
      </div>
      <div class="itinerary-card-body">
        <span class="section-label">${regionLabel}</span>
        <h2 class="itinerary-card-title">${it.title}</h2>
        <p class="itinerary-card-desc">${it.desc}</p>
        <a href="#" class="btn">Learn More</a>
      </div>
    </div>`).join('\n');

  return `${head(pageTitle, itineraries[0].desc.substring(0, 150))}
<body data-page="cruises">

${pageHeroHtml(heroLabel, pageTitle, heroImg)}

<section class="section">
  <div class="container">
    <div class="section-head" style="margin-bottom:56px;">
      <span class="section-label">${regionLabel}</span>
      <div class="rule-gold-left"></div>
      <h2>Available Itineraries</h2>
    </div>
    <div class="itinerary-list">
      ${itinHtml}
    </div>
  </div>
</section>

${footerScript()}
</body>
</html>`;
}

// ============================================================
// DATA
// ============================================================

const DEST_PAGES = [

  // CAMBODIA
  {
    filename: 'cambodia.html',
    pageTitle: 'Cambodia',
    heroLabel: 'Destination',
    heroImg: 'images/Cambodia/cambodiaheader_edited.jpg',
    bodyParagraphs: [
      'Cambodia draws travelers who understand that the most meaningful journeys ask for the heart as much as the mind. It is a destination for those who seek depth rather than distraction, for people who are moved by culture, humanity, and history in all their complexity. Here, every corner invites reflection, and every encounter feels personal.',
      'Authenticity in Cambodia is not curated; it is lived. Imagine ancient temples where monks still chant softly at sunrise, their voices echoing through sacred stone corridors. Picture silk weavers whose artistry carries stories of endurance and hope. In the villages and cities alike, resilience breathes through daily life, shaping experiences that move beyond beauty to something profoundly human. Cambodia is not simply visited; it is felt, remembered, and carried with you long after you leave.',
      'This is where you discover that the most unforgettable adventures unfold in the quiet, unplanned spaces between moments. It might be the taste of num banh chok perfected by generations, served from a humble street cart, or the serene temple blessing that turns into a meditation on gratitude and time. Cambodia reminds travelers that the truest experiences are never rushed; they reveal themselves when you slow down enough to see them.',
      'Here, wonder lives in the rhythm of everyday life. One day you might find yourself tracing centuries-old carvings of Angkor\'s temples, and the next, cycling through rice paddies alongside farmers whose stories are written in perseverance. You will learn that hospitality here is not performance but instinct, offered with sincerity that stays with you. Cambodia does not simply invite you to visit; it challenges you to open your heart.',
      'Here, paradise reveals its depth slowly. You may stand before a temple wrapped in roots, or share laughter with locals who have turned endurance into joy. The landscapes hold secrets older than memory, and the people transform every hardship into a quiet kind of hope. From the sunrise over Angkor\'s faces to the floating villages that rest lightly on the water, each scene tells a story of persistence and grace. Cambodia does not simply impress; it moves you, feeds your spirit, and leaves its rhythm echoing long after you depart.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel across Cambodia with ease by bus, shared taxi, or domestic flight. Scenic boat rides along the Tonle Sap and Mekong River offer a slower, more picturesque way to move between regions.' },
      { title: 'Exploring Locally', content: 'Navigate cities and towns by tuk-tuk, motorbike taxi, or rental bicycle. Many central areas are walkable, though temples and rural attractions often require organized transportation or guided tours.' },
      { title: 'Beyond the Beaten Path', content: 'Explore rural villages, floating communities, and forest trails for a glimpse of Cambodia\'s serene, untouched beauty. Local guides reveal hidden temples and artisan life.' }
    ],
    shopEatDrink: {
      shop: 'Explore markets filled with handwoven silk, silverwork, and carvings that honor tradition. Take home Kampot pepper or handmade pottery while supporting local artisans and fair trade cooperatives.',
      eat: 'Taste Cambodia\'s bold flavors with crab curry, lemongrass soups, and sticky rice wrapped in banana leaves. Each bite reflects heritage, heart, and home.',
      drink: 'Sip iced milk coffee, palm wine, or fresh tropical juice. Every drink captures the warmth and rhythm of Cambodian life.'
    },
    transport: {
      crossCountry: 'Move easily between Cambodia\'s major cities by bus, shared taxi, or domestic flight. For a more scenic journey, travel by boat along the Tonle Sap or Mekong River and watch daily life unfold along the shores.',
      withinCities: 'Tuk-tuks, motorbike taxis, and bicycles make short trips convenient. City centers are often walkable, while temples and rural sites may require guided transport.',
      regional: 'Venture beyond urban areas to explore coastal towns, mountain trails, and traditional villages. Local guides and private drivers make discovering Cambodia\'s natural beauty effortless and enriching.'
    },
    timeZone: 'Indochina Time (ICT), which is GMT+7. No daylight saving time observed.',
    rideShare: 'Grab is the primary rideshare app (cars, motos); local tuk-tuk apps also exist; metered taxis are rare outside Phnom Penh.',
    electricity: 'Cambodia uses 230V electricity with a frequency of 50Hz. Outlets typically support plug types A, C, and G, so travelers may need a universal adapter.',
    climate: 'Tropical monsoon climate with dry season (November–April) and wet season (May–October). Cool season (November–February) is most pleasant.',
    filmTv: 'Cambodia\'s ancient temples were famously featured in Lara Croft: Tomb Raider, sparking a surge in tourism to Angkor Wat. The country has produced celebrated filmmaker Rithy Panh, known for his work spotlighting Cambodian history and resilience.',
    phones: 'Emergency Services: 117<br/>Police: 117<br/>Medical Emergency: 119<br/>Tourist Police: 012-942-484<br/>Country Code: +855',
    popularDests: [
      { name: 'Angkor Wat', desc: 'The world\'s largest religious monument, standing as a breathtaking symbol of Cambodia\'s Khmer heritage.', img: 'images/Cambodia/angkorwat.jpg' },
      { name: 'Phnom Penh Royal Palace', desc: 'The Royal Palace glimmers with golden spires and elegant Khmer architecture.', img: 'images/Cambodia/Cambodia-Royal-Palace-Phnom-Penh.jpg' },
      { name: 'Battambang Rice Fields', desc: 'The rice fields of Battambang stretch across rolling countryside, reflecting Cambodia\'s deep agricultural roots.', img: 'images/Cambodia/fields.jpg' },
      { name: 'Koh Rong Island', desc: 'Koh Rong is a tropical escape known for its white-sand beaches, turquoise waters, and laid-back island charm.', img: 'images/Cambodia/kohrong.jpg' },
      { name: 'Mondulkiri Elephant Sanctuary', desc: 'Nestled in lush highlands, this sanctuary offers a peaceful refuge for rescued elephants.', img: 'images/Cambodia/mondulkiri.jpg' },
      { name: 'Ta Prohm', desc: 'Famous for its massive tree roots entwined with ancient stone walls, offering a hauntingly beautiful glimpse of nature reclaiming history.', img: 'images/Cambodia/ta-prohm.jpg' },
      { name: 'Phnom Penh National Museum', desc: 'This elegant museum houses one of the world\'s finest collections of Khmer art and sculpture.', img: 'images/Cambodia/phnom-penh-national-museum.jpg' },
      { name: 'Tonlé Sap Lake', desc: 'Southeast Asia\'s largest freshwater lake, home to floating villages that adapt with the changing seasons.', img: 'images/Cambodia/tonle.jpg' },
      { name: 'Banteay Srei Temple', desc: 'Often called the "Citadel of Women," famed for its delicate pink sandstone carvings and fine craftsmanship.', img: 'images/Cambodia/banteay-srei-temple-the-beautiful-ancient-castle-siem-reap-cambodia-free-photo.jpg' }
    ]
  },

  // COLOMBIA
  {
    filename: 'colombia.html',
    pageTitle: 'Colombia',
    heroLabel: 'Destination',
    heroImg: 'images/Colombia/cartagena.jpg',
    bodyParagraphs: [
      'Colombia calls to travelers who believe the richest journeys awaken both emotion and curiosity. It is a land for those who seek connection over comfort, drawn to the harmony of tradition, creativity, and resilience that defines its soul. Every region hums with rhythm, from mountain towns wrapped in mist to coastlines alive with music and laughter. Authenticity in Colombia is effortless; it flows through the people who share their stories with open hearts.',
      'Imagine the aroma of roasted coffee drifting through Andean valleys, or the beat of drums echoing down cobblestone streets. Picture gold shimmering in ancient artifacts and color spilling from every mural. Across its landscapes, joy and struggle coexist beautifully, reminding travelers that true beauty lies in humanity itself. Colombia is not only seen, it is lived, felt, and remembered long after the journey ends.',
      'The most unforgettable moments in Colombia often appear quietly, between adventure and stillness. A laugh shared over coffee in the hills of Salento, the rhythm of cumbia echoing through Cartagena\'s streets, or golden light spilling across the rooftops of Villa de Leyva. Meaning isn\'t found in what you plan, but in the moments that ask you to simply feel.',
      'Each day uncovers another layer of Colombia\'s warmth and wonder. You might drift through the colors of Guatapé, hike beneath the towering palms of Cocora Valley, or watch the sun sink beyond Tayrona\'s wild shores. Everywhere, you are met with sincerity and pride from those who call this place home.',
      'Here, the soul of the land unfolds with time. You might stand before the towering palms of Cocora Valley, or share stories with artisans in Cartagena\'s sunlit plazas. Colombia does not simply enchant; it transforms you, filling your heart and staying with you long after you leave.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel across Colombia with ease by domestic flight, intercity bus, or private car. Scenic routes wind through mountains, jungles, and coastlines, offering views as unforgettable as the destinations themselves.' },
      { title: 'Exploring Locally', content: 'In cities and towns, taxis, ride apps, and local buses make getting around simple. Walking is ideal in historic centers like Cartagena and Villa de Leyva, while guided tours or rentals help reach rural coffee farms and nature reserves.' },
      { title: 'Beyond the Beaten Path', content: 'Venture into the Cocora Valley, the Tatacoa Desert, or the highlands of Boyacá for Colombia\'s quieter, more intimate side. Local guides open doors to hidden waterfalls, remote villages, and traditions that remain beautifully untouched.' }
    ],
    shopEatDrink: {
      shop: 'Wander through markets alive with color and craft, where woven mochilas, emerald-green ceramics, and hand-tooled leather tell stories of Colombia\'s regions. Take home locally roasted coffee, cacao, or artisan jewelry.',
      eat: 'Savor Colombia\'s vibrant flavors, from arepas grilled to perfection to fresh ceviche on the Caribbean coast and hearty bandeja paisa in the mountains.',
      drink: 'Enjoy a cup of rich Colombian coffee, a glass of fresh lulo juice, or the smooth sweetness of aguardiente shared among friends.'
    },
    transport: {
      crossCountry: 'Travel smoothly between Colombia\'s major regions by domestic flight, long-distance bus, or private car. Scenic routes pass through lush valleys, coffee-covered hills, and coastal plains.',
      withinCities: 'Taxis, ride apps, and local buses make city travel easy and affordable. Many historic centers, like Cartagena and Bogotá\'s La Candelaria, are best explored on foot.',
      regional: 'Leave the cities behind to uncover Colombia\'s wild heart. From the beaches of Tayrona to the towering palms of Cocora Valley and the quiet charm of mountain villages.'
    },
    timeZone: 'Colombia Standard Time (COT), which is GMT-5. Daylight saving time is not observed.',
    rideShare: 'Uber, DiDi, and inDriver are the main rideshare apps in major cities. Taxis are widely available, though using reputable services or apps is recommended for safety and clear pricing.',
    electricity: 'Colombia uses 110V electricity with a frequency of 60Hz. Outlets typically support plug types A and B, so most North American devices work without an adapter.',
    climate: 'Tropical climate with distinct wet and dry seasons that vary by region. The dry season (December–March, July–August) is generally the most pleasant for travel.',
    filmTv: 'Colombia\'s stunning scenery has appeared in films and series such as Encanto and Narcos, showcasing its diverse culture and landscapes. The country is also home to global icons like Shakira, Gabriel García Márquez, and Fernando Botero.',
    phones: 'Emergency Services: 123<br/>Police: 123<br/>Medical Emergency: 125<br/>Tourist Assistance Line: 01-8000-931-006<br/>Country Code: +57',
    popularDests: [
      { name: 'Cocora Valley', desc: 'Home to Colombia\'s national tree, the towering wax palm, Cocora Valley offers an ethereal landscape of misty mountains and rolling green hills.', img: 'images/Colombia/CocoraValley.jpg' },
      { name: 'Islas del Rosario', desc: 'A short boat ride from Cartagena, this archipelago dazzles with turquoise waters, coral reefs, and white-sand beaches.', img: 'images/Colombia/islasdelrosario.avif' },
      { name: 'Salt Cathedral of Zipaquirá', desc: 'Carved deep within a salt mine, this underground cathedral is both an architectural marvel and a place of spiritual reflection.', img: 'images/Colombia/SaltCathedralofZipaquira.jpg' },
      { name: 'San Agustín Archaeological Park', desc: 'This UNESCO World Heritage Site is home to hundreds of ancient stone statues and tombs from a mysterious pre-Columbian culture.', img: 'images/Colombia/sanagustin.jpg' },
      { name: 'Guatapé Rock', desc: 'This 10-million-ton granite monolith rises abruptly from the landscape, offering panoramic views after a climb up its 740 steps.', img: 'images/Colombia/elpenol-guatape-hor.jpg' },
      { name: 'National Museum of Colombia', desc: 'Housed in a former prison, this museum offers a sweeping look at Colombia\'s art, history, and archaeology.', img: 'images/Colombia/museocolombia.jpeg' },
      { name: 'Gold Museum (Museo del Oro)', desc: 'Located in Bogotá, this museum holds the world\'s largest collection of pre-Hispanic gold artifacts.', img: 'images/Colombia/museodeloro.jpg' },
      { name: 'Colón Theater (Teatro Colón)', desc: 'One of Latin America\'s most beautiful opera houses, Teatro Colón dazzles with its neoclassical design and golden interior.', img: 'images/Colombia/teatrocolon.jpg' },
      { name: 'Caño Cristales', desc: 'Often called "The River of Five Colors," Caño Cristales is a natural masterpiece that glows with reds, pinks, yellows, and greens during the rainy season.', img: 'images/Colombia/canocristales.jpg' }
    ]
  },

  // EGYPT
  {
    filename: 'egypt.html',
    pageTitle: 'Egypt',
    heroLabel: 'Destination',
    heroImg: 'images/Egypt/pyramids-egypt-banner-header-7e82b2d6e45ca68a174ff1219a70307c.jpg',
    bodyParagraphs: [
      'Egypt stirs something timeless in those who visit, a feeling that blends awe with quiet reflection. It is a place where history lives in the present, where the pulse of the Nile still guides life just as it did thousands of years ago. From golden deserts to temples rising from the sand, every corner reveals a story of endurance, artistry, and faith.',
      'Imagine the hush of dawn at Abu Simbel as sunlight spills across ancient stone, or the calm of a felucca gliding past palm-lined shores. Picture the scent of spices drifting through Cairo\'s markets, and the sound of prayer echoing across a city built on history. Egypt\'s beauty lives in both its grandeur and its humanity, a balance of wonder and warmth that stays with you.',
      'There is a quiet magic to Egypt that unfolds in the spaces between wonder and reflection. The first light over the Nile, the hush inside an ancient temple, or the golden shimmer of desert sand all remind you that time moves differently here.',
      'Every experience uncovers a new facet of Egypt\'s soul. You might trace carvings that have endured for millennia, glide across calm waters where civilization began, or stand beneath pyramids glowing in the fading light. The people welcome you with warmth that feels timeless, their stories woven into the rhythm of the land.',
      'The essence of Egypt unfolds slowly, like sunlight spreading across the temples of Luxor. You might trace the artistry of hieroglyphs carved in devotion, or share laughter with locals along a market street rich with spice and color. Egypt does not simply captivate; it changes you, leaving its rhythm quietly written on your soul.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel throughout Egypt with ease by domestic flight, train, or private car. Scenic journeys along the Nile and through the desert reveal a landscape where ancient history and natural beauty meet at every turn.' },
      { title: 'Exploring Locally', content: 'Within cities, taxis, ride apps, and car hires make transportation convenient. Strolling through markets, historic quarters, or along the Corniche offers a closer look at daily life, while guided tours help reach temples and archaeological sites with ease.' },
      { title: 'Beyond the Beaten Path', content: 'Journey beyond the main routes to uncover Egypt\'s quieter wonders — from the oases of Siwa and Fayoum to the White Desert\'s surreal formations. Local guides bring these remote landscapes and communities to life.' }
    ],
    shopEatDrink: {
      shop: 'Explore bustling bazaars and artisan stalls where alabaster carvings, copper lamps, and handwoven textiles reflect Egypt\'s artistic legacy. Bring home perfumes, spices, or papyrus art.',
      eat: 'Delight in the rich flavors of Egyptian cuisine, from koshari layered with lentils and rice to grilled fish fresh from the Nile and sweet pastries drizzled with honey.',
      drink: 'Sip strong Egyptian coffee in a shaded café, taste fresh sugarcane juice pressed before your eyes, or unwind with a glass of hibiscus tea.'
    },
    transport: {
      crossCountry: 'Travel seamlessly between Egypt\'s major regions by domestic flight, train, or private car. Routes along the Nile and across the desert reveal ever-changing landscapes.',
      withinCities: 'Taxis, ride apps, and car hires make navigating Egypt\'s cities straightforward and affordable. Many historic areas, like Old Cairo and Luxor\'s temple district, are best explored on foot.',
      regional: 'Step beyond the cities to discover Egypt\'s quieter wonders. From the vast silence of the White Desert to the palm-filled oases of Siwa and the tranquil beauty of Lake Nasser.'
    },
    timeZone: 'Egypt Standard Time (EET), which is GMT+2. Daylight saving time is not observed.',
    rideShare: 'Uber and Careem operate in major cities, offering reliable and convenient transportation. Taxis are common, but it\'s best to agree on a fare before the ride.',
    electricity: 'Egypt uses 220V electricity with a frequency of 50Hz. Outlets typically support plug types C and F, so travelers from other regions may need a universal adapter.',
    climate: 'Egypt has a desert climate with hot, dry summers and mild winters. The most pleasant time to visit is from October to April, when temperatures are cooler.',
    filmTv: 'Egypt\'s monumental landscapes have appeared in countless films, from Death on the Nile to The Mummy. The country has given the world legendary figures like actor Omar Sharif, singer Umm Kulthum, and filmmaker Youssef Chahine.',
    phones: 'Emergency Services: 122<br/>Police: 122<br/>Medical Emergency: 123<br/>Tourist Police: 126<br/>Country Code: +20',
    popularDests: [
      { name: 'Great Pyramids of Giza', desc: 'The last remaining Wonder of the Ancient World, the Great Pyramids rise from the desert as symbols of Egypt\'s timeless ingenuity.', img: 'images/Egypt/photo-1572252009286-268acec5ca0a.jpg' },
      { name: 'Abu Simbel Temples', desc: 'Carved directly into rock by Ramses II, these colossal temples stand as masterpieces of ancient Egyptian architecture.', img: 'images/Egypt/abusimbel.jpg' },
      { name: 'Luxor Temple', desc: 'Connected to Karnak by an ancient avenue of sphinxes, Luxor Temple celebrates divine kingship and renewal.', img: 'images/Egypt/Luxor-Temple-at-night-in-Egypt.jpg' },
      { name: 'White Desert National Park', desc: 'A surreal expanse of chalk formations shaped by wind and time, the White Desert feels like another planet.', img: 'images/Egypt/white-desert-national-park.jpg' },
      { name: 'Egyptian Museum', desc: 'Located in Cairo, this museum houses the world\'s greatest collection of ancient Egyptian artifacts, including the treasures of Tutankhamun.', img: 'images/Egypt/grandegyptianmuseum.jpg' },
      { name: 'The Sphinx', desc: 'Guarding the Giza Plateau, the Great Sphinx is an enigmatic limestone statue with the body of a lion and the face of a king.', img: 'images/Egypt/heiro.jpg' },
      { name: 'Siwa Oasis', desc: 'Surrounded by sand dunes, Siwa is a lush haven filled with palm groves, natural springs, and ancient ruins.', img: 'images/Egypt/siwaoasis.jpg' },
      { name: 'Temple of Hatshepsut', desc: 'Built into the cliffs of Deir el-Bahari, this temple honors Egypt\'s first great female pharaoh with terraces and colonnades of remarkable symmetry.', img: 'images/Egypt/hatshepsut.jpg' },
      { name: 'Valley of the Kings', desc: 'This vast necropolis holds the tombs of pharaohs and nobles, including the famed resting place of Tutankhamun.', img: 'images/Egypt/valleyofthekingstomb.jpg' }
    ]
  },

  // FRANCE
  {
    filename: 'france.html',
    pageTitle: 'France',
    heroLabel: 'Destination',
    heroImg: 'images/France/65915-european-cities-eiffel-tower-and-river-seine-paris-france-4k-ultra.jpg',
    bodyParagraphs: [
      'France awakens the senses in ways that feel both timeless and immediate. It is a place where art, cuisine, and history weave together seamlessly, where the romance of old streets meets the rhythm of modern life. From lavender fields to snow-capped Alps, from quiet villages to glittering boulevards, every landscape tells its own story of beauty and pride.',
      'Picture the soft light over the Seine at dusk, or the hum of a Parisian bakery before sunrise. Imagine the scent of fresh bread mingling with perfume in the air, and the sound of laughter spilling from a corner bistro. The country\'s magic lies in its balance of elegance and simplicity, where joy is found in both grand art and small moments.',
      'There is a gentle poetry to France that reveals itself in quiet, unhurried moments. Morning light spilling across cobblestone streets, the scent of fresh pastries drifting from a café, or the sound of church bells echoing through the countryside remind you that life here moves with grace and intention.',
      'Every experience offers a glimpse into the heart of France. You may stroll through vineyards where history ripens with the grapes, pause before art that stirs the soul, or share laughter over bread still warm from the oven. Its charm lingers in gestures, flavors, and conversations that feel effortlessly sincere.',
      'As the days unfold, layers of history and artistry begin to surface. You might lose yourself in the stillness of a countryside vineyard, stand before a painting that feels alive, or share laughter over a meal prepared with care. What remains when you leave is more than memory; it is a quiet shift in how you see the world.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel across France with ease using high-speed trains, regional routes, or short domestic flights. Scenic drives through vineyards, mountains, and coastal roads reveal the country\'s beauty in every direction.' },
      { title: 'Exploring Locally', content: 'In towns and cities, public transportation, taxis, and rental bikes make getting around simple. Walking through historic quarters, open-air markets, or riverside promenades offers the best glimpse of everyday French life.' },
      { title: 'Beyond the Beaten Path', content: 'Venture away from the cities to discover France\'s quieter charms. Explore the lavender fields of Provence, the rugged coastline of Brittany, or the mountain trails of the Alps.' }
    ],
    shopEatDrink: {
      shop: 'Browse open-air markets and boutique shops filled with handmade treasures, from Provençal ceramics to artisan chocolates and lavender soaps. Take home local wines, cheeses, or perfumes crafted in Grasse.',
      eat: 'Savor the rich variety of French cuisine, from buttery croissants and fresh seafood to slow-cooked stews and fine cheeses. Every meal celebrates regional heritage.',
      drink: 'Enjoy a morning espresso at a corner café, a glass of Bordeaux shared among friends, or sparkling cider from Normandy\'s orchards.'
    },
    transport: {
      crossCountry: 'Travel across France easily by high-speed train, regional rail, or short domestic flights. Scenic routes wind through rolling vineyards, alpine peaks, and sunlit coastlines.',
      withinCities: 'Public transportation, taxis, and bike rentals make exploring simple and efficient. Strolling through historic districts, riverbanks, and open squares offers the best view of daily life.',
      regional: 'Leave the cities behind to experience France\'s quieter side. Wander through the lavender fields of Provence, the cliffs of Normandy, or the lakes and forests of the Alps.'
    },
    timeZone: 'Central European Time (CET), which is GMT+1, and observes daylight saving time from late March to late October.',
    rideShare: 'Uber, Bolt, and Free Now are available in most major cities and offer a reliable way to get around. Taxis are easy to find, though using licensed services or booking through official apps ensures clear pricing.',
    electricity: 'France uses 230V electricity with a frequency of 50Hz. Outlets generally fit plug types C and E, so travelers from other regions may need a universal adapter.',
    climate: 'France enjoys a varied climate, with mild winters and warm summers that differ by region. The Mediterranean south is sunny and dry, while the north and west experience cooler temperatures.',
    filmTv: 'France has long been a centerpiece of global cinema, featured in classics like Amélie, Midnight in Paris, and The Da Vinci Code. The nation has produced legendary figures such as Brigitte Bardot, Marion Cotillard, and director Jean-Luc Godard.',
    phones: 'Emergency Services: 112<br/>Police: 17<br/>Medical Emergency: 15<br/>Fire Brigade: 18<br/>Country Code: +33',
    popularDests: [
      { name: 'Mont Saint-Michel', desc: 'Rising dramatically from tidal waters, Mont Saint-Michel is a medieval abbey whose winding paths and panoramic views create one of France\'s most unforgettable experiences.', img: 'images/France/abbey-mont-saint-michel-normandy-france-ancient-5058x2845-7638.jpg' },
      { name: 'Gorges du Verdon', desc: 'Often called Europe\'s Grand Canyon, this turquoise river gorge offers breathtaking cliffs, kayaking routes, and scenic viewpoints.', img: 'images/France/gorgesduverdon.jpg' },
      { name: 'The French Riviera', desc: 'This stunning stretch of coastline combines azure waters, palm-lined promenades, and timeless glamour.', img: 'images/France/french-riviera-france-shutterstock.jpg' },
      { name: 'Eiffel Tower', desc: 'An enduring symbol of France, the Eiffel Tower rises gracefully above the skyline as a masterpiece of 19th-century engineering.', img: 'images/France/7133002.jpg' },
      { name: 'The Louvre Museum', desc: 'The world\'s largest art museum holds masterpieces from every era, including the Mona Lisa and the Venus de Milo.', img: 'images/France/louvre.jpg' },
      { name: 'Lascaux Caves', desc: 'These prehistoric caves, adorned with vivid paintings of animals, offer a glimpse into humanity\'s earliest artistic expression.', img: 'images/France/lascaux.jpg' },
      { name: 'Palace of Versailles', desc: 'Once the seat of French royalty, the Palace of Versailles dazzles with its Hall of Mirrors, lavish gardens, and golden grandeur.', img: 'images/France/versailles-hallmirrors.jpg' },
      { name: 'Mont Blanc and the French Alps', desc: 'The Alps offer towering peaks, crystal-clear lakes, and trails that invite exploration year-round.', img: 'images/France/mont blanc alps.jpg' },
      { name: 'Arc de Triomphe', desc: 'Standing proudly at the heart of the Place Charles de Gaulle, the Arc de Triomphe honors those who fought for France.', img: 'images/France/arcde.jpg' }
    ]
  },

  // GERMANY
  {
    filename: 'germany.html',
    pageTitle: 'Germany',
    heroLabel: 'Destination',
    heroImg: 'images/Germany/wp4345559.jpg',
    bodyParagraphs: [
      'Germany reveals its character through contrasts both subtle and striking. Ancient castles rise above rivers that have carried trade and tales for centuries, while modern architecture gleams with precision and purpose. It is a land where craftsmanship and creativity share equal importance, where each region carries its own rhythm shaped by tradition and innovation alike.',
      'Think of sunlight catching the stained glass of a Gothic cathedral, or the sound of footsteps echoing through a cobblestone square at dawn. Smell the roasted chestnuts in a winter market, hear music spilling from a concert hall, and feel the calm of forests that seem to stretch without end.',
      'Strength and grace exist side by side in this land of forests, rivers, and timeless craft. Mornings begin with the scent of fresh bread from a village bakery, while evenings settle into the steady rhythm of music, conversation, and light spilling through old windows.',
      'Each experience deepens your understanding of what makes this place unique. You may find yourself tracing the stone walls of a medieval castle, listening to symphonies that echo through grand halls, or walking paths that wind between vineyards and valleys.',
      'With time, the country reveals itself in ways that words cannot fully capture. You might walk through forests where the only sound is the rustle of leaves, or stand before cathedrals whose arches hold centuries of memory. What you take with you is not just remembrance, but a calm respect for a place that values depth over display.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel throughout Germany is efficient and seamless by high-speed train, regional rail, or well-maintained highways. Scenic routes pass through forests, vineyards, and mountain ranges.' },
      { title: 'Exploring Locally', content: 'Public transportation networks are reliable and easy to navigate, with trams, buses, and rental bikes available in most towns. Strolling through historic districts, riverfront paths, and local markets offers a closer look at daily life.' },
      { title: 'Beyond the Beaten Path', content: 'Step beyond the main routes to find Germany\'s quieter treasures. Wander through the rolling hills of the Moselle Valley, explore medieval castles hidden in the countryside, or hike among the peaks of the Bavarian Alps.' }
    ],
    shopEatDrink: {
      shop: 'Explore open-air markets and traditional workshops filled with handcrafted goods, from intricate wood carvings and porcelain to leather goods and regional textiles.',
      eat: 'Experience the heart of German cuisine through comforting dishes like roasted meats, fresh-baked pretzels, and seasonal vegetables served with rich gravies.',
      drink: 'Start your day with strong coffee and a fresh pastry, then raise a glass of Riesling or locally brewed beer as evening falls.'
    },
    transport: {
      crossCountry: 'Travel throughout Germany with ease by high-speed train, regional connections, or short domestic flights. Scenic routes pass through mountain ranges, river valleys, and forested countryside.',
      withinCities: 'Efficient public transportation systems, taxis, and rental bikes make urban travel simple and accessible. Walking through old quarters, market squares, and riverside promenades offers the most authentic glimpse of daily life.',
      regional: 'Step beyond the cities to explore Germany\'s quieter landscapes. Journey through the vineyard-lined Moselle Valley, hike along the trails of the Black Forest, or visit fairy-tale castles tucked into rolling hills.'
    },
    timeZone: 'Central European Time (CET), which is GMT+1, and observes daylight saving time from late March to late October.',
    rideShare: 'Uber, Bolt, and Free Now operate in many major cities, offering reliable and convenient transportation options. Taxis are widely available and advisable to book through official apps.',
    electricity: 'Germany uses 230V electricity with a frequency of 50Hz. Outlets typically support plug types C and F, so visitors from other regions may need a universal adapter.',
    climate: 'Germany experiences four distinct seasons, with warm summers, crisp autumns, cold winters, and mild springs. The southern regions see more sunshine while the north enjoys cooler breezes.',
    filmTv: 'Germany\'s landscapes and cities have served as the backdrop for films such as Inglourious Basterds, The Reader, and Run Lola Run. The country has produced influential figures like filmmaker Wim Wenders, composer Hans Zimmer, and actress Diane Kruger.',
    phones: 'Emergency Services: 112<br/>Police: 110<br/>Medical Emergency: 112<br/>Fire Brigade: 112<br/>Country Code: +49',
    popularDests: [
      { name: 'Neuschwanstein Castle', desc: 'Perched on a rugged hill surrounded by forests, Neuschwanstein Castle looks like a storybook brought to life.', img: 'images/Germany/neuschwanstein.jpeg' },
      { name: 'The Rhine Valley', desc: 'Flowing past vineyards, medieval castles, and storybook villages, the Rhine Valley captures the essence of romantic Germany.', img: 'images/Germany/RiverFacts_Rhine_hero.jpg' },
      { name: 'The Romantic Road', desc: 'Winding through picturesque countryside and historic towns, the Romantic Road is Germany\'s most celebrated scenic route.', img: 'images/Germany/romantciroad.jpg' },
      { name: 'Brandenburg Gate', desc: 'A neoclassical triumphal arch that once marked the division between East and West, now standing as a symbol of unity.', img: 'images/Germany/brandenburg gate.jpg' },
      { name: 'Reichstag Building', desc: 'Home to Germany\'s parliament, the Reichstag combines neoclassical design with a striking modern glass dome.', img: 'images/Germany/reichstag.jpg' },
      { name: 'Sanssouci Palace', desc: 'Once the summer retreat of Frederick the Great, surrounded by elegant terraced gardens and Rococo interiors.', img: 'images/Germany/sanssoucipalace.jpg' },
      { name: 'Cologne Cathedral', desc: 'This towering Gothic masterpiece took more than 600 years to complete and remains one of Europe\'s most awe-inspiring cathedrals.', img: 'images/Germany/971384-cologne-largest-city-germany-s-populous-state_edited.jpg' },
      { name: 'Museum Island', desc: 'This UNESCO-listed cultural complex houses some of the world\'s finest collections of art and archaeology.', img: 'images/Germany/museumisland.jpg' },
      { name: 'Heidelberg Castle', desc: 'This Renaissance ruin stands gracefully above the Neckar River, blending grandeur with romantic decay.', img: 'images/Germany/heidelberg.jpg' }
    ]
  },

  // NETHERLANDS
  {
    filename: 'netherlands.html',
    pageTitle: 'Netherlands',
    heroLabel: 'Destination',
    heroImg: 'images/Netherlands/777913-John-Frost-Netherlands-Bridges-Waterfront-Night.jpg',
    bodyParagraphs: [
      'The Netherlands unfolds as a country shaped by balance, beauty, and ingenuity. Canals weave between tulip fields and windmills, while sleek design and sustainable living reflect a future built on creativity and care. It is a place where art and everyday life blend naturally, and where tradition remains alive through innovation, craftsmanship, and community.',
      'Picture sunlight glimmering on still canals, the rhythmic turn of windmill blades, and the laughter echoing from a café along the water\'s edge. The scent of fresh stroopwafels drifts through cobbled streets, and bicycles glide past flower stalls bursting with color. Here, life moves with intention, guided by harmony and simplicity.',
      'Water glistens beneath soft morning light, reflecting skies that seem to stretch forever. Windmills turn slowly in the distance, and the faint aroma of coffee mingles with the sweetness of fresh pastries from a nearby stall. Life flows at an easy pace here, built on connection, craft, and the quiet rhythm of everyday grace.',
      'With every moment, the country reveals a deeper layer of its character. You might glide along a canal lined with tulips, wander through markets alive with color, or pause to watch artists at work beside the water. Hospitality comes naturally, carried in simple gestures and genuine smiles.',
      'As the days pass, layers of creativity and culture unfold in subtle ways. You might watch painters capture light beside the harbor, hear church bells echo over rooftops, or share stories with locals in a candlelit café. What remains after you leave is not only memory, but a quiet appreciation for the grace woven into everyday living.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel around the Netherlands is simple and efficient with an extensive network of trains, buses, and ferries. Scenic routes reveal wide fields of tulips, peaceful canals, and windmills standing tall against open skies.' },
      { title: 'Exploring Locally', content: 'Public transportation is well-connected and easy to use, with trams, bicycles, and walking paths found almost everywhere. Wandering through cobblestone streets, waterfront markets, or leafy parks gives visitors an authentic sense of local rhythm.' },
      { title: 'Beyond the Beaten Path', content: 'Venture beyond the cities to discover the country\'s quieter side. Cycle along dike trails surrounded by wildflowers, explore coastal dunes and nature reserves, or visit small villages where tradition still shapes daily life.' }
    ],
    shopEatDrink: {
      shop: 'Wander through flower-filled markets, canal-side boutiques, and artisan workshops where craftsmanship thrives. Take home Delft pottery, handwoven textiles, or locally made cheese and chocolates.',
      eat: 'Savor the comfort of Dutch cuisine with hearty stamppot, golden fries topped with rich sauces, and delicate pancakes served with syrup or fresh fruit.',
      drink: 'Begin your morning with strong coffee beside the water, then enjoy a cold Dutch beer or a glass of crisp white wine as the sun sets.'
    },
    transport: {
      crossCountry: 'Getting around the Netherlands is smooth and efficient thanks to its excellent train network, reliable buses, and ferries that link coastal regions.',
      withinCities: 'Public transportation is easy to navigate, with trams, buses, and bike rentals available almost everywhere. Walking or cycling through historic quarters and canals offers the best way to experience daily Dutch life.',
      regional: 'Move beyond the main hubs to explore the country\'s quieter corners. Pedal along scenic routes through the countryside, visit centuries-old windmills surrounded by wildflowers, or wander coastal dunes alive with birdsong.'
    },
    timeZone: 'Central European Time (CET), which is GMT+1, and observes daylight saving time from late March to late October.',
    rideShare: 'Uber, Bolt, and local taxi services are available in most urban areas, offering safe and convenient transportation.',
    electricity: 'The Netherlands uses 230V electricity with a frequency of 50Hz. Outlets typically fit plug types C and F, so travelers from other regions may need an adapter.',
    climate: 'The Netherlands has a mild maritime climate influenced by the North Sea, with cool summers and relatively gentle winters. Rain can fall throughout the year, keeping the landscape lush and green.',
    filmTv: 'Dutch scenery and culture have appeared in international productions such as The Fault in Our Stars, Ocean\'s Twelve, and Girl with a Pearl Earring. The nation is home to cultural icons like painter Vincent van Gogh, filmmaker Paul Verhoeven, and actress Famke Janssen.',
    phones: 'Emergency Services: 112<br/>Police: 112<br/>Medical Emergency: 112<br/>Fire Brigade: 112<br/>Country Code: +31',
    popularDests: [
      { name: 'Keukenhof Gardens', desc: 'Known as the "Garden of Europe," Keukenhof bursts into color each spring with millions of tulips and other blooms.', img: 'images/Netherlands/801839-Keukenhof-Netherlands-Parks-Tulips.jpg' },
      { name: 'Rijksmuseum', desc: 'This world-renowned museum showcases centuries of Dutch art and history, including masterpieces by Rembrandt and Vermeer.', img: 'images/Netherlands/rijksmuseum.avif' },
      { name: 'Hoge Veluwe National Park', desc: 'This vast reserve blends forest, heathland, and sand dunes with one of Europe\'s most impressive private art collections.', img: 'images/Netherlands/nederland_hoge-veluwe_algemeen_vakantie-veluwe_herten_heideveld_bomen_shutterstock.jpg' },
      { name: "The Hague's Peace Palace", desc: 'Serving as the home of the International Court of Justice, the Peace Palace embodies global diplomacy and justice.', img: 'images/Netherlands/hague.jpg' },
      { name: 'Wadden Sea', desc: 'A UNESCO-listed coastal ecosystem where tides shape shifting sands, salt marshes, and thriving wildlife.', img: 'images/Netherlands/289642-lighthouse-westerhever-wadden-sea-north-sea.jpg' },
      { name: 'Madurodam', desc: 'A miniature park that captures the entire Netherlands in small-scale perfection, featuring landmarks, canals, and windmills.', img: 'images/Netherlands/madurodam.jpg' },
      { name: 'Kinderdijk Windmills', desc: 'A UNESCO World Heritage Site, Kinderdijk\'s network of 18th-century windmills stands as a symbol of Dutch ingenuity in water management.', img: 'images/Netherlands/windmillfield.jpg' },
      { name: 'Van Gogh Museum', desc: 'Dedicated to the life and work of Vincent van Gogh, this museum houses the world\'s largest collection of his paintings and letters.', img: 'images/Netherlands/vangogh1.jpg' },
      { name: 'De Haar Castle', desc: 'With its turrets, drawbridges, and lavish interiors, De Haar Castle is one of the most striking examples of neo-Gothic architecture in the Netherlands.', img: 'images/Netherlands/dehaarcastle.jpg' }
    ]
  },

  // PORTUGAL
  {
    filename: 'portugal.html',
    pageTitle: 'Portugal',
    heroLabel: 'Destination',
    heroImg: 'images/Portugal/919346-portugal-scenery-rivers-fields-valenca-do-douro-nature_edited.jpg',
    bodyParagraphs: [
      'Portugal reveals itself as a land of timeless rhythm and radiant spirit. Cobblestone lanes lead to sun-warmed plazas where the scent of baked bread mingles with ocean air. Its charm lies in the harmony between past and present, where age-old traditions find new life through art, music, and innovation. Every village, vineyard, and shore carries the warmth of a country deeply connected to its roots.',
      'Imagine the glow of sunset over tiled facades, the echo of Fado drifting through narrow alleys, and waves breaking against ancient stone walls. Olive groves shimmer in the distance while church bells mark the slow passing of time. Portugal moves at its own pace, inviting travelers to linger, listen, and feel the quiet poetry of its soul.',
      'Golden light spills across tiled rooftops as the sound of church bells drifts through narrow streets. The aroma of fresh bread and roasted chestnuts fills the air, mingling with the distant hum of the sea. Each morning begins unhurried, shaped by ritual, warmth, and the quiet grace of daily life.',
      'As the day unfolds, layers of history and heart emerge in small moments. You might taste wine among vineyard hills, watch craftsmen paint azulejos by hand, or listen to music that stirs memory and longing. Hospitality feels effortless, expressed through kindness and shared stories.',
      'Stone streets wind through hillside towns where sunlight dances across mosaic tiles and whitewashed walls. Fishing boats sway in calm harbors, and the aroma of grilled sardines mingles with sea air. Each day unfolds with an easy rhythm, guided by tradition, flavor, and a quiet pride in life\'s simple beauty.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Traveling through Portugal is effortless thanks to its reliable network of trains, buses, and coastal ferries. Routes pass through rolling vineyards, olive groves, and golden plains.' },
      { title: 'Exploring Locally', content: 'Cities and towns are easy to navigate on foot, by tram, or with local taxis. Wandering through winding alleys, seaside promenades, and bustling squares reveals the rhythm of daily life.' },
      { title: 'Beyond the Beaten Path', content: 'Journey into Portugal\'s countryside to experience its more tranquil beauty. Walk along vineyard trails, explore rugged cliffs and hidden coves, or visit villages where time moves slowly and tradition endures.' }
    ],
    shopEatDrink: {
      shop: 'Explore lively markets, seaside boutiques, and family-run workshops where Portuguese craftsmanship flourishes. Bring home hand-painted azulejos, fine cork goods, embroidered linens, or ceramics.',
      eat: 'Taste Portugal\'s rich culinary heritage through dishes like bacalhau, grilled sardines, and savory caldo verde. Every plate celebrates freshness, tradition, and the simple pleasure of sharing good food.',
      drink: 'Start your day with a bica, Portugal\'s strong espresso, or sip vinho verde as the afternoon light softens over the hills. End the evening with a glass of port or ginjinha.'
    },
    transport: {
      crossCountry: 'Traveling across Portugal is easy and scenic, with high-speed trains, intercity buses, and coastal ferries connecting its diverse regions.',
      withinCities: 'Urban travel is straightforward with trams, metros, and taxis running regularly throughout major cities. Walking or riding a tuk-tuk through narrow streets offers an authentic view of Portuguese life.',
      regional: 'Venture beyond the cities to uncover Portugal\'s peaceful landscapes. Drive along winding coastal roads, explore medieval villages perched on hilltops, or hike through national parks filled with olive groves and cork trees.'
    },
    timeZone: 'Western European Time (WET), which aligns with GMT, and observes daylight saving time from late March to late October. The Azores Islands are one hour behind mainland Portugal.',
    rideShare: 'Ride-sharing services like Uber operate in major cities alongside reliable local taxis. Booking through official apps or stands ensures safe travel and fair pricing.',
    electricity: 'Portugal uses 230V electricity with a frequency of 50Hz. Plug types C and F are standard, so travelers from other regions may need an adapter.',
    climate: 'Portugal enjoys a Mediterranean climate with long, sunny summers and mild, rainy winters. Coastal areas stay pleasant year-round, while inland regions experience warmer temperatures.',
    filmTv: 'Portugal\'s diverse landscapes have set the scene for films like The Ninth Gate, On Her Majesty\'s Secret Service, and Night Train to Lisbon. The country has produced renowned talents such as director Manoel de Oliveira, actress Daniela Ruah, and football legend Cristiano Ronaldo.',
    phones: 'Emergency Services: 112<br/>Police: 112<br/>Medical Emergency: 112<br/>Fire Brigade: 112<br/>Country Code: +351',
    popularDests: [
      { name: 'Algarve Coast', desc: 'Golden cliffs and turquoise waters define Portugal\'s southern coastline, dotted with hidden coves and sea caves.', img: 'images/Portugal/Portugal_Algarve_3840x2160.jpg' },
      { name: 'Douro Valley', desc: 'Rolling hills blanketed with terraced vineyards line the Douro River, one of Europe\'s oldest wine-producing regions.', img: 'images/Portugal/919346-portugal-scenery-rivers-fields-valenca-do-douro-nature.jpg' },
      { name: 'Palais National de Pena', desc: 'Perched atop the Sintra hills, the Palais National de Pena is a masterpiece of Romantic architecture.', img: 'images/Portugal/Le-Palais-National-de-Pena-scaled.jpeg' },
      { name: 'Madeira Island', desc: 'Known as the "Island of Eternal Spring," Madeira offers lush mountains, botanical gardens, and dramatic seaside cliffs.', img: 'images/Portugal/wp8194410.jpg' },
      { name: 'Azores Archipelago', desc: 'This chain of volcanic islands in the Atlantic features crater lakes, geysers, and geothermal springs.', img: 'images/Portugal/shutterstock_1335737627-3266x1837.jpeg' },
      { name: 'Aveiro Region', desc: 'Known as the "Venice of Portugal," Aveiro enchants with canals, art nouveau buildings, and colorful moliceiro boats.', img: 'images/Portugal/aveiro-10.jpg' },
      { name: 'Braga District', desc: 'One of Portugal\'s oldest religious centers, Braga is adorned with centuries of sacred architecture.', img: 'images/Portugal/braga.jpg' },
      { name: 'Serra da Estrela Mountains', desc: 'Portugal\'s highest mountain range offers glacial valleys, alpine trails, and historic shepherding traditions.', img: 'images/Portugal/Serra-da-Estrela-2.jpg' },
      { name: 'National Museum of the Azulejo', desc: 'Housed in a 16th-century convent, this museum showcases Portugal\'s mastery of decorative tilework.', img: 'images/Portugal/1cb364276aafbd7b42896a410eaf1146-evora.avif' }
    ]
  },

  // SOUTH AFRICA
  {
    filename: 'south-africa.html',
    pageTitle: 'South Africa',
    heroLabel: 'Destination',
    heroImg: 'images/South Africa/316346-cityscape-illustration-cape-town-mountains-south-africa-table.jpg',
    bodyParagraphs: [
      'South Africa unfolds as a land of striking contrasts and unshakable spirit. From open savannas to windswept coastlines, each landscape tells a story shaped by resilience and rhythm. The country\'s energy flows through its music, art, and traditions, revealing a place where history and modern life intertwine with powerful grace.',
      'Picture the sun setting behind red cliffs, the sound of drums rising from a distant celebration, and the scent of braai smoke drifting through the evening air. Waves crash along rocky shores while stars emerge over quiet valleys. South Africa moves with confidence and heart, inviting travelers to feel its pulse, to listen, and to be changed by its beauty.',
      'There is a certain pulse to South Africa that you feel before you see it. It lives in the rhythm of conversation, the taste of spice in the air, and the shifting colors of the sky from dawn to dusk. The land moves between stillness and energy, where mountains meet ocean and voices rise together in song.',
      'Time unfolds differently here. Days stretch wide and generous, filled with the laughter of markets, the glow of sunset over vineyards, and the quiet of starlit plains. Art, music, and food become languages of their own, speaking to the country\'s layered identity.',
      'As the day unfolds, every place offers a new rhythm. You might hear jazz spilling into the streets, watch artists craft beadwork that reflects centuries of meaning, or share a meal that tastes of fire and home. Creativity thrives here, rooted in history yet reaching toward the future.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Traveling across South Africa feels like moving through a living map of contrasts. Long, open highways wind between deserts and forests, while regional flights and comfortable coaches link bustling cities with remote reserves.' },
      { title: 'Exploring Locally', content: 'Urban travel is simple, with reliable taxis, buses, and ride-share services available in most areas. Walking through vibrant markets, visiting museums, or joining guided township tours allows visitors to see daily life up close.' },
      { title: 'Beyond the Beaten Path', content: 'Step away from the cities to uncover South Africa\'s quieter wonders. Follow trails through game reserves, drive along dramatic coastlines, or visit rural villages where traditions still shape daily life.' }
    ],
    shopEatDrink: {
      shop: 'Explore bustling markets, coastal boutiques, and community workshops where South African artistry thrives. Bring home beadwork, hand-carved sculptures, woven baskets, or textiles that reflect the country\'s vibrant mix of cultures.',
      eat: 'Experience South Africa\'s diverse cuisine through dishes like bobotie, chakalaka, and tender meats sizzling over a braai. Dining here feels like celebration, where every bite connects you to the land.',
      drink: 'Begin your morning with a cup of rich South African coffee or freshly brewed rooibos tea. Later, enjoy a glass of world-class Cape wine or a cool craft beer beneath a setting sun.'
    },
    transport: {
      crossCountry: 'Well-maintained highways, regional flights, and scenic train routes connect major cities with coastal towns, mountains, and game reserves.',
      withinCities: 'Getting around South Africa\'s cities is easy with taxis, buses, and ride-share services available throughout urban areas. Every city carries its own distinct character, shaped by culture, cuisine, and creativity.',
      regional: 'Beyond the city limits lies a world of discovery. Drive along coastal highways framed by cliffs and ocean spray, hike through mountain passes filled with wildflowers, or visit small farming communities.'
    },
    timeZone: 'South Africa Standard Time (SAST), which is GMT+2, and does not observe daylight saving time.',
    rideShare: 'Ride-sharing services such as Uber and Bolt are available in most major cities, providing convenient and affordable transportation. Traditional metered taxis can also be found at airports and hotels.',
    electricity: 'South Africa uses 230V electricity with a frequency of 50Hz. The standard plug types are D, M, and N, so travelers may need a universal adapter.',
    climate: 'South Africa experiences a wide range of climates due to its size. Coastal regions enjoy mild, temperate weather, while the interior sees warm summers and cool, dry winters. The Western Cape has a Mediterranean-style climate.',
    filmTv: 'South Africa\'s dramatic scenery has appeared in international productions such as Mad Max: Fury Road, Blood Diamond, and District 9. The nation is home to celebrated figures including actress Charlize Theron, comedian Trevor Noah, and Nelson Mandela.',
    phones: 'Emergency Services: 112<br/>Police: 10111<br/>Medical Emergency: 10177<br/>Fire Brigade: 10111<br/>Country Code: +27',
    popularDests: [
      { name: 'Cape Winelands', desc: 'Rolling vineyards, mountain backdrops, and centuries-old estates make the Cape Winelands one of South Africa\'s most scenic regions.', img: 'images/South Africa/vineyards.jpg' },
      { name: 'Kruger National Park', desc: 'One of Africa\'s largest game reserves, Kruger is home to the Big Five and hundreds of bird species.', img: 'images/South Africa/krueger.jpg' },
      { name: 'Garden Route', desc: 'Stretching along the southern coast, the Garden Route features forests, lagoons, and dramatic cliffs.', img: 'images/South Africa/go360313.jpg' },
      { name: 'Table Mountain National Park', desc: 'Dominating the Cape Peninsula, Table Mountain offers sweeping views and rich biodiversity.', img: 'images/South Africa/DSC09394.jpg' },
      { name: 'Addo Elephant National Park', desc: 'One of the few parks in the world where you can see the "Big Seven."', img: 'images/South Africa/elephants-in-chobe-national-park-botswana-africa-elephants-crossing-olifant-river-evening-shot-kruger-national-park-ai-generated-free-photo.jpg' },
      { name: 'KwaZulu-Natal Battlefields', desc: 'These rolling hills preserve the history of legendary conflicts between Zulu, British, and Boer forces.', img: 'images/South Africa/isandwana-monument-scaled.jpg' },
      { name: 'Cradle of Humankind', desc: 'A UNESCO World Heritage Site holding some of the most important fossil discoveries of early human ancestors.', img: 'images/South Africa/cradle.jpg' },
      { name: 'Wild Coast', desc: 'Untamed and beautiful, the Wild Coast stretches along the Eastern Cape with cliffs, rivers, and unspoiled beaches.', img: 'images/South Africa/78cecc6095cd2ca9447ba6a3620a456e.jpg' },
      { name: 'Robberg Nature Reserve', desc: 'A coastal peninsula of rugged cliffs and seal colonies, combining natural splendor with archaeological significance.', img: 'images/South Africa/c0178389abef65c10ee856c9cdb254d0_edited.jpg' }
    ]
  },

  // SWITZERLAND
  {
    filename: 'switzerland.html',
    pageTitle: 'Switzerland',
    heroLabel: 'Destination',
    heroImg: 'images/Switzerland/alps.jpg',
    bodyParagraphs: [
      'Switzerland feels like a harmony between nature and precision, where every view seems crafted with quiet intention. Snow-capped peaks rise above green valleys, and lakes mirror the clarity of the sky. Life moves at a measured pace, blending tradition with innovation, and every village and city carries its own rhythm of calm and purpose.',
      'Imagine standing beside a glacial lake as bells echo from distant pastures, or walking through cobbled lanes where the scent of chocolate and fresh bread fills the air. Trains glide past mountainsides dotted with chalets, and conversations drift in a blend of languages that reflect the country\'s rich heritage.',
      'Morning mist settles over Switzerland\'s valleys as the first light touches snow-covered peaks. The air feels clean and still, carrying the scent of pine and woodsmoke from distant chalets. Lakes reflect the changing sky, and the rhythm of daily life unfolds with quiet precision and warmth.',
      'As the day unfolds, mountain trails wind past wildflowers and waterfalls, and trains glide through tunnels carved into ancient rock. Cafés hum softly with conversation, and laughter mingles with the clinking of teacups and the smell of melted cheese.',
      'Between towering peaks and shimmering lakes, life in Switzerland moves with quiet grace and purpose. The sound of church bells drifts through alpine villages, laughter echoes from hillside cafés, and the aroma of chocolate and fresh bread carries on the mountain air.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Traveling through Switzerland is as seamless as it is scenic, with an exceptional network of trains, buses, and ferries connecting mountain villages, lakeside towns, and cultural centers.' },
      { title: 'Exploring Locally', content: 'Cities and towns in Switzerland are best explored at a relaxed pace. Efficient trams and local trains make it easy to move between museums, markets, and historic neighborhoods.' },
      { title: 'Beyond the Beaten Path', content: 'Venture into Switzerland\'s quieter corners to discover its natural serenity. Wander through alpine trails lined with wildflowers, visit secluded mountain villages where traditions remain strong, or relax beside a clear, mirror-like lake.' }
    ],
    shopEatDrink: {
      shop: 'Explore charming markets, lakeside boutiques, and alpine workshops where Swiss craftsmanship flourishes. Discover finely made watches, hand-carved wooden toys, artisanal chocolates, and embroidered linens.',
      eat: 'Savor Switzerland\'s rich culinary landscape through dishes like cheese fondue, rösti, and freshly baked bread served with mountain cheeses. Dining here is an act of comfort and connection.',
      drink: 'Start your morning with a smooth espresso in a sunlit café or sip hot chocolate while watching snow fall beyond the window. In the evening, enjoy a crisp glass of local white wine or kirsch.'
    },
    transport: {
      crossCountry: 'Traveling through Switzerland is both effortless and unforgettable, with trains, buses, and ferries connecting every corner of the country in perfect harmony.',
      withinCities: 'Navigating Swiss cities is smooth and enjoyable, thanks to reliable public transport and walkable streets. Each city has its own rhythm — Zurich\'s modern pulse, Geneva\'s cosmopolitan charm, and Bern\'s timeless calm.',
      regional: 'Outside the cities, Switzerland\'s landscapes invite endless exploration. Scenic drives lead to alpine meadows, crystal lakes, and villages where traditions remain woven into daily life.'
    },
    timeZone: 'Central European Time (CET), which is GMT+1, and observes daylight saving time from late March to late October.',
    rideShare: 'Ride-sharing services such as Uber are available in most major Swiss cities, alongside efficient public transportation and reliable taxi services.',
    electricity: 'Switzerland uses 230V electricity with a frequency of 50Hz. Plug types C and J are standard, so travelers from other regions may need an adapter.',
    climate: 'Switzerland\'s climate varies by altitude and region, offering crisp winters and pleasantly warm summers. Snow blankets the Alps from December to March, while lower valleys enjoy mild temperatures.',
    filmTv: 'Switzerland\'s stunning natural settings have appeared in films such as The Girl with the Dragon Tattoo, On Her Majesty\'s Secret Service, and Point Break. The country has produced world-renowned figures including actor Bruno Ganz, tennis legend Roger Federer, and architect Le Corbusier.',
    phones: 'Emergency Services: 112<br/>Police: 117<br/>Medical Emergency: 144<br/>Fire Brigade: 118<br/>Country Code: +41',
    popularDests: [
      { name: 'The Swiss Alps', desc: 'The towering Swiss Alps stretch across much of the country, offering snow-capped peaks, alpine villages, and world-class ski resorts.', img: 'images/Switzerland/wp5136882.jpg' },
      { name: 'Lake Lucerne Region', desc: 'Surrounded by mountains and steeped in legend, Lake Lucerne connects history with breathtaking scenery.', img: 'images/Switzerland/2838288.jpg' },
      { name: 'Rhine Falls', desc: 'Europe\'s largest waterfall, the Rhine Falls, is a natural spectacle of roaring water and mist.', img: 'images/Switzerland/waterfall-and-drops-scatter-on-rhine-falls-in-switzerland-4k-video.jpg' },
      { name: 'Lake Geneva Region', desc: 'Surrounded by vineyards and snow-dusted mountains, Lake Geneva is a haven of tranquility and beauty.', img: 'images/Switzerland/geneva.avif' },
      { name: 'Swiss National Park', desc: 'Located in the Engadin Valley, this is Switzerland\'s only national park and one of the oldest in Europe.', img: 'images/Switzerland/d19ed52f5689974666d067607a1d685b.jpg' },
      { name: 'Emmental Valley', desc: 'A landscape of gentle hills, farmhouses, and green pastures — the birthplace of the famous Emmental cheese.', img: 'images/Switzerland/ae9b04681caabda80771844c482ade34.jpg' },
      { name: 'Bernese Oberland', desc: 'This mountain region is home to dramatic landscapes of waterfalls, glaciers, and pristine valleys.', img: 'images/Switzerland/bernese.jpg' },
      { name: 'Lavaux Vineyards', desc: 'Terraced along the northern shore of Lake Geneva, the Lavaux Vineyards are a UNESCO World Heritage Site.', img: 'images/Switzerland/lavaux.jpg' },
      { name: 'Swiss Transport Museum', desc: 'Located near Lake Lucerne, this museum showcases Switzerland\'s deep connection to travel and innovation.', img: 'images/Switzerland/museum.jpg' }
    ]
  },

  // VIETNAM
  {
    filename: 'vietnam.html',
    pageTitle: 'Vietnam',
    heroLabel: 'Destination',
    heroImg: 'images/Vietnam/Vietnam_summer_Halong_Bay_rocky_ocean_4K_Ultra_HD_3840x2400.jpg',
    bodyParagraphs: [
      'Vietnam reveals itself through motion, color, and life unfolding in every direction. Rivers wind through emerald rice fields, lanterns glow above ancient streets, and the scent of lemongrass drifts from open kitchens. The pace shifts gently between calm and chaos, where quiet temples stand not far from buzzing markets.',
      'Picture morning mist rising over terraced hills, the call of vendors on bicycles, and the rhythm of boats gliding across the Mekong. The air hums with energy and warmth, and each encounter feels genuine and alive. From mountain villages to coastal towns, tradition and progress weave together with effortless beauty.',
      'Life in this land feels fluid and vibrant, shaped by water, earth, and the pulse of its people. Rivers wind through fertile plains, ancient temples rest beneath the shade of banyan trees, and the air hums with a blend of incense, music, and laughter.',
      'Along the curve of its rivers and the rise of its mountains, Vietnam reveals itself through movement and texture. The hum of scooters, the sizzle of street-side woks, and the laughter that drifts from open windows form a living soundtrack to daily life.',
      'Its essence lives in the harmony between people and place, where every gesture seems connected to something deeper. You might see fishermen casting nets at dawn, artisans shaping lacquer by hand, or families gathered around bowls of soup rich with history.'
    ],
    needToKnow: [
      { title: 'Getting Between Destinations', content: 'Travel across Vietnam offers a tapestry of sights and sensations, with trains, buses, and flights connecting its long, narrow stretch from north to south. The journey itself feels alive, passing through lush rice fields, mountain passes, and winding coastal roads.' },
      { title: 'Exploring Locally', content: 'Within towns and cities, getting around is part of the experience. Cyclo rides, motorbikes, and vibrant walking streets lead travelers through markets bursting with color, temples filled with incense, and cafés overlooking calm lakes.' },
      { title: 'Beyond the Beaten Path', content: 'Beyond the urban centers, the countryside unfolds with a sense of quiet wonder. Mist drifts over terraced rice fields, rivers weave through limestone cliffs, and fishing villages rest peacefully along the coast.' }
    ],
    shopEatDrink: {
      shop: 'Wander through bustling markets, riverside stalls, and small village workshops where Vietnam\'s artistry thrives. Browse handwoven silk, lacquerware, conical hats, bamboo baskets, and ceramics painted with remarkable precision.',
      eat: 'Explore Vietnam\'s rich culinary identity through dishes that awaken every sense. Fragrant bowls of pho, crisp banh xeo, grilled river fish, and fresh herbs tell stories of the land and the people who cultivate it.',
      drink: 'Pause for a traditional cup of Vietnamese coffee, thick and sweet, dripping slowly into condensed milk, or sip warm lotus tea in a shaded courtyard. Every region offers its own taste.'
    },
    transport: {
      crossCountry: 'Travel across Vietnam feels like moving through a living canvas painted in color and motion. Roads wind past rice terraces that shimmer in the sun, while rivers, trains, and flights link the country\'s highlands, deltas, and coastlines.',
      withinCities: 'Getting around Vietnam\'s cities is an adventure filled with sound, color, and rhythm. Motorbikes weave through busy streets, while cyclos and walking tours uncover narrow lanes, colonial architecture, and bustling markets.',
      regional: 'Beyond the urban energy, Vietnam\'s countryside offers endless possibilities for discovery. Mountain paths wind through mist-covered valleys, rivers snake between limestone cliffs, and fishing boats dot the quiet bays.'
    },
    timeZone: 'Vietnam follows Indochina Time (ICT), which is GMT+7, and does not observe daylight saving time.',
    rideShare: 'Ride-sharing services like Grab operate in most major cities and are an easy, affordable way to get around. In smaller towns, motorbike taxis and cyclos offer a more local and personal way to explore.',
    electricity: 'Vietnam uses 220V electricity with a frequency of 50Hz. Plug types A, C, and D are the most common, so travelers may need an adapter.',
    climate: 'Vietnam\'s climate varies widely from north to south. The north experiences cool, dry winters and warm, humid summers, while the central coast sees tropical heat and seasonal rains. In the south, the climate stays warm year-round.',
    filmTv: 'Vietnam\'s breathtaking landscapes and vibrant streets have appeared in films such as Indochine, The Quiet American, and Kong: Skull Island. The nation has produced many celebrated talents, including director Tran Anh Hung and model-actress Ngo Thanh Van.',
    phones: 'Emergency Services: 113<br/>Police: 113<br/>Medical Emergency: 115<br/>Fire Brigade: 114<br/>Country Code: +84',
    popularDests: [
      { name: 'Ha Long Bay', desc: 'A UNESCO World Heritage Site known for its emerald waters and limestone karsts rising dramatically from the sea.', img: 'images/Vietnam/Vietnam_summer_Halong_Bay_rocky_ocean_4K_Ultra_HD_3840x2400.jpg' },
      { name: 'Sapa Highlands', desc: 'Terraced rice fields cascade down misty mountains, creating one of Vietnam\'s most iconic landscapes.', img: 'images/Vietnam/owu6zx7ifl921.jpg' },
      { name: 'Perfume Pagoda', desc: 'Set among limestone mountains and rivers, this complex of Buddhist temples and shrines is a major pilgrimage site.', img: 'images/Vietnam/2a49938503e4b124c83c8528bf1426ec.jpg' },
      { name: 'Mekong Delta', desc: 'This vast network of rivers, canals, and islands forms the agricultural heart of southern Vietnam.', img: 'images/Vietnam/dieu-thu-vi-khi-du-lich-song-mekong-084157.jpg' },
      { name: 'Hoi An Ancient Town', desc: 'A living museum of Vietnamese history, Hoi An preserves centuries-old architecture and lantern-lit streets.', img: 'images/Vietnam/AdobeStock_99875725-hoi-an-vietnam-2.jpeg' },
      { name: 'Hoang Lien Son Mountains', desc: 'Towering above northern Vietnam, this range includes Fansipan, the country\'s highest peak.', img: 'images/Vietnam/shutterstock_1624326598-1-scaled.jpg' },
      { name: 'Phong Nha–Ke Bang National Park', desc: 'Home to some of the world\'s largest and most impressive caves, this UNESCO-listed park showcases Vietnam\'s geological wonders.', img: 'images/Vietnam/pcelrnbtymd01.jpg' },
      { name: 'Imperial City of Hue', desc: 'Once the seat of the Nguyen emperors, Hue\'s citadel and royal tombs capture the grandeur of Vietnam\'s imperial past.', img: 'images/Vietnam/iStock-971966634.jpg' },
      { name: 'War Remnants Museum', desc: 'Located in southern Vietnam, this powerful museum documents the Vietnam War through photography, artifacts, and personal accounts.', img: 'images/Vietnam/201088.jpg' }
    ]
  }
];

// ============================================================
// CRUISE ROUTE DATA
// ============================================================

const CRUISE_PAGES = [
  {
    filename: 'chobe.html',
    pageTitle: 'Chobe',
    heroLabel: 'Africa · Botswana · Zimbabwe',
    heroImg: 'images/Africa/chobe.jpg',
    regionLabel: 'Africa — Chobe',
    itineraries: [
      { title: 'Rivers &amp; Rails of Africa — 12 Nights', img: 'images/Africa/rovos.jpg', desc: 'Relive the romance of a bygone era traveling on the world\'s most luxurious and historic train, the Rovos Rail. You\'ll spend three nights in Cape Town before a four-night Zambezi Queen wildlife and safari cruise in Chobe National Park. Revel in breathtaking scenery and marvel at mighty elephants, stealthy lions, and the legendary Victoria Falls before journeying through Zimbabwe and on to South Africa.' },
      { title: 'Rivers &amp; Rails of Africa — Extended', img: 'images/Africa/victoria.jpg', desc: 'Experience the timeless grace of African exploration via the legendary Rovos Rail. Fly north to Victoria Falls and transfer to the Zambezi Queen for a wildlife and safari cruise through Namibia and Botswana. Revel in Chobe National Park\'s breathtaking scenery before traveling 1,000 miles through Zimbabwe and South Africa, experiencing five-star cuisine, excellent wines, and extraordinary wildlife.' },
      { title: 'Wildlife and the Falls', img: 'images/Africa/victoria2.jpg', desc: 'Embark on a thrilling African adventure through South Africa, Botswana, and Zimbabwe. Begin in Johannesburg before boarding the Zambezi Queen for a four-night safari on the Chobe River. Witness incredible wildlife up close and marvel at the awe-inspiring Victoria Falls. Conclude with a stay in Greater Kruger National Park.' },
      { title: 'Golden Trails of Africa', img: 'images/Africa/chobe2.jpg', desc: 'Begin with an overnight stay in Johannesburg or an optional three nights in Cape Town. Fly to Kasane, Botswana, and embark on a four-night Chobe River cruise. Spend two nights at the majestic Victoria Falls before journeying to Tanzania for a luxury safari at stunning lodges in Tarangire, Ngorongoro, and the Serengeti.' },
      { title: 'Discover Africa', img: 'images/Africa/wp2007449.jpg', desc: 'Discover South Africa\'s natural wonders on a journey from Cape Town to Victoria Falls. Explore Table Mountain, Boulders Beach, and the Cape of Good Hope before embarking on a Chobe River safari. Encounter elephants, giraffes, and leopards before concluding with two unforgettable nights at Victoria Falls.' },
      { title: 'Stars of South Africa', img: 'images/Africa/Pretoria-3-scaled.jpg', desc: 'Begin with three nights in Cape Town before flying to Kasane for your Zambezi Queen safari cruise on the Chobe River. Explore Chobe National Park, home to one of the densest wildlife populations in Africa. Spend two nights at Victoria Falls, visit Soweto in Johannesburg, then fly to Greater Kruger National Park for daily game drives beneath breathtakingly clear skies.' }
    ]
  },
  {
    filename: 'mekong.html',
    pageTitle: 'Mekong',
    heroLabel: 'Asia · Vietnam · Cambodia',
    heroImg: 'images/Mekong/16019013-mekong-river-near-luang-prabang.jpg',
    regionLabel: 'Asia — Mekong',
    itineraries: [
      { title: 'Riches of the Mekong', img: 'images/Mekong/512889.jpg', desc: 'Journey along the Mekong through Cambodia and Vietnam, where time seems to slow and tradition thrives. Explore rural villages, bustling markets, and receive a special Buddhist blessing from monks. Discover Phnom Penh\'s Royal Palace and National Museum, and meet artisans crafting local delicacies. Ride by oxcart, tuk tuk, and trishaw as the Mekong reveals its vibrant, timeless spirit.' },
      { title: 'Charms of the Mekong', img: 'images/Mekong/aerial-view-4k-by-drone-at-tam-coc-ninh-binh-vietnam-free-video.jpg', desc: 'Begin your adventure in lively Ho Chi Minh City, the "Pearl of the Orient," where tradition meets modern energy. Sail the Mekong River and glimpse a world where ancient customs still flourish. Visit rural villages, pagodas, and markets, and receive a special blessing from Buddhist monks. Meet skilled artisans and savor the culture, beauty, and spirit of Vietnam and Cambodia.' }
    ]
  },
  {
    filename: 'magdalena.html',
    pageTitle: 'Magdalena',
    heroLabel: 'Colombia · Magdalena River',
    heroImg: 'images/Colombia/cartagena.jpg',
    regionLabel: 'Colombia — Magdalena',
    itineraries: [
      { title: 'Magic of Colombia', img: 'images/Colombia/819486-Cartagena-Houses-Colombia-Tower.jpg', desc: 'Experience the vibrant soul of Colombia on a 7-night journey along the Magdalena River. Dance to the rhythms of cumbia and vallenato during a private Carnaval celebration in Barranquilla. Savor Colombia\'s rich coffee and witness its incredible wildlife and lush landscapes. Meet the warm people who bring this colorful culture to life on an unforgettable AmaWaterways voyage.' },
      { title: 'Wonders of Colombia', img: 'images/Colombia/841098-barranquilla-sunset-landscape-light-colombia-sun.jpg', desc: 'Immerse yourself in the wonders of Colombia, the "Land of a Thousand Rhythms," as you journey along the magnificent Magdalena River. Explore the streets of Palenque, the first free city in Colombia. Delight in the colorful neighborhood of Getsemaní in Cartagena. Discover how Spanish and pre-colonial cultures combined to bring us the music, minds, and culture that shape the country today.' }
    ]
  },
  {
    filename: 'nile.html',
    pageTitle: 'Nile',
    heroLabel: 'Egypt · Nile River',
    heroImg: 'images/Africa/Nile-river.jpg',
    regionLabel: 'Egypt — Nile',
    itineraries: [
      { title: 'Secrets of Egypt &amp; the Nile', img: 'images/Egypt/The-Nile-River-Egypt-Tours-Portal.jpg', desc: 'Experience the wonders of Egypt on an unforgettable 11-night journey along the Nile. Explore the Pyramids of Giza, the Sphinx, and the treasures of the Grand Egyptian Museum with expert Egyptologists. Venture into the Valley of the Kings and Queens and enjoy a private lunch at the Abdeen Presidential Palace. Discover Egypt\'s timeless beauty and rich history on this extraordinary voyage.' }
    ]
  },
  {
    filename: 'danube.html',
    pageTitle: 'Danube',
    heroLabel: 'Europe · Danube River',
    heroImg: 'images/Danube/danube_edited.jpg',
    regionLabel: 'Europe — Danube',
    itineraries: [
      { title: 'Best of the Danube', img: 'images/Danube/budapest5.jpg', desc: 'Journey along the Danube and uncover the imperial splendor of Old-World Europe. Begin with a pre-cruise stay in Budapest before sailing through the stunning Wachau Valley, a UNESCO World Heritage Site. Explore the grand capitals of Bratislava and Vienna, rich with art, music, and timeless architecture. Conclude in Salzburg, where The Sound of Music and Mozart\'s legacy continue to inspire.' },
      { title: 'Melodies of the Danube', img: 'images/Danube/vienna.jpg', desc: 'Sail the legendary Danube and discover why this river has long inspired artists, poets, and musicians. Admire timeless architecture and art in Budapest, Bratislava, and Vienna. Feel the music come alive in Salzburg and the Austrian Lake District. Glide through the enchanting Strudengau Valley as the melodies of the Danube guide you through history\'s most regal landscapes.' },
      { title: 'Magna on the Danube', img: 'images/Danube/budapest4.jpg', desc: 'Indulge your love for architecture, music, and fine cuisine on an itinerary crafted for AmaMagna. Taste apricot brandy and chocolate in Dürnstein and enjoy a wine festival in Spitz. Explore Vienna\'s Baroque beauty at Schönbrunn Palace and experience the vibrant charm of Budapest and Bratislava.' },
      { title: 'Grand Danube Cruise', img: 'images/Danube/croatia.jpg', desc: 'Follow the path of conquerors, crusaders, and kings through Romania, Bulgaria, Serbia, Croatia, Hungary, Austria, and Germany. Sail the Danube and pass the dramatic Iron Gates. See Bulgaria\'s Rock-Hewn Churches of Ivanovo and taste Roman heritage in Pécs. From Budapest to Vienna, discover the folklore and traditions that keep this region\'s past alive.' },
      { title: 'Romantic Danube', img: 'images/Danube/budapest3.jpg', desc: 'Experience the romance of Old World Europe at the heart of the continent. Explore the timeless cities of Vienna, Bratislava, and Budapest. Discover the charm of Salzburg and the fairytale town of Český Krumlov. From grand abbeys to hilltop fortresses, the Danube invites you to revel in her regal splendor.' },
      { title: 'Blue Danube Discovery', img: 'images/Danube/danube2.jpeg', desc: 'Uncover Europe\'s artistic, historical, and cultural treasures on a journey through its most iconic destinations. Sail from Budapest to Vienna, Passau, and the ancient town of Regensburg, a UNESCO World Heritage Site. Visit grand cathedrals, taste Vienna\'s famous sacher-torte, and witness the beauty of Europe\'s landscapes.' },
      { title: 'Magnificent Europe', img: 'images/Danube/nuremberg.jpg', desc: 'Sail the route of emperors and kings on a grand journey along the Danube, Main, and Rhine through five captivating countries. Discover UNESCO treasures like Cologne\'s Cathedral, Würzburg\'s Residenz Palace, and the Old Towns of Bamberg and Regensburg. Taste fine Rieslings, savor regional cuisines, and explore by bike or hike.' },
      { title: 'Legendary Danube', img: 'images/Danube/danube.jpg', desc: 'Begin in the medieval city of Nuremberg and end in the cultural splendor of Budapest on a voyage through Europe\'s rich past. Cruise the Main-Danube Canal and cross the Continental Divide, a true engineering marvel. Discover Regensburg\'s timeless beauty and Vienna\'s imperial elegance.' },
      { title: 'Gems of Southeast Europe', img: 'images/Danube/amsterdam.jpg', desc: 'Sail the lower Danube through Hungary, Croatia, Serbia, Bulgaria, and Romania. Explore Celtic fortresses, medieval towns, and grand cities surrounded by pastoral landscapes and the famed Iron Gates. Bike through Belgrade\'s Kalemegdan Park or savor wines from Croatia\'s ancient vineyards.' }
    ]
  },
  {
    filename: 'rhine.html',
    pageTitle: 'Rhine &amp; Moselle',
    heroLabel: 'Europe · Rhine &amp; Moselle Rivers',
    heroImg: 'images/Rhine/rhine-gorge_18711599.jpg',
    regionLabel: 'Europe — Rhine &amp; Moselle',
    itineraries: [
      { title: 'Grand Rhine &amp; Dutch Canals', img: 'images/Rhine/amsterdam.jpg', desc: 'Delight your senses on a journey through the Netherlands, Belgium, Germany, France, and Switzerland. Taste rich Belgian chocolates and inhale the aroma of fresh waffles. Visit fairytale castles like de Haar, Gaasbeek, and Ghent\'s Castle of the Counts. Cruise the Rhine, a UNESCO World Heritage Site lined with 40 castles.' },
      { title: 'Captivating Rhine', img: 'images/Rhine/alsace.jpg', desc: 'Sail the legendary Rhine, surrounded by vineyard-covered hills and storybook castles. Explore France\'s Alsace region, from Strasbourg\'s charm to Colmar\'s timeless beauty. Discover Breisach and sunlit Freiburg, and savor local delights like Rüdesheimer coffee and German beer. From Amsterdam\'s canals to the Swiss Alps, immerse yourself in the heart of Europe\'s most captivating destinations.' },
      { title: 'Rhine &amp; Moselle Splendors', img: 'images/Rhine/moselle.jpg', desc: 'Expand your imagination in fairytale villages — Trier, with its ancient Roman treasures, and enchanting Cochem where folklore and history come alive. Whimsical fantasies abound at Siegfried\'s Mechanical Instrument Cabinet and at the Palace Gardens of Schwetzingen. Blend German heritage with French heritage in Strasbourg on this most splendid journey.' },
      { title: 'Rhine Castles &amp; Swiss Alps', img: 'images/Rhine/basel.jpg', desc: 'Experience a fairytale journey along the Rhine, where castles and vineyards create a storybook scene. Begin in Amsterdam\'s charming canals before exploring Cologne, Rüdesheim, and Heidelberg. Cruise through the UNESCO-listed Rhine Gorge, where 40 castles crown the hillsides. Discover Strasbourg\'s Alsatian allure and the stunning Swiss Alps.' },
      { title: 'Vineyards of the Rhine &amp; Moselle', img: 'images/Rhine/rudesheim.jpg', desc: 'Drink in the beauty, history and flavor of the Rhine and Moselle river valleys\' iconic vineyards. Begin with a ride through Amsterdam\'s legendary canals, then head to Cologne to taste Kölsch beer. Soar above vineyards by gondola or hike among the grapes in Rüdesheim and sip wines in Bernkastel.' },
      { title: "Europe's Rivers &amp; Castles", img: 'images/Rhine/frankfurt.jpg', desc: 'Cruise through Europe\'s most picturesque landscapes, from the winding Main to the castle-dotted Upper Middle Rhine and the vineyard slopes of the Moselle. Stroll through storybook towns like Bernkastel, Cochem, and Rothenburg along the Romantic Road.' },
      { title: 'Rhine &amp; Moselle Delights', img: 'images/Rhine/cologne.jpg', desc: 'Explore the Rhine and Moselle, where fairytale towns and iconic cities reveal the heart of Europe. Sail from Basel\'s pristine beauty to Amsterdam\'s colorful canals, uncovering history and legend. Wander through Bernkastel and Cochem, hike vineyards, and ride a gondola above the Rhine.' },
      { title: 'Swiss Alps &amp; Rhine Castles', img: 'images/Rhine/wurzburg.jpg', desc: 'Embark on a storybook Rhine journey through the Netherlands, Germany, France, and Switzerland. Explore Amsterdam\'s canals, Cologne\'s grandeur, and the charm of Rüdesheim and Heidelberg. Cruise the UNESCO-listed Rhine Gorge and marvel at the Swiss Alps on this enchanting voyage.' },
      { title: 'Enchanting Rhine', img: 'images/Rhine/st-paul-s-strasbourg-church-4pdwm2tswke1t6zx.jpg', desc: 'Experience the perfect balance of history and innovation in Europe\'s grand cities. Visit Heidelberg, where Mark Twain found inspiration for A Tramp Abroad. Savor Germany\'s timeless traditions, from legendary beers to rich Rüdesheimer coffee. Cruise the UNESCO-listed Rhine, where 40 castles line the river.' },
      { title: 'Medieval Treasures', img: 'images/Rhine/nuremberg.jpg', desc: 'Step into centuries of history in the medieval towns of Rothenburg, Bamberg, and Miltenberg. Admire the grandeur of the Würzburg Residenz and Mannheim Baroque Palace. Savor Rüdesheimer coffee, Bamberg\'s smoked beer, and the timeless treasures of Europe.' },
      { title: 'Rhine &amp; Moselle Fairytales', img: 'images/Rhine/luxembourg.jpg', desc: 'Step into a fairytale as you sail the castle-lined Rhine and the scenic Moselle, surrounded by Europe\'s steepest vineyards. Discover the charm of Alsace in Strasbourg and Riquewihr, where French and German cultures intertwine.' },
      { title: 'Magnificent Europe', img: 'images/Rhine/rhine-gorge_18711599.jpg', desc: 'Follow the path of emperors and royalty on a grand voyage along the Danube, Main, and Rhine through five captivating countries. Discover UNESCO treasures like Cologne\'s Cathedral, Würzburg\'s Residenz Palace, and the Old Towns of Bamberg and Regensburg.' }
    ]
  },
  {
    filename: 'rhone.html',
    pageTitle: 'Rhône &amp; Saône',
    heroLabel: 'France · Rhône &amp; Saône Rivers',
    heroImg: 'images/Rhone/Abbaye_Notre_Dame_de_Senanque_Gordes_Provence_Bing_4K_2560x1920.jpg',
    regionLabel: 'France — Rhône &amp; Saône',
    itineraries: [
      { title: 'Colors of Provence', img: 'images/Rhone/sprachreisen-lyon-sprachschule-header_edited.jpg', desc: 'Delight your senses on a journey through France\'s culinary and artistic heart. Begin in Lyon, the gourmet capital, and savor wines from Beaujolais to Côtes du Rhône. Hunt for truffles, pair fine chocolate with wine, and explore Avignon\'s UNESCO treasures. In Arles, walk in the footsteps of Van Gogh and Picasso amid timeless Provençal charm.' },
      { title: 'Flavors of Burgundy', img: 'images/Rhone/alain_doire__bourgogne-franche-comte_tourisme-bfc_0018906a4.jpg', desc: 'Treat your senses to the rich flavors of Burgundy on an indulgent voyage through France\'s famed wine region. Sample fine wines in Seurre, Tournus, Mâcon, and Lyon as you sail the scenic Saône River. Take in vineyard views and historic landmarks, and discover Burgundy\'s culture and history on this captivating journey.' },
      { title: 'Essence of Burgundy &amp; Provence', img: 'images/Rhone/Burgundy_History_Castle-town.avif', desc: 'Savor the essence of France on a flavorful journey through Burgundy and Provence. Explore Chalon-sur-Saône\'s Roman past and Tournus\'s medieval charm. Taste your way through Lyon, the culinary capital, and visit grand châteaux and Avignon\'s Papal Palace.' },
      { title: 'Grand Seine &amp; Rhône', img: 'images/Rhone/lyon.jpg', desc: 'Experience the best of France on a journey along the Seine, Saône, and Rhône. Begin in Paris, visit Château Gaillard, and honor history on the Normandy beaches. Explore Rouen before heading to Dijon and savoring Burgundy and Rhône wines. In Lyon, taste culinary delights, visit a truffle farm, and walk in Van Gogh\'s footsteps in Arles.' }
    ]
  },
  {
    filename: 'siene.html',
    pageTitle: 'Seine',
    heroLabel: 'France · Seine River',
    heroImg: 'images/Siene/aerial_view_of_lighting_eiffel_tower_and_paris_city_during_sunset_4k_5k_hd_travel-3840x2160.jpg',
    regionLabel: 'France — Seine',
    itineraries: [
      { title: 'Impressions of the Seine &amp; Paris', img: 'images/Siene/paris_bridge_with_lighting_above_river_4k_hd_travel-3840x2160.jpg', desc: 'Sail the Seine and uncover the beauty of Paris and the landscapes that inspired the Impressionists. Visit Monet\'s home in Giverny and stroll through the enchanting Gardens d\'Acquigny. Savor Norman chocolate, cheese, and cider, or explore Le Havre and Rouen by bike. With castles, châteaux, and timeless scenery, this journey is a masterpiece of its own.' },
      { title: 'Grand Seine &amp; Bordeaux', img: 'images/Siene/1122527-cityscape-reflection-evening-river-panorama-dusk-Bordeaux-palace-Place-de-la-bourse-landmark.jpg', desc: 'Experience France\'s art, culture, and cuisine on a 14-night journey along the Seine, Garonne, Dordogne, and Gironde Estuary. Depart Paris for Normandy to visit the D-Day beaches. Explore Monet\'s Giverny, cycle through the countryside, then head to Bordeaux to savor fine wines and admire landmarks like Blaye Citadel and Cité du Vin.' },
      { title: 'Paris &amp; Normandy', img: 'images/Siene/normandy.jpg', desc: 'Experience the best of Northern France, from Paris\'s irresistible charm to Normandy\'s scenic coastline and rich history. Visit Monet\'s Gardens and Honfleur, where the Impressionists found their muse. Reflect at the D-Day beaches and the site of Joan of Arc\'s martyrdom. Explore Château de Bizy and indulge in art, culture, and timeless beauty.' },
      { title: 'Grand Seine &amp; Rhône', img: 'images/Siene/Lyon-Widescreen-Wallpapers-96250.jpg', desc: 'Experience the best of France on a journey along the Seine, Saône, and Rhône. Begin in Paris, visit Château Gaillard, and honor history on the Normandy beaches. Explore Rouen before heading to Dijon and savoring Burgundy and Rhône wines. In Lyon, taste culinary delights and walk in Van Gogh\'s footsteps in Arles.' }
    ]
  },
  {
    filename: 'douro.html',
    pageTitle: 'Douro',
    heroLabel: 'Portugal · Douro River',
    heroImg: 'images/Douro/1342527-vineyards-douro-valley.jpg',
    regionLabel: 'Portugal — Douro',
    itineraries: [
      { title: 'Enticing Douro', img: 'images/Douro/Douro_Valley_Tours_Winery_Portugal-1.jpg', desc: 'Sail through the breathtaking Douro River Valley, where terraced vineyards and rustic farms shape one of Europe\'s most unspoiled landscapes. Depart from Porto, the "City of Bridges," and explore Regua, the heart of Port wine country. Journey to Salamanca, the UNESCO "Golden City," and savor wines from historic estates. Experience the timeless beauty and charm of Portugal\'s Douro region.' },
      { title: 'Flavors of Portugal &amp; Spain', img: 'images/Douro/GettyImages-864654144-scaled.jpg', desc: 'Begin your journey in Porto, the "City of Bridges," and sail through the UNESCO-listed Douro River Valley lined with terraced vineyards and charming quintas. Taste exquisite wines and uncover Portugal\'s winemaking heritage. Visit Castelo Rodrigo, enjoy lunch at a vineyard in Pinhão, and explore Lamego\'s sacred sites.' }
    ]
  },
  {
    filename: 'dordogne.html',
    pageTitle: 'Dordogne &amp; Garonne',
    heroLabel: 'France · Dordogne &amp; Garonne Rivers',
    heroImg: 'images/Dordogne/bordeaux-vineyards-659582dd323c2.avif',
    regionLabel: 'France — Dordogne &amp; Garonne',
    itineraries: [
      { title: 'Taste of Bordeaux', img: 'images/Dordogne/bordeaux-saint-estephe-infinities-wines.jpg', desc: 'Experience the heart of French culture in Bordeaux, where romance and red wine flow together. Visit historic vineyards, sample world-class vintages, and tour grand estates like Roquetaillade Castle and Château Boutinet. Stroll through Saint-Émilion and Bordeaux\'s cobblestone streets or bike through the countryside.' },
      { title: 'Grand Seine &amp; Bordeaux', img: 'images/Dordogne/wp3605435.jpg', desc: 'Discover France\'s art, history, and cuisine on a 14-night voyage along the Seine, Garonne, Dordogne, and Gironde Estuary. Begin in Paris and journey through Normandy to the D-Day beaches. Visit Monet\'s Giverny, explore fairytale châteaux, and bike through the countryside. Then travel to Bordeaux to savor world-class wines and admire landmarks like Blaye Citadel and Cité du Vin.' }
    ]
  },
  {
    filename: 'dutch-belgium.html',
    pageTitle: 'Dutch &amp; Belgium',
    heroLabel: 'Netherlands · Belgium · Rhine',
    heroImg: 'images/Dutch/654225-dinant-belgium-europe-church-cityscape-reflected.jpg',
    regionLabel: 'Netherlands &amp; Belgium',
    itineraries: [
      { title: 'Grand Rhine &amp; Dutch Canals', img: 'images/Dutch/4434443.jpg', desc: 'Delight your senses on a journey through the Netherlands, Belgium, Germany, France, and Switzerland. Taste Belgian chocolates, savor waffles and Dutch fries, and admire castles like de Haar and Gaasbeek. Experience traditions from German beer brewing to Rüdesheimer coffee making. Cruise the UNESCO-listed Rhine, lined with 40 castles.' },
      { title: 'Best of Holland &amp; Belgium', img: 'images/Dutch/5811751.jpg', desc: 'Awaken your senses on a captivating journey through the Netherlands and Belgium. Savor rich chocolates, warm waffles, and crispy street fries as you explore castles like de Haar, Bouchout, and Ghent\'s Castle of the Counts. Hear the melodies of Utrecht\'s Museum Speelklok and glide through Amsterdam\'s famous canals. With expert local guides, experience the very best of Holland and Belgium.' },
      { title: 'Tulip Time', img: 'images/Dutch/1f52ea2476284ecfbbfc0cee9063f1c7.jpg', desc: 'Celebrate spring in the Netherlands and Belgium as the Keukenhof Gardens and Floralia burst into bloom. Marvel at the charming Kinderdijk windmills and the artistry of Delft porcelain. Explore the medieval splendor of Bruges or Ghent and delight in Belgian chocolates, waffles, and cheeses. Embrace the storybook beauty of this enchanting region in full bloom.' }
    ]
  },
  {
    filename: 'holiday.html',
    pageTitle: 'Holiday Cruises',
    heroLabel: 'Specialty · Holiday Season',
    heroImg: 'images/Cruise/holiday.jpg',
    regionLabel: 'Specialty — Holiday Cruises',
    itineraries: [
      { title: 'Holiday Season River Cruises', img: 'images/Danube/vienna.jpg', desc: 'Celebrate the holiday season in the most magical way — sailing Europe\'s iconic rivers as Christmas markets sparkle along the banks. Sip glühwein in Vienna, admire festive decorations in Nuremberg, and discover the warmth of European holiday traditions. A curated selection of seasonal itineraries awaits. Contact us for current availability and dates.' }
    ]
  },
  {
    filename: 'wine.html',
    pageTitle: 'Wine Cruises',
    heroLabel: 'Specialty · Wine & Vineyards',
    heroImg: 'images/Cruise/wine.jpg',
    regionLabel: 'Specialty — Wine Cruises',
    itineraries: [
      { title: 'Wine-Focused River Voyages', img: 'images/Douro/1342527-vineyards-douro-valley.jpg', desc: 'Celebrate the world\'s finest wine regions from the deck of a luxury river vessel. From the Douro Valley\'s terraced quintas to Burgundy\'s legendary estates, Alsace\'s Riesling slopes to the Moselle Valley\'s steep vineyards — every voyage is a toast to the art of winemaking. Expertly curated wine tastings, vineyard tours, and sommelier-led experiences await at every port.' }
    ]
  }
];

// ============================================================
// GENERATE FILES
// ============================================================

let generated = 0;

DEST_PAGES.forEach(cfg => {
  const html = destPage(cfg);
  const filePath = path.join(BASE, cfg.filename);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${cfg.filename}`);
  generated++;
});

CRUISE_PAGES.forEach(cfg => {
  const html = cruisePage(cfg);
  const filePath = path.join(BASE, cfg.filename);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${cfg.filename}`);
  generated++;
});

console.log(`\n✅ Generated ${generated} pages.`);
