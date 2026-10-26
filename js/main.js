/* =====================================================================
   main.js — partilhado por todas as páginas + construção da home.
   Lê window.SITE e window.PROJECTS (definidos em data.js).
   ===================================================================== */

const CATEGORY = { academico: "Académico", pessoal: "Pessoal" };
const STATUS = { concluido: "Concluído", "em-desenvolvimento": "Em desenvolvimento" };
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Escapa texto antes de o inserir como HTML
function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
const projectUrl = p => `projeto.html?p=${encodeURIComponent(p.slug)}`;
// Miniatura leve para a home e o índice; a página do projeto usa a imagem final
const thumbOf = p => p.thumb || p.cover;

function badge(p) {
  if (!STATUS[p.status]) return "";
  return `<span class="badge badge--${p.status}">${STATUS[p.status]}</span>`;
}

/* Textos gerais: qualquer elemento com data-site="campo" recebe SITE.campo */
document.querySelectorAll("[data-site]").forEach(el => {
  const value = window.SITE[el.dataset.site];
  if (value !== undefined) el.textContent = value;
});
if (!window.SITE.available) document.querySelectorAll(".status").forEach(el => el.remove());

/* Aparecer ao fazer scroll */
const revealer = "IntersectionObserver" in window && !reduceMotion
  ? new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); revealer.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" })
  : null;
function observeReveals(root = document) {
  root.querySelectorAll(".reveal:not(.is-in)").forEach(el => revealer ? revealer.observe(el) : el.classList.add("is-in"));
}

/* ---------------------------------------------------------------------
   LIGHTBOX — clicar numa imagem com data-zoom amplia-a
   (usado na home e nas páginas de projeto)
   --------------------------------------------------------------------- */
function initLightbox(imgs) {
  const box = document.getElementById("lightbox");
  if (!box || !imgs.length) return;
  const big = box.querySelector("img");
  const cap = box.querySelector(".lightbox__caption");
  let i = 0, lastFocus = null;

  const open = n => {
    i = (n + imgs.length) % imgs.length;
    big.src = imgs[i].src; big.alt = imgs[i].alt;
    // Mostra só a legenda visível da imagem (se existir) e o número
    const fc = imgs[i].closest("figure")?.querySelector("figcaption");
    cap.textContent = (fc ? `${fc.textContent}  ·  ` : "") + `${i + 1}/${imgs.length}`;
    if (!box.classList.contains("is-open")) {
      lastFocus = document.activeElement;
      box.classList.add("is-open"); document.body.style.overflow = "hidden";
      box.querySelector("[data-lb=close]").focus();
    }
  };
  const close = () => {
    box.classList.remove("is-open"); document.body.style.overflow = "";
    lastFocus?.focus();
  };

  imgs.forEach((im, n) => {
    im.tabIndex = 0; im.setAttribute("role", "button");
    im.addEventListener("click", () => open(n));
    im.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(n); } });
  });
  box.addEventListener("click", e => {
    const action = e.target.dataset.lb;
    if (action === "close" || e.target === box) close();
    if (action === "prev") open(i - 1);
    if (action === "next") open(i + 1);
  });
  document.addEventListener("keydown", e => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") open(i - 1);
    if (e.key === "ArrowRight") open(i + 1);
  });
}

/* ---------------------------------------------------------------------
   HOME
   --------------------------------------------------------------------- */
