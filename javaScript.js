// ─────────────────────────────
// CURSOR PERSONALIZADO
// ─────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';

  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .product-card, .cabeza-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';

    cursorRing.style.width = '50px';
    cursorRing.style.height = '50px';
    cursorRing.style.borderColor = 'rgba(201,162,39,0.8)';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';

    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(201,162,39,0.5)';
  });
});


// ─────────────────────────────
// PARTÍCULAS
// ─────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = ['#c9a227','#e8c96b','#c0195a','#2d7a1f','#d45a0a','#6b3fa0'];
const particles = [];

for (let i = 0; i < 55; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.15
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();


// ─────────────────────────────
// NAVBAR SCROLL
// ─────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});


// ─────────────────────────────
// INTERSECTION OBSERVER (ANIMACIONES)
// ─────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.product-card, .step, .cat-card')
  .forEach(el => observer.observe(el));


// ─────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';

    let current = 0;
    const inc = target / 40;

    const timer = setInterval(() => {
      current += inc;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      el.textContent = Math.floor(current) + suffix;
    }, 40);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter')
  .forEach(el => counterObserver.observe(el));


// ─────────────────────────────
// FILTROS DE CATÁLOGO
// ─────────────────────────────

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelectorAll('.filter-btn')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    document.querySelectorAll('.product-card').forEach(card => {

      const category = card.getAttribute('data-category'); // 🔥 más seguro

      const match = filter === 'all' || category === filter;

      if (match) {
        card.style.display = 'block'; // 👈 importante
        card.classList.remove('visible');

        setTimeout(() => {
          card.classList.add('visible');
        }, 50);

      } else {
        card.style.display = 'none';
      }

    });
  });
});

const IMGS = {
 };


// ── CATALOG DATA ──
const CATALOG = [
  {
    id: "tapamonos",
    name: "Tapamoños de 2–3 Flores",
    type: "Accesorio de cabello",
    desc: "Elegantes tapamoños adornados con 2 ó 3 flores elaboradas en perlas, lágrimas y alambre dorado.",
    price: "B/. 20.00",
    unit: "c/u",
    thumb: "tapamonos",
    detail: "detail_tapamonos",
    materials: ["Perla 3.5","Alambre número 4","Lágrima número 8","Bolitas número 6","Gancho mediano","Hilo verde","Alambre para amarrar número 20"],
    pistilos: ["Perla 3.5","Alambre 4","Lágrima 5","Flor 5","Bolitas 5","Hilo verde"],
    variants: [
      {name:"Multicolor vibrante",img:"tapamonos"},
      {name:"Fucsia / rosado",img:"tapaorejas"},
      {name:"Menta / turquesa",img:"escamas"},
      {name:"Personalizado",img:null}
    ]
  },
  {
    id: "tapaorejas",
    name: "Tapaorejas",
    type: "Diseño exclusivo Lulys",
    desc: "Cubreoídos decorativos únicos. Flores vibrantes que enmarcan el rostro. Diseño original de Lulys.",
    price: "B/. 18.00",
    unit: "c/u",
    thumb: "tapaorejas",
    detail: "detail_tapaorejas",
    materials: ["Perla 3.5","Alambre 4","Lágrima 8","Bolitas 6","Gancho mediano","Hilo verde","Alambre para amarrar número 20"],
    pistilos: ["Perla 3.5","Alambre 4","Lágrima 5","Flor 5","Bolitas 5","Hilo verde"],
    variants: [
      {name:"Turquesa / verde",img:"tapaorejas"},
      {name:"Lila / morado",img:"otros"},
      {name:"Multicolor",img:"flores"},
      {name:"Lila / cristal",img:"peinetas"},
    ]
  },
  {
    id: "peinetas",
    name: "Peinetas",
    type: "Adorno de peinado",
    desc: "Peinetas decoradas con flores de perlas, rombos y lágrimas de cristal. Par completo para tu traje.",
    price: "B/. 12.00",
    unit: "el par",
    thumb: "peinetas",
    detail: "detail_peinetas",
    materials: ["Perla número 3.5","Alambre número 4","Lágrimas número 8 y 4","Flor número 6","Rombo número 4","Bolitas número 6","Peineta","Hilo verde"],
    pistilos: ["Perla 3.5","Alambre 4","Lágrima 5","Flor 5","Bolitas 5","Hilo verde"],
    variants: [
      {name:"Fucsia brillante",img:"peinetas"},
      {name:"Multicolor",img:"tapamonos"},
      {name:"Amarillo / naranja",img:"ganchos"},
      {name:"Tu color",img:null}
    ]
  },
  {
    id: "escamas",
    name: "Escamas de Pescado",
    type: "Diseño especial",
    desc: "Flores artesanales con escamas naturales de pescado. Diseño único con colores que cambian con la luz.",
    price: "Desde B/. 12.00",
    unit: "",
    thumb: "escamas",
    detail: "detail_escamas",
    materials: ["Escama de pescado","Alambre 4","Gusanillo","Lágrima 6","Rombo 6","Bolitas 6","Gancho mediano","Hilo verde","Alambre 20"],
    pistilos: ["Perla 3.5","Alambre 4","Lágrima 5","Flor 5","Bolitas 5","Hilo verde"],
    variants: [
      {name:"Multicolor escamas",img:"escamas"},
      {name:"Azul / celeste",img:"orejeras"},
      {name:"Naranja / dorado",img:"orejeras2"},
      {name:"A tu gusto",img:null}
    ]
  },
  {
    id: "flores",
    name: "Flores y Pimpollos",
    type: "Accesorio floral",
    desc: "Flores individuales o pimpollos cerrados en perlas y cristal. Perfectos como accesorio complementario.",
    price: "B/. 12.00",
    unit: "el par",
    thumb: "flores",
    detail: "detail_flores",
    materials: ["Perla número 4","Lágrima número 8 de cristal","Rombo de cristal número 3","Bolitas de cristal número 5","Flor de cristal número 6","Alambre número 4","Gancho mediano","Hilo verde"],
    pistilos: ["Perla 4","Lágrima 5","Flor 5","Bolitas número 5","Alambre 4","Hilo verde"],
    variants: [
      {name:"Rosado / blanco",img:"flores"},
      {name:"Multicolor",img:"tapamonos"},
      {name:"Rojo intenso",img:"otros"},
      {name:"Pimpollo rosado",img:"detail_pimpollo"}
    ]
  },
  {
    id: "orejeras",
    name: "Orejeras",
    type: "Innovación Lulys · Par",
    desc: "Creación exclusiva de Lulys. Orejeras de perlas o escamas de pescado. Nueva tendencia artesanal panameña.",
    price: "B/. 10.00",
    unit: "el par",
    thumb: "orejeras",
    detail: "detail_orejeras_perla",
    materials: ["Perla número 3.5","Alambre número 4","Lágrima número 8","Bolitas número 6","Alambre para amarrar número 20","Hilo dorado"],
    pistilos: ["Escama de pescado mediana","Alambre número 4","Lágrima número 8","Bolitas número 6","Alambre para amarrar número 20","Hilo dorado"],
    variants: [
      {name:"Fucsia perlas",img:"orejeras"},
      {name:"Negro / dorado",img:"orejeras2"},
      {name:"Rosado perlas",img:"detail_orejeras_perla"},
      {name:"Escamas doradas",img:"detail_orejeras_escama"}
    ]
  },
  {
    id: "ganchos",
    name: "Ganchos para Cabello",
    type: "Cabello largo",
    desc: "Ganchos grandes y medianos con flores de perlas y cristales. Ideales para cabellos largos y moños.",
    price: "B/. 20.00",
    unit: "el par",
    thumb: "ganchos",
    detail: "detail_ganchos",
    materials: ["Perla número 3.5","Alambre número 4","Lágrimas número 8","Bolitas número 6","Gancho grande y mediano","Hilo verde"],
    pistilos: ["Perla 3.5","Alambre 4","Lágrima 5","Flor 5","Bolitas 5","Hilo verde"],
    variants: [
      {name:"Multicolor vibrante",img:"ganchos"},
      {name:"Arcoíris",img:"tapamonos"},
      {name:"Cálidos / tierra",img:"otros"},
      {name:"Tu color favorito",img:null}
    ]
  },
  {
    id: "otros",
    name: "Otros Diseños",
    type: "Colección especial",
    desc: "Mariposas, Pavos, Pistilos y Mosquetas. Diseños únicos que resaltan la creatividad artesanal de Lulys.",
    price: "Desde B/. 10.00",
    unit: "",
    thumb: "otros",
    detail: "detail_mariposas",
    materials: ["Perla número 4","Lagrimas número 8 y 4","Flor número 6","Rombo número 4","Bolitas número 6","Gancho chico","Hilo verde"],
    pistilos: ["Rombos número 4","Lagrimas número 6","Bolitas número 5","Gancho chico","Hilo verde"],
    variants: [
      {name:"Mariposa turquesa",img:"detail_mariposas"},
      {name:"Pavo lavanda",img:"detail_pavos"},
      {name:"Pistilos coloridos",img:"detail_pistilos"},
      {name:"Mosqueta roja",img:"detail_mosquetas"}
    ]
  }
];