function buildHome() {
  const site = window.SITE;
  const projects = window.PROJECTS;
  const featured = projects.filter(p => p.featured).sort((a, b) => a.featured - b.featured);
  const bySlug = slug => projects.find(p => p.slug === slug);

  // Fragmentos de trabalhos na abertura
  document.getElementById("fragments").innerHTML = site.fragments.map(f => `
    <li><a href="${projectUrl(bySlug(f.slug))}" title="${esc(f.label)}">
      <img src="${esc(f.src)}" alt="${esc(f.label)}" width="88" height="88">
    </a></li>`).join("");

  // Seleção
  document.getElementById("featured-count").textContent = `${featured.length} projetos`;
  document.getElementById("featured").innerHTML = featured.map((p, i) => `
    <article class="feature reveal">
      <a class="feature__media${p.coverFit === "contain" ? " feature__media--contain" : ""}" href="${projectUrl(p)}" tabindex="-1" aria-hidden="true">
        <img src="${esc(thumbOf(p))}" alt="" loading="lazy">
      </a>
      <div class="feature__info">
        <span class="feature__no">${String(i + 1).padStart(2, "0")}</span>
        <h3><a href="${projectUrl(p)}">${esc(p.title)}</a></h3>
        <p class="label">${CATEGORY[p.category]} · ${p.year}</p>
        <p class="feature__summary serif">${esc(p.summary)}</p>
        <ul class="tags">${(p.tools || []).slice(0, 4).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        <div><a class="arrow-link" href="${projectUrl(p)}">Abrir projeto <span aria-hidden="true">→</span></a></div>
      </div>
    </article>`).join("");

  // Outros trabalhos: galeria secundária, sempre com imagem
  const secondary = projects.filter(p => p.secondary).sort((a, b) => a.secondary - b.secondary);
  document.getElementById("secondary-count").textContent = `${secondary.length} trabalhos`;
  document.getElementById("secondary").innerHTML = secondary.map((p, i) => `
    <a class="more__item reveal" href="${projectUrl(p)}">
      <span class="more__media${p.coverFit === "contain" ? " more__media--contain" : ""}"><img src="${esc(thumbOf(p))}" alt="" loading="lazy"></span>
      <span class="more__no">${String(featured.length + i + 1).padStart(2, "0")}</span>
      <strong>${esc(p.title)}</strong>
      <span class="label">${CATEGORY[p.category]} · ${p.year}</span>
    </a>`).join("");

  // Em curso
  const wip = projects.filter(p => p.status === "em-desenvolvimento");
  document.getElementById("wip").innerHTML = wip.map(p => `
    <a class="wip__card reveal" href="${projectUrl(p)}">
      <span class="wip__media"><img src="${esc(thumbOf(p))}" alt="" loading="lazy"></span>
      <div class="wip__meta">
        <div><strong>${esc(p.title)}</strong><p>${esc(p.summary)}</p></div>
        ${badge(p)}
      </div>
    </a>`).join("");

  // Índice com filtros
  const index = document.getElementById("index");
  index.innerHTML = projects.map((p, i) => `
    <li data-category="${p.category}">
      <a class="index__row" href="${projectUrl(p)}" ${p.cover ? `data-preview="${esc(thumbOf(p))}"` : ""}>
        <span class="index__no">${String(i + 1).padStart(2, "0")}</span>
        <span class="index__title">${esc(p.title)}</span>
        <span class="index__ctx">${CATEGORY[p.category]} — ${esc(p.context)}</span>
        <span class="index__year">${p.year}</span>
        ${badge(p)}
      </a>
    </li>`).join("");

  const counts = projects.reduce((acc, p) => (acc[p.category] = (acc[p.category] || 0) + 1, acc), {});
  const filters = document.getElementById("filters");
  // Só mostra categorias que têm trabalhos
  filters.innerHTML = [["todos", "Todos", projects.length], ...Object.keys(CATEGORY).filter(k => counts[k]).map(k => [k, CATEGORY[k], counts[k]])]
    .map(([key, label, n], i) => `<button type="button" data-filter="${key}" aria-pressed="${i === 0}">${label}<sup>${n}</sup></button>`)
    .join("");
  filters.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    index.querySelectorAll("li").forEach(li => {
      li.hidden = btn.dataset.filter !== "todos" && li.dataset.category !== btn.dataset.filter;
    });
  });

  // Pré-visualização a seguir o cursor (só com rato)
  const preview = document.getElementById("preview");
  if (window.matchMedia("(pointer: fine)").matches) {
    const img = preview.querySelector("img");
    let x = 0, y = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (x - cx) * .18; cy += (y - cy) * .18;
      preview.style.left = cx + 24 + 150 + "px"; preview.style.top = cy + "px";
      raf = preview.classList.contains("is-on") ? requestAnimationFrame(loop) : null;
    };
    index.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
    index.addEventListener("mouseover", e => {
      const row = e.target.closest("[data-preview]");
      if (!row) return preview.classList.remove("is-on");
      if (img.getAttribute("src") !== row.dataset.preview) img.src = row.dataset.preview;
      if (!preview.classList.contains("is-on")) { cx = x = e.clientX; cy = y = e.clientY; }
      preview.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(loop);
    });
    index.addEventListener("mouseleave", () => preview.classList.remove("is-on"));
  }

  // Sobre
  const about = site.about;
  document.getElementById("about-lead").textContent = about.lead;
  document.getElementById("about-photo").innerHTML = `
    <img src="${esc(about.photo.src)}" alt="${esc(about.photo.caption)}" loading="lazy" data-zoom>
    <figcaption>${esc(about.photo.caption)}</figcaption>`;
  document.getElementById("about-text").innerHTML = about.paragraphs.map(t => `<p>${esc(t)}</p>`).join("");
  document.getElementById("timeline").innerHTML = about.timeline.map(t =>
    `<li><span>${esc(t.when)}</span><div><strong>${esc(t.what)}</strong><span>${esc(t.where)}</span></div></li>`).join("");
  document.getElementById("skills").innerHTML = about.skills.map(s => `<li>${esc(s)}</li>`).join("");

  // Registos: fotografias pessoais
  document.getElementById("records").innerHTML = site.records.map(r => `
    <figure class="records__item">
      <img src="${esc(r.src)}" alt="${esc(r.caption)}" loading="lazy" data-zoom>
      <figcaption>${esc(r.caption)}</figcaption>
    </figure>`).join("");

  // Contactos
  document.getElementById("contacts").innerHTML = site.contacts.map(c => `
    <li><span class="label">${esc(c.label)}</span>
      <a href="${esc(c.href)}"${c.href.startsWith("http") ? ` target="_blank" rel="noopener"` : ""}>${esc(c.value)}${c.href.startsWith("http") ? " ↗" : ""}</a>
    </li>`).join("");

  // Brilho cromado do wordmark a seguir o rato
  const mark = document.querySelector(".wordmark");
  if (mark && !reduceMotion) {
    window.addEventListener("pointermove", e => {
      const r = mark.getBoundingClientRect();
      mark.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      mark.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    }, { passive: true });
  }

  initLightbox([...document.querySelectorAll("#sobre [data-zoom]")]);
  observeReveals();
}

if (document.getElementById("featured")) buildHome();