const CABEZAS = [
  {tipo:"Blanco",precio:"B/. 200.00"},
  {tipo:"Colores",precio:"B/. 225.00"},
  {tipo:"Cristal",precio:"B/. 300.00"},
  {tipo:"Swaroski",precio:"B/. 600.00"},
  {tipo:"Escama de Pescado",precio:"B/. 275.00"},
  {tipo:"Organza",precio:"B/. 250.00"},
  {tipo:"Pimpollo",precio:"B/. 250.00"},
];

// ── STATE ──


// ── BUILD CATEGORY GRID ──
function buildGrid() {
  const grid = document.getElementById('catGrid');
  CATALOG.forEach((cat, i) => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.style.transitionDelay = (i * 60) + 'ms';
    card.innerHTML = `
      <div class="cat-thumb-wrap">
        <img class="cat-thumb" src="${IMGS[cat.thumb] || ''}" alt="${cat.name}" loading="lazy">
        <span class="cat-badge">${cat.type}</span>
      </div>
      <div class="cat-info">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-desc">${cat.desc}</div>
        <div class="cat-meta">
          <div class="cat-price">${cat.price} <small>${cat.unit}</small></div>
          <button class="btn-ver-mas" onclick="openModal('${cat.id}')">
            Ver más <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Animate on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.cat-card').forEach(c => obs.observe(c));
}

const CABEZAS_IMG = {
  "Blanco": "imagenes/blanco.jpg",
  "Colores": "imagenes/colores.jpg",
  "Cristal": "imagenes/cristal.jpg",
  "Swaroski": "imagenes/swaroski.jpg",
  "Escama de Pescado": "imagenes/escama.jpg",
  "Organza": "imagenes/organza.jpg",
  "Pimpollo": "imagenes/pimpollo.jpg"

};

function buildCabezas() {
  const grid = document.getElementById('cabPrecioGrid');
  const slots = document.getElementById('cabSlots');

  grid.innerHTML = '';
  slots.innerHTML = '';

  // 🔹 Tipos de cabeza (precios)
  CABEZAS.forEach(c => {
    const el = document.createElement('div');
    el.className = 'cp-item';

    el.innerHTML = `
      <div class="cp-tipo">${c.tipo}</div>
      <div class="cp-precio">${c.precio}</div>
    `;

    el.onclick = () => selectCabeza(c, el);

    grid.appendChild(el);
  });

  // 🔹 Slots para subir imágenes
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    slot.className = 'cab-slot';

    slot.innerHTML = `
      <i class="bi bi-camera"></i>
      <span>Foto ${i + 1}</span>
      <input type="file" accept="image/*">
    `;

    const input = slot.querySelector('input');

    input.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = ev => {
        slot.innerHTML = `
          <img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
        `;
      };

      reader.readAsDataURL(file);
    });

    slots.appendChild(slot);
  }
}
function selectCabeza(cab, el) {
  document.querySelectorAll('.cp-item').forEach(x => {
    x.style.background = '';
    x.style.borderColor = '';
  });

  el.style.background = 'rgba(201,162,39,0.12)';
  el.style.borderColor = 'var(--dorado)';

  selectedCabeza = cab;

  document.getElementById('cabSelectedType').textContent = cab.tipo;
  document.getElementById('cabSelectedPrice').textContent = cab.precio;

  const img = CABEZAS_IMG[cab.tipo];
  if (img) {
    document.getElementById('cabMainImg').src = img;
  }
}
// ── MODAL ──
function openModal(id) {
  const cat = CATALOG.find(c => c.id === id);
  if(!cat) return;
  currentProduct = cat;
  selectedVariant = cat.name;

  document.getElementById('mCatLabel').textContent = 'Creaciones Lulys';
  document.getElementById('mTitle').textContent = cat.name;
  document.getElementById('mSubtitle').textContent = cat.type;
  document.getElementById('mDetailImg').src = IMGS[cat.detail] || IMGS[cat.thumb] || '';

  // Materials
  const matList = document.getElementById('mMaterials');
  matList.innerHTML = cat.materials.map(m => `<li><i class="bi bi-dot"></i>${m}</li>`).join('');
  const pistList = document.getElementById('mPistilos');
  pistList.innerHTML = cat.pistilos.map(p => `<li><i class="bi bi-dot"></i>${p}</li>`).join('');

  document.getElementById('mCost').innerHTML = `${cat.price} <small>${cat.unit}</small>`;

  // Variants
  const vGrid = document.getElementById('mVariants');
  vGrid.innerHTML = '';
  cat.variants.forEach((v, i) => {
    if(v.img && IMGS[v.img]) {
      const card = document.createElement('div');
      card.className = 'variant-card' + (i === 0 ? ' selected' : '');
      card.innerHTML = `
        <img class="variant-thumb" src="${IMGS[v.img]}" alt="${v.name}" loading="lazy">
        <div class="variant-name">${v.name}</div>`;
      card.onclick = () => {
        document.querySelectorAll('.variant-card').forEach(x => x.classList.remove('selected'));
        card.classList.add('selected');
        selectedVariant = v.name;
      };
      vGrid.appendChild(card);
    } else {
      // Upload slot
      const slot = document.createElement('div');
      slot.innerHTML = `
        <div class="variant-upload">
          <i class="bi bi-plus-circle"></i>
          <span>Foto próximamente</span>
        </div>
        <div class="variant-name">${v.name}</div>`;
      vGrid.appendChild(slot);
    }
  });

  document.getElementById('mColorInput').value = '';
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

document.getElementById('modal').addEventListener('click', function(e) {
  if(e.target === this) closeModal();
});

document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

function orderProduct() {
  if(!currentProduct) return;
  const color = document.getElementById('mColorInput').value.trim();
  const variant = selectedVariant || currentProduct.name;
  const msg = `Hola! Quiero ordenar de *Creaciones Lulys* ✨\n\n*Producto:* ${currentProduct.name}\n*Diseño/Color:* ${variant}${color ? ' — ' + color : ''}\n*Precio:* ${currentProduct.price} ${currentProduct.unit}\n\n¿Está disponible?`;
  window.open(`https://wa.me/50762988630?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── INIT ──
buildGrid();
buildCabezas();
// ─────────────────────────────
// GALERÍA
// ─────────────────────────────
const galleryGrid = document.getElementById('gallery-grid');

const galleryImages = [
  "imagenes/Flores_azul.jpeg",
  "imagenes/Flores_pimpollos.jpeg",
  "imagenes/Flores_pimpollos1.jpeg",
  "imagenes/Flores_pimpollos2.jpeg",
  "imagenes/Flores_pimpollos3.jpeg",
  "imagenes/Flores_rojas.jpeg",
  "imagenes/Orejeras.jpeg",
  "imagenes/Peinetas_rosadas.jpeg",
  "imagenes/Pimpollos.jpeg",
  "imagenes/tapamoños.jpeg",
  "imagenes/Tapamoños_Rosado.jpeg",
  "imagenes/Tapamoñospar.jpeg",
  "imagenes/Orejeras_negras.jpeg",
  "imagenes/Orejeras_rosada.jpeg",
  "imagenes/Tapamoñosrosado_par.jpeg"
];

// 🔥 cantidad de espacios (cámbialo a lo que quieras)
const TOTAL_SLOTS = 15;

for (let i = 0; i < TOTAL_SLOTS; i++) {
  const slot = document.createElement('div');
  slot.className = 'gallery-slot';

  const imgSrc = galleryImages[i];

  if (imgSrc) {
    slot.innerHTML = `
      <img src="${imgSrc}" alt="Imagen">
      <div class="slot-overlay"><i class="bi bi-zoom-in"></i></div>
    `;

    slot.addEventListener('click', () => openLightbox(imgSrc));

  } else {
    slot.innerHTML = `<div style="opacity:.3">Sin imagen</div>`;
  }

  galleryGrid.appendChild(slot);
}

  galleryImages.push(null);
  galleryGrid.appendChild(slot);

  const input = slot.querySelector('input');

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {
      galleryImages[i] = ev.target.result;

      slot.innerHTML = `
        <img src="${ev.target.result}">
        <div class="slot-overlay"><i class="bi bi-zoom-in"></i></div>
      `;

      slot.addEventListener('click', () => openLightbox(ev.target.result));
      showToast('Foto cargada');
    };

    reader.readAsDataURL(file);
  });



// ─────────────────────────────
// LIGHTBOX
// ─────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}



// ─────────────────────────────
// ACTIVE NAV LINK
// ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.id;
    }
  });

  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + current;

    a.style.color = active ? 'var(--dorado-claro)' : '';
    a.style.opacity = active ? '1' : '0.85';
  });
});


// ─────────────────────────────
// RIPPLE BOTONES
// ─────────────────────────────
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('click', function(e) {

    const ripple = document.createElement('span');

    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      width:10px;
      height:10px;
      background:rgba(255,255,255,0.35);
      transform:scale(0);
      animation:ripple 0.5s ease-out forwards;
      left:${e.offsetX - 5}px;
      top:${e.offsetY - 5}px;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
  to {
    transform: scale(20);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
